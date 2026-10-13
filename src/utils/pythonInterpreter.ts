/**
 * Python in-browser runtime engine.
 * Transpiles Python syntax to sandboxed JavaScript and captures output,
 * execution errors with line numbers, return values, and variable memory states.
 */

import { ExecutionResult, VisualMemoryItem } from '../types';

export class PythonInterpreter {
  private outputLogs: string[] = [];
  private inputCallback?: (promptText: string) => string;

  constructor(inputCallback?: (promptText: string) => string) {
    this.inputCallback = inputCallback;
  }

  public setInputCallback(cb: (promptText: string) => string) {
    this.inputCallback = cb;
  }

  public async execute(code: string, inputs: string[] = []): Promise<ExecutionResult> {
    const startTime = performance.now();
    this.outputLogs = [];
    const errors: string[] = [];
    let variables: VisualMemoryItem[] = [];
    let returnValue: string | undefined = undefined;
    let success = true;

    let inputIndex = 0;
    const defaultInput = (promptStr: string = '') => {
      if (promptStr) {
        this.outputLogs.push(promptStr);
      }
      if (inputIndex < inputs.length) {
        const val = inputs[inputIndex++];
        return val;
      }
      if (this.inputCallback) {
        return this.inputCallback(promptStr);
      }
      return '';
    };

    try {
      const transpiled = this.transpile(code);
      
      // Sandbox scope with standard builtins and simulated modules
      const sandboxScope: Record<string, any> = {
        __print: (...args: any[]) => {
          // Handle sep and end kwargs simulation if last arg is an object with __sep or __end
          let sep = ' ';
          let end = '\n';
          const printArgs: any[] = [];
          
          for (const arg of args) {
            if (arg && typeof arg === 'object' && arg.__isPrintKwargs) {
              if (arg.sep !== undefined) sep = arg.sep;
              if (arg.end !== undefined) end = arg.end;
            } else {
              printArgs.push(this.formatPythonValue(arg));
            }
          }
          const formatted = printArgs.join(sep);
          if (end === '') {
            // Append to previous log if possible or push
            if (this.outputLogs.length > 0) {
              this.outputLogs[this.outputLogs.length - 1] += formatted;
            } else {
              this.outputLogs.push(formatted);
            }
          } else {
            this.outputLogs.push(formatted);
          }
        },
        __input: defaultInput,
        len: (obj: any) => {
          if (obj === null || obj === undefined) throw new Error("TypeError: object of type 'NoneType' has no len()");
          if (typeof obj === 'string' || Array.isArray(obj)) return obj.length;
          if (obj instanceof Set || obj instanceof Map) return obj.size;
          if (typeof obj === 'object') return Object.keys(obj).length;
          throw new Error(`TypeError: object of type '${typeof obj}' has no len()`);
        },
        range: (...args: number[]) => {
          let start = 0, stop = 0, step = 1;
          if (args.length === 1) {
            stop = args[0];
          } else if (args.length === 2) {
            start = args[0];
            stop = args[1];
          } else if (args.length >= 3) {
            start = args[0];
            stop = args[1];
            step = args[2] || 1;
          }
          const result: number[] = [];
          if (step > 0) {
            for (let i = start; i < stop; i += step) {
              result.push(i);
              if (result.length > 20000) break; // Infinite loop guard
            }
          } else if (step < 0) {
            for (let i = start; i > stop; i += step) {
              result.push(i);
              if (result.length > 20000) break;
            }
          }
          return result;
        },
        int: (val: any) => {
          if (typeof val === 'boolean') return val ? 1 : 0;
          const parsed = parseInt(val, 10);
          if (isNaN(parsed)) throw new Error(`ValueError: invalid literal for int() with base 10: '${val}'`);
          return parsed;
        },
        float: (val: any) => {
          if (typeof val === 'boolean') return val ? 1.0 : 0.0;
          const parsed = parseFloat(val);
          if (isNaN(parsed)) throw new Error(`ValueError: could not convert string to float: '${val}'`);
          return parsed;
        },
        str: (val: any) => this.formatPythonValue(val),
        bool: (val: any) => {
          if (val === false || val === 0 || val === '' || val === null || val === undefined) return false;
          if (Array.isArray(val) && val.length === 0) return false;
          if (typeof val === 'object' && Object.keys(val).length === 0) return false;
          return true;
        },
        list: (iterable?: any) => {
          if (!iterable) return [];
          if (Array.isArray(iterable)) return [...iterable];
          if (typeof iterable === 'string') return iterable.split('');
          if (typeof iterable === 'object') return Object.keys(iterable);
          return [iterable];
        },
        dict: (initial?: any) => {
          if (!initial) return {};
          return { ...initial };
        },
        set: (iterable?: any) => {
          if (!iterable) return new Set();
          if (Array.isArray(iterable) || typeof iterable === 'string') return new Set(iterable);
          return new Set();
        },
        sum: (iterable: any[]) => {
          if (!Array.isArray(iterable)) throw new Error("TypeError: 'sum' expects an iterable");
          return iterable.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : Number(curr)), 0);
        },
        min: (...args: any[]) => {
          const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
          if (list.length === 0) throw new Error("ValueError: min() arg is an empty sequence");
          return Math.min(...list);
        },
        max: (...args: any[]) => {
          const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
          if (list.length === 0) throw new Error("ValueError: max() arg is an empty sequence");
          return Math.max(...list);
        },
        abs: (val: number) => Math.abs(val),
        round: (val: number, precision: number = 0) => {
          const factor = Math.pow(10, precision);
          return Math.round(val * factor) / factor;
        },
        type: (val: any) => {
          if (val === null || val === undefined) return "<class 'NoneType'>";
          if (typeof val === 'number') return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
          if (typeof val === 'string') return "<class 'str'>";
          if (typeof val === 'boolean') return "<class 'bool'>";
          if (Array.isArray(val)) return "<class 'list'>";
          if (val instanceof Set) return "<class 'set'>";
          if (typeof val === 'object') return "<class 'dict'>";
          if (typeof val === 'function') return "<class 'function'>";
          return "<class 'object'>";
        },
        sorted: (iterable: any[], reverse: boolean = false) => {
          const copy = [...iterable];
          copy.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
          if (reverse) copy.reverse();
          return copy;
        },
        reversed: (iterable: any[]) => [...iterable].reverse(),
        enumerate: (iterable: any[]) => iterable.map((item, index) => [index, item]),
        zip: (...arrays: any[][]) => {
          const minLen = Math.min(...arrays.map((a) => a.length));
          const result: any[][] = [];
          for (let i = 0; i < minLen; i++) {
            result.push(arrays.map((a) => a[i]));
          }
          return result;
        },
        math: {
          pi: Math.PI,
          e: Math.E,
          sqrt: (x: number) => Math.sqrt(x),
          floor: (x: number) => Math.floor(x),
          ceil: (x: number) => Math.ceil(x),
          pow: (x: number, y: number) => Math.pow(x, y),
          sin: (x: number) => Math.sin(x),
          cos: (x: number) => Math.cos(x),
          radians: (x: number) => (x * Math.PI) / 180,
          degrees: (x: number) => (x * 180) / Math.PI,
        },
        random: {
          randint: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,
          choice: (seq: any[]) => seq[Math.floor(Math.random() * seq.length)],
          random: () => Math.random(),
          shuffle: (seq: any[]) => {
            for (let i = seq.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [seq[i], seq[j]] = [seq[j], seq[i]];
            }
            return seq;
          },
        },
        True: true,
        False: false,
        None: null,
      };

      // Wrap in async function execution
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const fn = new AsyncFunction(
        ...Object.keys(sandboxScope),
        `
        const __globals = {};
        ${transpiled}
        return { __globals, __lastReturn: typeof __lastVal !== 'undefined' ? __lastVal : undefined };
        `
      );

      const runResult = await fn(...Object.values(sandboxScope));
      if (runResult && runResult.__lastReturn !== undefined) {
        returnValue = this.formatPythonValue(runResult.__lastReturn);
      }

      // Extract variables from scope/globals
      if (runResult && runResult.__globals) {
        variables = this.extractVariables(runResult.__globals);
      }
    } catch (err: any) {
      success = false;
      const errMsg = err?.message || String(err);
      errors.push(this.formatPythonError(errMsg, code));
    }

    const duration = Math.round(performance.now() - startTime);

    return {
      output: this.outputLogs,
      errors,
      executionTimeMs: duration,
      variables,
      returnValue,
      success,
    };
  }

  private formatPythonValue(val: any): string {
    if (val === null || val === undefined) return 'None';
    if (val === true) return 'True';
    if (val === false) return 'False';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    if (Array.isArray(val)) {
      return `[${val.map((v) => (typeof v === 'string' ? `'${v}'` : this.formatPythonValue(v))).join(', ')}]`;
    }
    if (val instanceof Set) {
      return `{${Array.from(val).map((v) => this.formatPythonValue(v)).join(', ')}}`;
    }
    if (typeof val === 'object') {
      const entries = Object.entries(val).map(
        ([k, v]) => `'${k}': ${typeof v === 'string' ? `'${v}'` : this.formatPythonValue(v)}`
      );
      return `{${entries.join(', ')}}`;
    }
    return String(val);
  }

  private extractVariables(globalsObj: Record<string, any>): VisualMemoryItem[] {
    const memoryItems: VisualMemoryItem[] = [];
    const keys = Object.keys(globalsObj).filter((k) => !k.startsWith('__'));

    let addrCounter = 0x10a4;

    for (const key of keys) {
      const val = globalsObj[key];
      let type: VisualMemoryItem['type'] = 'object';
      let valueStr = this.formatPythonValue(val);
      let isReference = false;
      const memAddr = `0x${(addrCounter += 0x10).toString(16)}`;

      if (val === null || val === undefined) {
        type = 'None';
      } else if (typeof val === 'number') {
        type = Number.isInteger(val) ? 'int' : 'float';
      } else if (typeof val === 'string') {
        type = 'str';
        valueStr = `"${val}"`;
      } else if (typeof val === 'boolean') {
        type = 'bool';
      } else if (Array.isArray(val)) {
        type = 'list';
        isReference = true;
      } else if (typeof val === 'object') {
        type = 'dict';
        isReference = true;
      } else if (typeof val === 'function') {
        type = 'function';
        valueStr = `<function ${key}>`;
      }

      memoryItems.push({
        name: key,
        type,
        value: valueStr,
        memoryAddress: memAddr,
        isReference,
        targetAddress: isReference ? `0x${(addrCounter + 0x80).toString(16)}` : undefined,
        scope: 'global',
      });
    }

    return memoryItems;
  }

  private formatPythonError(errStr: string, sourceCode: string): string {
    // If it already looks like a Python exception, pass through
    if (
      errStr.startsWith('SyntaxError:') ||
      errStr.startsWith('NameError:') ||
      errStr.startsWith('TypeError:') ||
      errStr.startsWith('ValueError:') ||
      errStr.startsWith('ZeroDivisionError:') ||
      errStr.startsWith('IndexError:') ||
      errStr.startsWith('KeyError:')
    ) {
      return `Traceback (most recent call last):\n  ${errStr}\n\n💡 Tip: Check variable spelling, argument types, or data structures.`;
    }

    if (errStr.includes('is not defined')) {
      const match = errStr.match(/(\w+) is not defined/);
      const varName = match ? match[1] : 'name';
      return `Traceback (most recent call last):\n  NameError: name '${varName}' is not defined\n\n💡 Tip: Did you forget to define '${varName}' before using it, or is there a typo?`;
    }

    if (errStr.includes('Cannot read properties of undefined') || errStr.includes('null')) {
      return `Traceback (most recent call last):\n  AttributeError: 'NoneType' object has no attribute or index\n\n💡 Tip: You tried to access properties or items on a variable that evaluated to None.`;
    }

    return `Traceback (most recent call last):\n  RuntimeError: ${errStr}`;
  }

  /**
   * Transpiler that converts Python code into executable JavaScript.
   */
  private transpile(pythonCode: string): string {
    const rawLines = pythonCode.split('\n');
    const processedLines: string[] = [];

    // Track indentation stack
    const indentStack: number[] = [0];

    for (let lineIndex = 0; lineIndex < rawLines.length; lineIndex++) {
      let line = rawLines[lineIndex];

      // Handle comments and whitespace
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      // Calculate leading indentation spaces
      const match = line.match(/^([ ]*)/);
      const currentIndent = match ? match[1].length : 0;

      // Close blocks if indentation decreases
      while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        processedLines.push('}');
      }

      // Check if this line opens a block (ends with :)
      let opensBlock = false;
      let cleanLine = trimmed;
      if (cleanLine.endsWith(':')) {
        opensBlock = true;
        cleanLine = cleanLine.slice(0, -1).trim();
      }

      // Transpile Python expressions to JavaScript
      const jsTranspiled = this.transpileLine(cleanLine, opensBlock);

      if (opensBlock) {
        indentStack.push(currentIndent + 4);
        processedLines.push(`${jsTranspiled} {`);
      } else {
        processedLines.push(`${jsTranspiled};`);
      }
    }

    // Close any remaining open blocks
    while (indentStack.length > 1) {
      indentStack.pop();
      processedLines.push('}');
    }

    return processedLines.join('\n');
  }

  private transpileLine(line: string, isBlockOpener: boolean): string {
    let out = line;

    // Handle imports (no-op or mapped)
    if (out.startsWith('import ') || out.startsWith('from ')) {
      return '// ' + out;
    }

    // Handle 'pass'
    if (out === 'pass') {
      return '// pass';
    }

    // Handle 'def func_name(args):'
    if (out.startsWith('def ')) {
      const defMatch = out.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/);
      if (defMatch) {
        const fnName = defMatch[1];
        const params = defMatch[2];
        return `async function ${fnName}(${params}) { __globals['${fnName}'] = ${fnName};`;
      }
    }

    // Handle 'class ClassName:' or 'class ClassName(Base):'
    if (out.startsWith('class ')) {
      const classMatch = out.match(/^class\s+([a-zA-Z0-9_]+)(?:\((.*?)\))?/);
      if (classMatch) {
        const className = classMatch[1];
        return `class ${className}`;
      }
    }

    // Handle 'if condition:'
    if (out.startsWith('if ')) {
      const cond = this.convertCondition(out.slice(3));
      return `if (${cond})`;
    }

    // Handle 'elif condition:'
    if (out.startsWith('elif ')) {
      const cond = this.convertCondition(out.slice(5));
      return `else if (${cond})`;
    }

    // Handle 'else'
    if (out === 'else') {
      return 'else';
    }

    // Handle 'while condition:'
    if (out.startsWith('while ')) {
      const cond = this.convertCondition(out.slice(6));
      return `let __loop_guard = 0;\nwhile (${cond}) { if (++__loop_guard > 20000) throw new Error("RuntimeError: Infinite loop detected");`;
    }

    // Handle 'for item in iterable:'
    if (out.startsWith('for ')) {
      const forMatch = out.match(/^for\s+([a-zA-Z0-9_,\s()]+)\s+in\s+(.+)$/);
      if (forMatch) {
        const itemVar = forMatch[1].trim();
        const iterableExpr = this.convertExpression(forMatch[2].trim());

        // Check if iterating with tuple unpack like 'for i, val in enumerate(x):'
        if (itemVar.includes(',')) {
          const parts = itemVar.split(',').map((p) => p.trim());
          return `for (const [${parts.join(', ')}] of (${iterableExpr})) { __globals['${parts[0]}'] = ${parts[0]}; __globals['${parts[1]}'] = ${parts[1]};`;
        }

        return `for (const ${itemVar} of (${iterableExpr})) { __globals['${itemVar}'] = ${itemVar};`;
      }
    }

    // Handle 'try:'
    if (out === 'try') {
      return 'try';
    }

    // Handle 'except Exception as e:' or 'except:'
    if (out.startsWith('except')) {
      const exceptMatch = out.match(/^except(?:\s+([a-zA-Z0-9_]+)(?:\s+as\s+([a-zA-Z0-9_]+))?)?/);
      const errVar = exceptMatch && exceptMatch[2] ? exceptMatch[2] : '__err';
      return `catch (${errVar})`;
    }

    // Handle 'finally:'
    if (out === 'finally') {
      return 'finally';
    }

    // Handle 'return expr'
    if (out.startsWith('return ') || out === 'return') {
      const retExpr = out.startsWith('return ') ? this.convertExpression(out.slice(7)) : '';
      return `return ${retExpr}`;
    }

    // Normal statement or assignment
    out = this.convertExpression(out);

    // Track variable assignments to __globals for memory visualizer
    const assignMatch = out.match(/^([a-zA-Z0-9_]+)\s*(=|\+=|-=|\*=|\/=)\s*(.+)$/);
    if (assignMatch && !assignMatch[1].startsWith('__')) {
      const varName = assignMatch[1];
      const op = assignMatch[2];
      const expr = assignMatch[3];
      return `let ${varName} = (typeof ${varName} !== 'undefined' ? ${varName} : undefined);\n${varName} ${op} ${expr};\n__globals['${varName}'] = ${varName}`;
    }

    return out;
  }

  private convertCondition(condStr: string): string {
    let cond = condStr;
    // Replace Python operators with JS equivalents
    cond = cond.replace(/\band\b/g, '&&');
    cond = cond.replace(/\bor\b/g, '||');
    cond = cond.replace(/\bnot\b/g, '!');
    cond = cond.replace(/\bTrue\b/g, 'true');
    cond = cond.replace(/\bFalse\b/g, 'false');
    cond = cond.replace(/\bNone\b/g, 'null');

    // Handle 'in' operator: 'x in list' -> 'list.includes(x)'
    cond = cond.replace(/([a-zA-Z0-9_'"[\]]+)\s+in\s+([a-zA-Z0-9_'"[\]().]+)/g, '($2 && ($2.includes ? $2.includes($1) : $1 in $2))');

    return cond;
  }

  private convertExpression(exprStr: string): string {
    let expr = exprStr;

    // Convert print(...) to __print(...)
    expr = expr.replace(/\bprint\s*\(/g, '__print(');

    // Convert input(...) to __input(...)
    expr = expr.replace(/\binput\s*\(/g, '__input(');

    // Convert Python f-strings: f"Hello {name}!" -> `Hello ${name}!`
    expr = expr.replace(/f"([^"]*)"/g, (_, content) => {
      const interpolated = content.replace(/\{([^}]+)\}/g, '${$1}');
      return '`' + interpolated + '`';
    });
    expr = expr.replace(/f'([^']*)'/g, (_, content) => {
      const interpolated = content.replace(/\{([^}]+)\}/g, '${$1}');
      return '`' + interpolated + '`';
    });

    // Convert floor division // to Math.floor(a / b)
    expr = expr.replace(/([a-zA-Z0-9_.]+)\s*\/\/\s*([a-zA-Z0-9_.]+)/g, 'Math.floor($1 / $2)');

    // Convert exponentiation ** to Math.pow(a, b) or **
    // (ES2016 supports ** directly in modern JS)

    // Convert Python method calls
    // .append(x) -> .push(x)
    expr = expr.replace(/\.append\s*\(/g, '.push(');

    // .lower() -> .toLowerCase()
    expr = expr.replace(/\.lower\s*\(\)/g, '.toLowerCase()');

    // .upper() -> .toUpperCase()
    expr = expr.replace(/\.upper\s*\(\)/g, '.toUpperCase()');

    // .strip() -> .trim()
    expr = expr.replace(/\.strip\s*\(\)/g, '.trim()');

    // .startswith(x) -> .startsWith(x)
    expr = expr.replace(/\.startswith\s*\(/g, '.startsWith(');

    // .endswith(x) -> .endsWith(x)
    expr = expr.replace(/\.endswith\s*\(/g, '.endsWith(');

    // .items() -> Object.entries(x)
    expr = expr.replace(/([a-zA-Z0-9_]+)\.items\s*\(\)/g, 'Object.entries($1)');

    // .keys() -> Object.keys(x)
    expr = expr.replace(/([a-zA-Z0-9_]+)\.keys\s*\(\)/g, 'Object.keys($1)');

    // .values() -> Object.values(x)
    expr = expr.replace(/([a-zA-Z0-9_]+)\.values\s*\(\)/g, 'Object.values($1)');

    return expr;
  }
}

export const pythonInterpreter = new PythonInterpreter();
