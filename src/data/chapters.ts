import { Chapter } from '../types';
import { DIFFICULTY_CHALLENGES } from '../utils/difficultyChallenges';

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    number: '01',
    title: 'The First Breath',
    subtitle: 'Hello World, Syntax Anatomy & How Python Thinks',
    act: 'act1',
    difficulty: 'Easy',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[1],
    readTimeMinutes: 10,
    summary: 'Discover Python’s philosophy, run your first print statement, understand how interpreters execute code line-by-line, and learn the art of readable code comments.',
    sections: [
      {
        id: 'c1-s1',
        title: 'Why Python & The Zen of Python',
        content: `Python was conceived in 1989 by Guido van Rossum with a radical core premise: **code is read much more often than it is written**. Unlike C, C++, or Java, which require boilerplate class wrappers and verbose type declarations, Python emphasizes expressive, human-readable simplicity.\n\nIn Python, you do not need semicolons to end lines, nor do you need curly braces to define code blocks. Indentation is meaningful syntax. When you run code, Python executes it from top to bottom, one statement at a time.`,
        codeSample: `# Welcome to your first Python program!
print("Hello, World!")
print("Python is designed for humans.")`,
        gotcha: {
          title: 'Case Sensitivity Matters',
          description: 'Python is strictly case-sensitive. `print` is a built-in function, but `Print` or `PRINT` will trigger a NameError.',
          badCode: `Print("This will fail!")  # NameError: name 'Print' is not defined`,
          goodCode: `print("This runs smoothly!")  # Clean, lowercase standard`,
        },
        deepDive: {
          title: 'The Zen of Python (PEP 20)',
          explanation: 'Type `import this` in any standard Python terminal and you will see 19 guiding aphorisms. Among the most revered: "Beautiful is better than ugly", "Explicit is better than implicit", and "Readability counts".',
        },
        memorySample: {
          description: 'Strings are created as immutable text objects in memory and passed directly to the standard output buffer.',
          variables: [
            {
              name: 'greeting',
              type: 'str',
              value: '"Hello, World!"',
              memoryAddress: '0x10f0',
              scope: 'global',
            },
          ],
        },
      },
      {
        id: 'c1-s2',
        title: 'Mastering the print() Function',
        content: `The \`print()\` function outputs text or numbers to the console screen. You can pass multiple values separated by commas, and Python will automatically join them with a single space.\n\nYou can also customize the separator with \`sep=\` and the line ending with \`end=\`.`,
        codeSample: `# Passing multiple arguments to print
print("Python", "version", 3.12)

# Custom separators
print("2026", "10", "24", sep="-")

# Staying on the same line using end=""
print("Loading", end="...")
print("Complete!")`,
      },
      {
        id: 'c1-s3',
        title: 'Comments: Writing for Humans',
        content: `Code tells the computer *what* to do, but comments explain to human engineers *why* it was done. Single-line comments begin with a hash character \`#\`. Python completely ignores everything from \`#\` to the end of that line.`,
        codeSample: `# Calculate total with standard 8% tax
base_price = 100
tax_rate = 0.08  # State sales tax
final_price = base_price * (1 + tax_rate)

print("Final price:", final_price)`,
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Which of the following lines is valid Python for displaying text?',
        options: ['echo "Hello World"', 'System.out.println("Hello World");', 'print("Hello World")', 'console.log("Hello World")'],
        correctAnswer: 2,
        explanation: 'In Python, `print()` is the universal built-in function for sending output to standard out.',
      },
      {
        id: 'q1-2',
        question: 'What is the output of print("A", "B", "C", sep="-")?',
        options: ['A B C', 'A-B-C', 'A-B-C-', '-A-B-C'],
        correctAnswer: 1,
        explanation: 'The `sep="-"` parameter places a hyphen between each item, giving "A-B-C".',
      },
      {
        id: 'q1-3',
        question: 'How do you create a single-line comment in Python?',
        options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '<!-- This is a comment -->'],
        correctAnswer: 2,
        explanation: 'Python uses the hash symbol `#` for single-line comments.',
      },
    ],
    challenge: {
      id: 'ch-01',
      title: 'Mission: Terminal Greeting & Identity',
      difficulty: 'Beginner',
      prompt: 'Write a program that uses `print()` to output your developer codename and specialty on two separate lines, formatted as:\n\nCoder: Ada Lovelace\nTrack: Python Mastery',
      starterCode: `# Print the two required lines
print("Coder: Ada Lovelace")
# Add the second print statement below
`,
      testCases: [
        {
          inputDescription: 'Check standard output',
          callExpression: 'print("Coder: Ada Lovelace")\nprint("Track: Python Mastery")',
          expectedOutput: 'Coder: Ada Lovelace\nTrack: Python Mastery',
          explanation: 'Both lines must print with exact label casing.',
        },
      ],
      hint: 'Call print() twice, once for the Coder line and once for the Track line.',
      solution: `print("Coder: Ada Lovelace")\nprint("Track: Python Mastery")`,
    },
    keyTakeaways: [
      'Python executes sequentially from top to bottom.',
      'Comments begin with # and are ignored by the Python interpreter.',
      'print() takes multiple arguments and accepts optional sep and end arguments.',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Variables & Core Data Types',
    subtitle: 'Labels in Memory, Primitives & Dynamic Typing',
    act: 'act1',
    difficulty: 'Easy',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[2],
    readTimeMinutes: 12,
    summary: 'Master Python’s foundational data types: strings, integers, floating-point numbers, and booleans. Understand how Python variables act as pointers or label tags.',
    sections: [
      {
        id: 'c2-s1',
        title: 'Variables as Sticky Labels',
        content: `In many languages like C or Java, a variable is thought of as a fixed "box" with a fixed size and type. In Python, **a variable is a name tag (reference) bound to an object in memory**.\n\nWhen you write \`player_score = 100\`, Python allocates an integer object with value 100 in heap memory, and binds the identifier \`player_score\` to that memory address. You do not need to declare types upfront: Python is dynamically typed.`,
        codeSample: `# Python variables are dynamically typed
player_name = "Kira"     # str (text)
player_level = 5         # int (whole number)
health_ratio = 0.95      # float (decimal number)
is_active = True         # bool (True or False)

print(player_name, "is Level", player_level)
print("Health:", health_ratio, "| Active:", is_active)`,
        memorySample: {
          description: 'Identifiers in the local scope table pointing to allocated heap objects.',
          variables: [
            { name: 'player_name', type: 'str', value: '"Kira"', memoryAddress: '0x2010', scope: 'global' },
            { name: 'player_level', type: 'int', value: '5', memoryAddress: '0x2020', scope: 'global' },
            { name: 'health_ratio', type: 'float', value: '0.95', memoryAddress: '0x2030', scope: 'global' },
            { name: 'is_active', type: 'bool', value: 'True', memoryAddress: '0x2040', scope: 'global' },
          ],
        },
        gotcha: {
          title: 'Variable Naming Rules',
          description: 'Variable names can contain letters, numbers, and underscores, but CANNOT start with a number, contain spaces, or use reserved keywords like `for` or `class`.',
          badCode: `2nd_place = "Silver"  # SyntaxError: invalid decimal literal\nuser name = "Bob"     # SyntaxError: invalid syntax`,
          goodCode: `second_place = "Silver"\nuser_name = "Bob"  # Use snake_case in Python!`,
        },
      },
      {
        id: 'c2-s2',
        title: 'Type Inspection & Type Casting',
        content: `You can check an object's type anytime using the \`type()\` function. When you need to convert between types, use type constructor functions: \`int()\`, \`float()\`, and \`str()\`.`,
        codeSample: `age_text = "25"
print("Original type:", type(age_text))

# Convert string to integer
age_number = int(age_text)
print("Converted type:", type(age_number))
print("Next year age:", age_number + 1)`,
      },
      {
        id: 'c2-s3',
        title: 'Modern String Formatting: f-strings',
        content: `Introduced in Python 3.6, **f-strings** (formatted string literals) are the fastest, cleanest, and most readable way to interpolate variables into text. Prefix the string quotation with an \`f\` and enclose expressions inside curly braces \`{ }\`.`,
        codeSample: `hero = "Ada"
gold = 450
item = "Compass"

message = f"{hero} found a {item} worth {gold} gold coins!"
print(message)

# You can even evaluate math directly inside f-strings
print(f"Gold after fee: {gold * 0.9} coins")`,
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What is the type of the value 42.0 in Python?',
        options: ['int', 'float', 'number', 'decimal'],
        correctAnswer: 1,
        explanation: 'Any number with a decimal point is represented as a `float` in Python.',
      },
      {
        id: 'q2-2',
        question: 'Which of the following is a PEP 8 standard variable name?',
        options: ['TotalCount', 'total-count', 'total_count', 'total count'],
        correctAnswer: 2,
        explanation: 'Python convention (PEP 8) prescribes `snake_case` (all lowercase with underscores) for variable and function names.',
      },
      {
        id: 'q2-3',
        question: 'What does f"Value: {5 * 2}" evaluate to?',
        options: ['Value: {5 * 2}', 'Value: 5 * 2', 'Value: 10', 'SyntaxError'],
        correctAnswer: 2,
        explanation: 'Expressions inside curly braces in an f-string are evaluated at runtime, so 5 * 2 becomes 10.',
      },
    ],
    challenge: {
      id: 'ch-02',
      title: 'Mission: Profile Badge Generator',
      difficulty: 'Beginner',
      prompt: 'Define three variables:\n1. `username` set to `"py_explorer"`\n2. `xp` set to `1250`\n3. `verified` set to `True`\n\nThen use an f-string to print: `Agent py_explorer has 1250 XP (Status: True)`',
      starterCode: `# Define your three variables here:
username = "py_explorer"
xp = 1250
verified = True

# Format and print the message using an f-string:
`,
      testCases: [
        {
          inputDescription: 'Inspect badge formatting',
          callExpression: 'print(f"Agent {username} has {xp} XP (Status: {verified})")',
          expectedOutput: 'Agent py_explorer has 1250 XP (Status: True)',
          explanation: 'The output must match the exact pattern.',
        },
      ],
      hint: 'Use print(f"Agent {username} has {xp} XP (Status: {verified})")',
      solution: `username = "py_explorer"\nxp = 1250\nverified = True\nprint(f"Agent {username} has {xp} XP (Status: {verified})")`,
    },
    keyTakeaways: [
      'Python variables are dynamic references to objects in memory.',
      'Primary primitives are int, float, str, and bool.',
      'Use snake_case for variable names.',
      'f-strings (f"Hello {name}") are the preferred method for string formatting.',
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Numbers & Mathematical Operations',
    subtitle: 'Arithmetic, Floor Division, Modulo & Precedence',
    act: 'act1',
    difficulty: 'Easy',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[3],
    readTimeMinutes: 11,
    summary: 'Master arithmetic in Python: addition, subtraction, multiplication, true division, integer floor division, modulo, and exponentiation.',
    sections: [
      {
        id: 'c3-s1',
        title: 'The Seven Essential Arithmetic Operators',
        content: `Python is a beloved tool in science, finance, and AI in large part because its mathematical syntax is exceptionally clean.\n\nNotice the difference between **true division** (\`/\`), which always returns a float, and **floor division** (\`//\`), which rounds down to the nearest integer.`,
        codeSample: `a = 14
b = 4

print("Addition (+):", a + b)        # 18
print("Subtraction (-):", a - b)     # 10
print("Multiplication (*):", a * b)  # 56
print("True Division (/):", a / b)   # 3.5
print("Floor Division (//):", a // b)# 3
print("Modulo Remainder (%):", a % b)# 2
print("Exponentiation (**):", a ** 2)# 196`,
        gotcha: {
          title: 'Division Always Yields Float',
          description: 'Even if numbers divide evenly, single slash `/` produces a float.',
          badCode: `result = 10 / 2\n# Expecting int 5? In Python: type(result) is float (5.0)!`,
          goodCode: `result = 10 // 2  # Produces int 5 when integer division is needed`,
        },
      },
      {
        id: 'c3-s2',
        title: 'Operator Precedence (PEMDAS)',
        content: `Python follows standard mathematical order of operations: Parentheses, Exponentiation, Multiplication/Division, Addition/Subtraction. When in doubt, use parentheses to make your intent crystal clear.`,
        codeSample: `# Without parentheses: 2 * 3 = 6, then 10 - 6 = 4
result1 = 10 - 2 * 3
print("Without parentheses:", result1)

# With parentheses: (10 - 2) = 8, then 8 * 3 = 24
result2 = (10 - 2) * 3
print("With parentheses:", result2)`,
      },
      {
        id: 'c3-s3',
        title: 'Augmented Assignment (Shorthand Operators)',
        content: `In programming, you frequently update a variable based on its existing value (e.g. adding score or incrementing a counter). Python offers shorthand operators like \`+=\`, \`-=\`, \`*=\`, and \`/=\`.`,
        codeSample: `score = 100
score += 25   # Equivalent to: score = score + 25
print("Score after bonus:", score)

lives = 3
lives -= 1    # Equivalent to: lives = lives - 1
print("Lives remaining:", lives)`,
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'What is the result of 17 // 5 in Python?',
        options: ['3.4', '3', '4', '2'],
        correctAnswer: 1,
        explanation: 'Floor division // truncates the decimal remainder, giving 3.',
      },
      {
        id: 'q3-2',
        question: 'What is the result of 17 % 5?',
        options: ['3.4', '3', '2', '1'],
        correctAnswer: 2,
        explanation: 'Modulo % returns the remainder of division: 17 = (5 * 3) + 2, so the remainder is 2.',
      },
      {
        id: 'q3-3',
        question: 'What is the value of 2 ** 3?',
        options: ['6', '8', '9', '5'],
        correctAnswer: 1,
        explanation: 'The double asterisk ** is exponentiation: 2 cubed (2 * 2 * 2) = 8.',
      },
    ],
    challenge: {
      id: 'ch-03',
      title: 'Mission: Time Unit Converter',
      difficulty: 'Beginner',
      prompt: 'Given `total_seconds = 3754`, calculate:\n1. `hours` (using floor division by 3600)\n2. `remaining_seconds` (modulo by 3600)\n3. `minutes` (floor division of remaining_seconds by 60)\n4. `seconds` (modulo of remaining_seconds by 60)\n\nPrint the result formatted as: `3754 seconds is 1h 2m 34s`',
      starterCode: `total_seconds = 3754

# Calculate hours, minutes, and seconds:
hours = total_seconds // 3600
rem = total_seconds % 3600
minutes = rem // 60
seconds = rem % 60

# Print formatted result:
`,
      testCases: [
        {
          inputDescription: 'Check conversion calculation',
          callExpression: 'print(f"{total_seconds} seconds is {hours}h {minutes}m {seconds}s")',
          expectedOutput: '3754 seconds is 1h 2m 34s',
        },
      ],
      hint: 'Use print(f"{total_seconds} seconds is {hours}h {minutes}m {seconds}s")',
      solution: `total_seconds = 3754\nhours = total_seconds // 3600\nrem = total_seconds % 3600\nminutes = rem // 60\nseconds = rem % 60\nprint(f"{total_seconds} seconds is {hours}h {minutes}m {seconds}s")`,
    },
    keyTakeaways: [
      '/ always yields a float, while // performs integer floor division.',
      '% returns the modulo remainder, useful for cycle tracking and odd/even checks.',
      '** is exponentiation (e.g. 2 ** 8 = 256).',
      'Use shorthand += and -= to update counters in place.',
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Making Decisions: Conditionals & Logic',
    subtitle: 'Branching Code with if, elif, else & Boolean Algebra',
    act: 'act2',
    difficulty: 'Medium',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[4],
    readTimeMinutes: 14,
    summary: 'Teach your programs to make intelligent choices. Learn comparison operators, if-elif-else branching, and logical compounding with and, or, and not.',
    sections: [
      {
        id: 'c4-s1',
        title: 'Comparison Operators & Boolean Logic',
        content: `A program without branching is just a fixed script. To make decisions, Python evaluates conditions that result in either \`True\` or \`False\`.\n\nComparison operators include: \`==\` (equal), \`!=\` (not equal), \`<\`, \`>\`, \`<=\`, and \`>=\`.`,
        codeSample: `temperature = 22

is_warm = temperature > 20
is_freezing = temperature <= 0

print("Is warm?", is_warm)        # True
print("Is freezing?", is_freezing) # False`,
        gotcha: {
          title: 'Assignment (=) vs Equality (==)',
          description: 'A single equals sign `=` assigns a variable. Double equals `==` tests for equality. Mixing them up causes a SyntaxError in if statements.',
          badCode: `if score = 100:  # SyntaxError: invalid syntax`,
          goodCode: `if score == 100: # Correct comparison!`,
        },
      },
      {
        id: 'c4-s2',
        title: 'The if-elif-else Decision Tree',
        content: `Python checks conditions from top to bottom. The first condition that evaluates to \`True\` has its indented block executed; all remaining branches are skipped. If none match, the optional \`else\` block executes.`,
        codeSample: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "Needs Improvement"

print(f"Final Grade: {grade}")`,
      },
      {
        id: 'c4-s3',
        title: 'Combining Conditions: and, or, not',
        content: `You can chain multiple criteria using Python's English-like logical keywords:\n- \`and\`: True only if **both** sides are True.\n- \`or\`: True if **at least one** side is True.\n- \`not\`: Inverts the boolean value.`,
        codeSample: `has_ticket = True
age = 16
with_parent = False

# Can enter if 18 or older, OR if they have parent accompaniment
can_enter = has_ticket and (age >= 18 or with_parent)

print("Admission approved:", can_enter)`,
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Which operator checks whether two values are equal?',
        options: ['=', '==', '===', 'equals()'],
        correctAnswer: 1,
        explanation: '`==` is the equality comparison operator in Python.',
      },
      {
        id: 'q4-2',
        question: 'What is the outcome of True and not False?',
        options: ['True', 'False', 'None', 'SyntaxError'],
        correctAnswer: 0,
        explanation: '`not False` evaluates to `True`. Then `True and True` evaluates to `True`.',
      },
      {
        id: 'q4-3',
        question: 'What role does indentation play in an if statement?',
        options: ['It is purely aesthetic', 'It defines the block of code that runs when condition is True', 'It is optional if using braces', 'It causes an error'],
        correctAnswer: 1,
        explanation: 'Indentation in Python defines block scope and determines which statements belong inside the if branch.',
      },
    ],
    challenge: {
      id: 'ch-04',
      title: 'Mission: Smart Thermostat Controller',
      difficulty: 'Beginner',
      prompt: 'Write an `if-elif-else` block for `temp = 28`:\n- If `temp > 30`, print: `AC High`\n- Else if `temp >= 24`, print: `AC Moderate`\n- Else if `temp >= 18`, print: `Comfort Zone`\n- Else, print: `Heater On`',
      starterCode: `temp = 28

# Write your branching conditions below:
if temp > 30:
    print("AC High")
elif temp >= 24:
    print("AC Moderate")
elif temp >= 18:
    print("Comfort Zone")
else:
    print("Heater On")
`,
      testCases: [
        {
          inputDescription: 'Evaluate temp = 28',
          callExpression: 'if temp > 30:\n    print("AC High")\nelif temp >= 24:\n    print("AC Moderate")\nelif temp >= 18:\n    print("Comfort Zone")\nelse:\n    print("Heater On")',
          expectedOutput: 'AC Moderate',
        },
      ],
      hint: 'Check temp >= 24 after checking temp > 30.',
      solution: `temp = 28\nif temp > 30:\n    print("AC High")\nelif temp >= 24:\n    print("AC Moderate")\nelif temp >= 18:\n    print("Comfort Zone")\nelse:\n    print("Heater On")`,
    },
    keyTakeaways: [
      'Indent 4 spaces for every child block inside an if, elif, or else statement.',
      'Use == for equality check and = for assignment.',
      'Python uses and, or, and not for boolean logic instead of symbols like && or ||.',
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'Loops & Iteration',
    subtitle: 'for Loops, range(), while Loops, break & continue',
    act: 'act2',
    difficulty: 'Medium',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[5],
    readTimeMinutes: 13,
    summary: 'Automate repetitive tasks effortlessly. Learn how for-in loops iterate sequences, how range() generates sequences of numbers, and how while loops repeat based on dynamic conditions.',
    sections: [
      {
        id: 'c5-s1',
        title: 'The for Loop and range()',
        content: `In Python, a \`for\` loop iterates over items of any sequence (like a list, a string, or a range of numbers). The \`range()\` function is commonly used to run a loop a specific number of times.\n\n\`range(start, stop, step)\`:\n- \`stop\` is non-inclusive (e.g. \`range(5)\` goes from 0 up to 4).`,
        codeSample: `# Counting from 0 to 4
for i in range(5):
    print(f"Step {i}")

# Specifying start and stop
for count in range(1, 4):
    print(f"Count: {count}")

# Stepping in increments of 2
for even in range(2, 9, 2):
    print(f"Even number: {even}")`,
      },
      {
        id: 'c5-s2',
        title: 'The while Loop & Loop Safety',
        content: `A \`while\` loop repeatedly executes as long as its condition remains \`True\`. Always ensure the loop body updates the condition so the loop eventually terminates!`,
        codeSample: `countdown = 3

while countdown > 0:
    print(f"T-minus {countdown}...")
    countdown -= 1

print("Blastoff!")`,
        gotcha: {
          title: 'Infinite Loop Hazard',
          description: 'If you forget to increment or decrement the loop condition variable, a while loop will run forever until memory is exhausted.',
          badCode: `i = 0\nwhile i < 5:\n    print(i)\n    # Forgot i += 1! Runs infinitely!`,
          goodCode: `i = 0\nwhile i < 5:\n    print(i)\n    i += 1  # Guaranteed to finish`,
        },
      },
      {
        id: 'c5-s3',
        title: 'Loop Flow: break and continue',
        content: `- \`break\`: Exits the loop immediately.\n- \`continue\`: Skips the rest of the current iteration and jumps to the next one.`,
        codeSample: `# Skipping odd numbers with continue
for num in range(1, 8):
    if num % 2 != 0:
        continue
    print(f"Processing even: {num}")

# Halting search with break
target = 4
for num in range(10):
    if num == target:
        print(f"Found target {target}! Stopping.")
        break`,
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'What numbers are generated by range(2, 6)?',
        options: ['[2, 3, 4, 5, 6]', '[2, 3, 4, 5]', '[3, 4, 5, 6]', '[2, 4, 6]'],
        correctAnswer: 1,
        explanation: 'range(start, stop) includes start (2) but excludes stop (6), giving 2, 3, 4, 5.',
      },
      {
        id: 'q5-2',
        question: 'What does the break statement do inside a loop?',
        options: ['Pauses the loop for 1 second', 'Skips to the next iteration', 'Exits the loop immediately', 'Restarts the loop from beginning'],
        correctAnswer: 2,
        explanation: 'break instantly terminates the innermost active loop.',
      },
      {
        id: 'q5-3',
        question: 'How many times will while count < 3 execute if count starts at 0 and increments by 1?',
        options: ['2 times', '3 times (0, 1, 2)', '4 times', 'Infinitely'],
        correctAnswer: 1,
        explanation: 'It runs for count=0, count=1, and count=2. When count reaches 3, 3 < 3 is False and the loop stops.',
      },
    ],
    challenge: {
      id: 'ch-05',
      title: 'Mission: Accumulator & Sum of Multiples',
      difficulty: 'Beginner',
      prompt: 'Write a loop that calculates the sum of all numbers from 1 to 20 that are divisible by 3. Store the total in `total_sum` and print: `Total sum: <value>`.',
      starterCode: `total_sum = 0

# Loop through numbers from 1 to 20:
for n in range(1, 21):
    if n % 3 == 0:
        total_sum += n

print(f"Total sum: {total_sum}")
`,
      testCases: [
        {
          inputDescription: 'Check sum of multiples of 3 up to 20',
          callExpression: 'print(f"Total sum: {total_sum}")',
          expectedOutput: 'Total sum: 63',
          explanation: '3 + 6 + 9 + 12 + 15 + 18 = 63.',
        },
      ],
      hint: 'Use n % 3 == 0 inside for n in range(1, 21).',
      solution: `total_sum = 0\nfor n in range(1, 21):\n    if n % 3 == 0:\n        total_sum += n\nprint(f"Total sum: {total_sum}")`,
    },
    keyTakeaways: [
      'for loops iterate over any sequence smoothly.',
      'range(start, stop, step) generates sequences without holding all numbers in memory.',
      'Use break to exit loops early and continue to bypass the remainder of an iteration.',
    ],
  },
  {
    id: 6,
    number: '06',
    title: 'Ordered Collections: Lists & Tuples',
    subtitle: 'Dynamic Arrays, Zero-Based Indexing & Slicing Magic',
    act: 'act2',
    difficulty: 'Medium',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[6],
    readTimeMinutes: 15,
    summary: 'Organize related data into collections. Master list indexing, negative offsets, slicing syntax [start:stop:step], append/pop methods, and immutable tuples.',
    sections: [
      {
        id: 'c6-s1',
        title: 'Lists: Mutable Ordered Sequences',
        content: `A list is an ordered, mutable sequence enclosed in square brackets \`[ ]\`. Lists can hold any combination of data types. Elements are indexed starting at 0. You can also use negative indexes to access elements counting backwards from the end (-1 is the last item).`,
        codeSample: `languages = ["Python", "Rust", "TypeScript", "Go"]

print("First language:", languages[0])    # Python
print("Last language:", languages[-1])     # Go
print("Second to last:", languages[-2])   # TypeScript

# Modifying items (Lists are mutable)
languages[1] = "Modern Python"
print("Updated list:", languages)`,
        memorySample: {
          description: 'The list identifier points to a contiguous array of references in heap memory.',
          variables: [
            { name: 'languages', type: 'list', value: '["Python", "Rust", "Go"]', memoryAddress: '0x3010', isReference: true, scope: 'global' },
          ],
        },
      },
      {
        id: 'c6-s2',
        title: 'The Power of List Slicing',
        content: `Python features one of the most elegant slicing notations in computer science: \`list[start:stop:step]\`. Like \`range()\`, \`stop\` is non-inclusive. Omitted start defaults to index 0, and omitted stop defaults to the end.`,
        codeSample: `digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print("First three:", digits[:3])       # [0, 1, 2]
print("From index 6 to end:", digits[6:])# [6, 7, 8, 9]
print("Middle slice:", digits[3:7])     # [3, 4, 5, 6]
print("Every second item:", digits[::2])# [0, 2, 4, 6, 8]
print("Reversed list:", digits[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]`,
      },
      {
        id: 'c6-s3',
        title: 'Essential List Methods & Tuples',
        content: `Common list methods:\n- \`.append(x)\`: Adds \`x\` to the end of the list.\n- \`.pop()\`: Removes and returns the last element.\n- \`.insert(i, x)\`: Inserts \`x\` at index \`i\`.\n- \`len(list)\`: Returns the element count.\n\n**Tuples** are created using parentheses \`(1, 2, 3)\` and are **immutable** (cannot be changed after creation). Use tuples when data should remain constant, like geographic coordinates \`(latitude, longitude)\`.`,
        codeSample: `inventory = ["Potion", "Shield"]

inventory.append("Sword")
print("After append:", inventory)

removed_item = inventory.pop()
print("Popped:", removed_item)
print("Current inventory:", inventory)

# Tuple example
coordinates = (37.7749, -122.4194)
print("San Francisco:", coordinates[0], coordinates[1])`,
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'What is fruits[-1] if fruits = ["apple", "banana", "cherry"]?',
        options: ['apple', 'banana', 'cherry', 'IndexError'],
        correctAnswer: 2,
        explanation: 'Index -1 accesses the final item of a sequence, which is "cherry".',
      },
      {
        id: 'q6-2',
        question: 'What does items[1:3] return if items = ["a", "b", "c", "d"]?',
        options: ['["a", "b"]', '["b", "c"]', '["b", "c", "d"]', '["c", "d"]'],
        correctAnswer: 1,
        explanation: 'Index 1 is "b", index 2 is "c", and stop index 3 is excluded.',
      },
      {
        id: 'q6-3',
        question: 'What distinguishes a tuple from a list?',
        options: ['Tuples can only store numbers', 'Tuples are immutable (cannot be changed)', 'Tuples use curly brackets', 'Tuples do not support indexing'],
        correctAnswer: 1,
        explanation: 'Tuples are immutable; attempting to reassign a tuple element raises a TypeError.',
      },
    ],
    challenge: {
      id: 'ch-06',
      title: 'Mission: Data Pipeline Filter',
      difficulty: 'Beginner',
      prompt: 'Given `raw_data = [12, -4, 25, 0, -8, 19, 30]`, write code to:\n1. Create an empty list called `positive_numbers`\n2. Loop through `raw_data` and `.append()` each number greater than 0\n3. Print the result as: `Filtered: <list>`',
      starterCode: `raw_data = [12, -4, 25, 0, -8, 19, 30]
positive_numbers = []

# Filter numbers greater than 0:
for item in raw_data:
    if item > 0:
        positive_numbers.append(item)

print(f"Filtered: {positive_numbers}")
`,
      testCases: [
        {
          inputDescription: 'Filter positive numbers',
          callExpression: 'print(f"Filtered: {positive_numbers}")',
          expectedOutput: 'Filtered: [12, 25, 19, 30]',
        },
      ],
      hint: 'Check if item > 0, then positive_numbers.append(item).',
      solution: `raw_data = [12, -4, 25, 0, -8, 19, 30]\npositive_numbers = []\nfor item in raw_data:\n    if item > 0:\n        positive_numbers.append(item)\nprint(f"Filtered: {positive_numbers}")`,
    },
    keyTakeaways: [
      'Lists are mutable ordered sequences indexed from 0.',
      'Negative indexing allows clean access from the end (-1 is the last item).',
      'Slicing [start:stop:step] creates a new sub-list.',
      'Tuples (a, b) are immutable and protect static data from accidental changes.',
    ],
  },
  {
    id: 7,
    number: '07',
    title: 'Key-Value Mapping: Dictionaries & Sets',
    subtitle: 'Hash Maps, Fast Lookups & Unique Collections',
    act: 'act2',
    difficulty: 'Medium',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[7],
    readTimeMinutes: 14,
    summary: 'Master associative data structures. Learn how Python dictionaries pair unique keys to values for blazing fast lookups, and how sets ensure unique values.',
    sections: [
      {
        id: 'c7-s1',
        title: 'Dictionaries: Storing Key-Value Pairs',
        content: `A dictionary is an associative collection enclosed in curly braces \`{ }\` where data is stored as \`key: value\` pairs. Instead of looking up items by numerical index, you look them up by meaningful keys (such as strings or IDs).\n\nKeys must be immutable (like strings or integers) and unique. Values can be anything.`,
        codeSample: `pilot = {
    "name": "Alex Vance",
    "callsign": "Falcon",
    "missions": 42,
    "active": True
}

# Accessing values
print("Pilot name:", pilot["name"])
print("Missions count:", pilot["missions"])

# Adding new keys and updating existing ones
pilot["rank"] = "Captain"
pilot["missions"] += 1
print("Updated pilot:", pilot)`,
        gotcha: {
          title: 'Direct Key Lookup vs .get()',
          description: 'Accessing a key that does not exist using bracket notation `dict[key]` triggers a KeyError crash. Using `dict.get(key, default)` safely returns None or a fallback value.',
          badCode: `print(pilot["planet"])  # KeyError: 'planet'`,
          goodCode: `print(pilot.get("planet", "Earth"))  # Safe! Prints 'Earth'`,
        },
      },
      {
        id: 'c7-s2',
        title: 'Iterating Through Dictionaries',
        content: `You can loop over keys, values, or both simultaneously using \`.keys()\`, \`.values()\`, and \`.items()\`.`,
        codeSample: `inventory = {"apples": 10, "oranges": 4, "peaches": 7}

# Iterating over key and value pairs
for fruit, count in inventory.items():
    print(f"We have {count} {fruit}")`,
      },
      {
        id: 'c7-s3',
        title: 'Sets: Fast Uniqueness',
        content: `A \`set\` is an unordered collection of unique elements. Sets automatically eliminate duplicates and support mathematical set operations like unions and intersections.`,
        codeSample: `# Automatic deduplication
user_tags = {"python", "ai", "web", "python", "ai"}
print("Unique tags:", user_tags)  # {'python', 'ai', 'web'}

# Deduplicating a list using set()
numbers_with_duplicates = [1, 2, 2, 3, 4, 4, 4, 5]
unique_numbers = list(set(numbers_with_duplicates))
print("Deduplicated list:", unique_numbers)`,
      },
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'What happens when you look up a non-existent key with pilot.get("ship", "Unassigned")?',
        options: ['Raises KeyError', 'Returns None', 'Returns "Unassigned"', 'Crashes program'],
        correctAnswer: 2,
        explanation: '`.get()` returns the provided default value ("Unassigned") if the key is missing.',
      },
      {
        id: 'q7-2',
        question: 'Which method returns a list of (key, value) pairs from a dictionary?',
        options: ['.pairs()', '.items()', '.entries()', '.all()'],
        correctAnswer: 1,
        explanation: 'The `.items()` method returns an iterable of (key, value) tuples.',
      },
      {
        id: 'q7-3',
        question: 'What is len(set([1, 1, 2, 2, 3]))?',
        options: ['5', '3', '2', '1'],
        correctAnswer: 1,
        explanation: 'Sets deduplicate identical items, so {1, 2, 3} has a length of 3.',
      },
    ],
    challenge: {
      id: 'ch-07',
      title: 'Mission: Inventory Value Calculator',
      difficulty: 'Beginner',
      prompt: 'Given `prices = {"potion": 15, "elixir": 40, "antidote": 25}` and `cart = {"potion": 2, "elixir": 1}`:\nCalculate the total cost of items in the cart and print: `Total cart cost: <value>`',
      starterCode: `prices = {"potion": 15, "elixir": 40, "antidote": 25}
cart = {"potion": 2, "elixir": 1}

total_cost = 0
for item, qty in cart.items():
    total_cost += prices[item] * qty

print(f"Total cart cost: {total_cost}")
`,
      testCases: [
        {
          inputDescription: 'Calculate cart cost',
          callExpression: 'print(f"Total cart cost: {total_cost}")',
          expectedOutput: 'Total cart cost: 70',
          explanation: '(15 * 2) + (40 * 1) = 70.',
        },
      ],
      hint: 'Multiply prices[item] by qty for each item in cart.items().',
      solution: `prices = {"potion": 15, "elixir": 40, "antidote": 25}\ncart = {"potion": 2, "elixir": 1}\ntotal_cost = 0\nfor item, qty in cart.items():\n    total_cost += prices[item] * qty\nprint(f"Total cart cost: {total_cost}")`,
    },
    keyTakeaways: [
      'Dictionaries store data as key-value pairs with O(1) average lookup time.',
      'Use .get() to safely read keys without risking KeyError crashes.',
      'Loop over key-value pairs with for key, val in dict.items().',
      'Sets store unique elements and instantly eliminate duplicates.',
    ],
  },
  {
    id: 8,
    number: '08',
    title: 'Modular Code: Functions & Scope',
    subtitle: 'def Statements, Parameters, Return Values & Scope',
    act: 'act3',
    difficulty: 'Medium',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[8],
    readTimeMinutes: 16,
    summary: 'The bedrock of maintainable software. Learn how to write reusable functions with def, pass arguments, return values, set default parameters, and understand scope.',
    sections: [
      {
        id: 'c8-s1',
        title: 'Defining Functions with def',
        content: `A function is a named block of code that performs a specific task. Functions allow you to adhere to the DRY principle (Don't Repeat Yourself). You define a function with the \`def\` keyword, followed by the function name, parentheses for arguments, and a colon.`,
        codeSample: `def greet(name):
    """Prints a friendly greeting to the named user."""
    print(f"Greetings, {name}! Welcome to the codebase.")

greet("Ada")
greet("Guido")`,
      },
      {
        id: 'c8-s2',
        title: 'Return Values vs Printing',
        content: `A common beginner point of confusion is the difference between \`print()\` and \`return\`. \`print()\` displays text to the human watching the console; \`return\` sends a value back into the program so other functions can use it.`,
        codeSample: `def calculate_tax(subtotal, rate=0.07):
    """Calculates tax amount and returns it."""
    tax = subtotal * rate
    return round(tax, 2)

order_tax = calculate_tax(150.00)
print("Returned tax value:", order_tax)

# Using the returned value in further calculations
total_bill = 150.00 + order_tax
print("Final bill:", total_bill)`,
        gotcha: {
          title: 'Functions Without return Give None',
          description: 'If a Python function finishes without an explicit return statement, it silently returns None.',
          badCode: `def add(a, b):\n    result = a + b  # Forgot return!\n\nx = add(2, 3)\nprint(x)  # Prints None!`,
          goodCode: `def add(a, b):\n    return a + b\n\nx = add(2, 3)\nprint(x)  # Prints 5!`,
        },
      },
      {
        id: 'c8-s3',
        title: 'Variable Scope: Local vs Global',
        content: `Variables created inside a function are **local** to that function. They exist only while the function is executing and disappear when it finishes. Variables created outside in the main script are **global**.`,
        codeSample: `app_name = "Python Mastery"  # Global variable

def show_version():
    version_id = "v3.12"      # Local variable
    print(f"{app_name} running on {version_id}")

show_version()
# Trying to access version_id outside raises NameError!`,
      },
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'Which keyword is used to define a new function in Python?',
        options: ['function', 'func', 'def', 'define'],
        correctAnswer: 2,
        explanation: 'Python uses the keyword `def` (short for define).',
      },
      {
        id: 'q8-2',
        question: 'What is the return value of a function that does not contain a return statement?',
        options: ['0', 'False', '"" (empty string)', 'None'],
        correctAnswer: 3,
        explanation: 'Any Python function without an explicit return statement returns `None` by default.',
      },
      {
        id: 'q8-3',
        question: 'What is a default parameter in Python?',
        options: ['A parameter that cannot be changed', 'A parameter that assumes a fallback value if not passed by caller', 'A mandatory parameter', 'A global variable'],
        correctAnswer: 1,
        explanation: 'Default parameters (e.g. `rate=0.07`) provide fallback values if the caller omits that argument.',
      },
    ],
    challenge: {
      id: 'ch-08',
      title: 'Mission: Temperature Converter Function',
      difficulty: 'Beginner',
      prompt: 'Write a function `celsius_to_fahrenheit(c)` that returns the Fahrenheit equivalent using formula `(c * 9/5) + 32`.\n\nThen call the function with `25` and print: `25C is <result>F`.',
      starterCode: `def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

temp_c = 25
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}C is {temp_f}F")
`,
      testCases: [
        {
          inputDescription: 'Convert 25C to Fahrenheit',
          callExpression: 'print(f"{temp_c}C is {temp_f}F")',
          expectedOutput: '25C is 77.0F',
          explanation: '(25 * 9/5) + 32 = 45 + 32 = 77.0.',
        },
      ],
      hint: 'Formula: return (c * 9/5) + 32',
      solution: `def celsius_to_fahrenheit(c):\n    return (c * 9/5) + 32\ntemp_c = 25\ntemp_f = celsius_to_fahrenheit(temp_c)\nprint(f"{temp_c}C is {temp_f}F")`,
    },
    keyTakeaways: [
      'Functions encapsulate logic and promote code reuse.',
      'return sends data back to the caller; print only displays text to the screen.',
      'Variables inside functions are local to that function call.',
    ],
  },
  {
    id: 9,
    number: '09',
    title: 'Resilient Code: Errors & Exceptions',
    subtitle: 'Reading Tracebacks, try/except Blocks & Defensive Coding',
    act: 'act3',
    difficulty: 'Hard',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[9],
    readTimeMinutes: 13,
    summary: 'Crash-proof your code. Learn how to diagnose syntax vs runtime errors, read Python tracebacks like a senior engineer, and catch exceptions with try and except blocks.',
    sections: [
      {
        id: 'c9-s1',
        title: 'The Anatomy of a Python Traceback',
        content: `When an unhandled error happens in Python, it doesn't just crash silently: it prints a **traceback**. A traceback tells you:\n1. The file and line number where the error occurred.\n2. The sequence of function calls leading to the error.\n3. The exact Exception name (e.g. \`ZeroDivisionError\`, \`IndexError\`, \`ValueError\`).\n4. A human-readable message explaining the problem.`,
        codeSample: `# Examples of common exceptions:
# 1. ZeroDivisionError: division by zero
# 2. ValueError: invalid literal for int()
# 3. IndexError: list index out of range
# 4. KeyError: dictionary key not found
# 5. TypeError: unsupported operand type(s)`,
      },
      {
        id: 'c9-s2',
        title: 'Handling Errors with try & except',
        content: `Instead of allowing unexpected user input to crash your program, you wrap risky operations in a \`try\` block and handle the error inside an \`except\` block.`,
        codeSample: `def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Cannot divide by zero! Returning 0.")
        return 0

print("10 / 2 =", safe_divide(10, 2))
print("10 / 0 =", safe_divide(10, 0))`,
        gotcha: {
          title: 'Avoid Bare except: Clauses',
          description: 'Catching every exception indiscriminately (`except:`) can swallow syntax errors and keyboard interrupts, making debugging almost impossible. Always specify the exception type.',
          badCode: `try:\n    do_something()\nexcept:\n    pass  # Silently swallows all bugs!`,
          goodCode: `try:\n    do_something()\nexcept ValueError as e:\n    print(f"Handled value error: {e}")`,
        },
      },
      {
        id: 'c9-s3',
        title: 'The Full Error Lifecycle: finally',
        content: `You can also include a \`finally\` block, which **always** runs whether an exception was raised or not. This is commonly used for cleanup operations (like closing files or network sockets).`,
        codeSample: `def process_transaction(amount):
    try:
        print(f"Starting transaction for \${amount}...")
        if amount <= 0:
            raise ValueError("Amount must be positive")
        print("Transaction successful!")
    except ValueError as err:
        print(f"Transaction failed: {err}")
    finally:
        print("Closing database connection.")

process_transaction(-50)`,
      },
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'What exception is raised when executing 100 / 0?',
        options: ['ArithmeticError', 'ZeroDivisionError', 'MathDomainError', 'OverflowError'],
        correctAnswer: 1,
        explanation: 'Dividing any number by zero raises a ZeroDivisionError in Python.',
      },
      {
        id: 'q9-2',
        question: 'When does code inside a finally block execute?',
        options: ['Only if no exception was raised', 'Only if an exception was raised', 'Always, regardless of exceptions', 'Only when explicitly called'],
        correctAnswer: 2,
        explanation: 'A `finally` block is guaranteed to execute whether the try block succeeded or an exception was caught.',
      },
      {
        id: 'q9-3',
        question: 'What error occurs if you try to convert int("hello")?',
        options: ['TypeError', 'ValueError', 'ConversionError', 'SyntaxError'],
        correctAnswer: 1,
        explanation: 'Converting non-numeric strings to int() raises a ValueError.',
      },
    ],
    challenge: {
      id: 'ch-09',
      title: 'Mission: Safe Number Parser',
      difficulty: 'Beginner',
      prompt: 'Write a function `parse_age(age_str)` that converts `age_str` to an integer using `int()`. If a `ValueError` occurs, catch it and return `-1`. Otherwise return the integer.\n\nTest it with `parse_age("not_a_number")` and print: `Result: <value>`.',
      starterCode: `def parse_age(age_str):
    try:
        return int(age_str)
    except ValueError:
        return -1

test_result = parse_age("not_a_number")
print(f"Result: {test_result}")
`,
      testCases: [
        {
          inputDescription: 'Handle invalid age conversion gracefully',
          callExpression: 'print(f"Result: {test_result}")',
          expectedOutput: 'Result: -1',
        },
      ],
      hint: 'Wrap return int(age_str) in try/except ValueError: return -1',
      solution: `def parse_age(age_str):\n    try:\n        return int(age_str)\n    except ValueError:\n        return -1\ntest_result = parse_age("not_a_number")\nprint(f"Result: {test_result}")`,
    },
    keyTakeaways: [
      'Tracebacks provide file, line number, and error type clues.',
      'Use try/except to gracefully handle anticipated edge cases.',
      'Always specify the explicit error type (e.g. ValueError) rather than a bare except.',
      'finally blocks execute unconditionally for safe resource cleanup.',
    ],
  },
  {
    id: 10,
    number: '10',
    title: 'Object-Oriented Python & Mini-Projects',
    subtitle: 'Classes, Objects, Methods & Practical Capstone Projects',
    act: 'act3',
    difficulty: 'Hard',
    challengesByDifficulty: DIFFICULTY_CHALLENGES[10],
    readTimeMinutes: 18,
    summary: 'Bring all your Python skills together! Master classes, attributes, methods, and the self parameter. Build practical mini-projects: a Character RPG engine and a Password Generator.',
    projectNote: 'Capstone Chapter: Includes full working implementations of a Text Adventure Hero and Password Generator.',
    sections: [
      {
        id: 'c10-s1',
        title: 'Classes as Blueprints, Objects as Instances',
        content: `Object-Oriented Programming (OOP) is a paradigm for modeling real-world concepts in code. A **class** is a blueprint (like an architectural drawing of a house); an **object** or **instance** is the actual house built from that blueprint.\n\nThe special \`__init__()\` method is the **constructor** that runs automatically whenever you instantiate a new object. The \`self\` parameter refers to the current object instance.`,
        codeSample: `class Hero:
    def __init__(self, name, role, health=100):
        self.name = name
        self.role = role
        self.health = health

    def take_damage(self, amount):
        self.health -= amount
        print(f"{self.name} took {amount} damage! Remaining health: {self.health}")

    def is_alive(self):
        return self.health > 0

# Creating instances (objects)
hero1 = Hero("Kira", "Mage", 80)
print(f"Hero created: {hero1.name} the {hero1.role}")

hero1.take_damage(25)
print("Is alive?", hero1.is_alive())`,
        memorySample: {
          description: 'Class instances are allocated on the heap with internal dictionary mappings for instance variables.',
          variables: [
            { name: 'hero1', type: 'object', value: '<Hero Kira>', memoryAddress: '0x4010', isReference: true, scope: 'global' },
          ],
        },
      },
      {
        id: 'c10-s2',
        title: 'Capstone Mini-Project 1: Secure Password Generator',
        content: `Let's combine random selection, lists, string manipulation, and functions into a practical utility tool: a configurable Password Generator.`,
        codeSample: `import random

def generate_password(length=12):
    characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    password = ""
    for _ in range(length):
        password += random.choice(characters)
    return password

new_pass = generate_password(14)
print("Generated Secure Password:", new_pass)`,
      },
      {
        id: 'c10-s3',
        title: 'Capstone Mini-Project 2: Text RPG Battle Simulator',
        content: `Here we combine classes, while loops, conditionals, and math into a text-based duel simulator between two characters.`,
        codeSample: `class Fighter:
    def __init__(self, name, power, hp):
        self.name = name
        self.power = power
        self.hp = hp

    def attack(self, target):
        damage = self.power
        target.hp -= damage
        print(f"{self.name} strikes {target.name} for {damage} damage! ({target.name} HP: {target.hp})")

knight = Fighter("Arthur", 15, 40)
goblin = Fighter("Goblin Raider", 8, 25)

# Round 1
knight.attack(goblin)
goblin.attack(knight)

print("Battle ongoing...")`,
      },
    ],
    quiz: [
      {
        id: 'q1-10',
        question: 'What is the role of the __init__ method in a Python class?',
        options: ['It deletes an object', 'It initializes new object instances upon creation', 'It converts a class to string', 'It is optional for inheritance only'],
        correctAnswer: 1,
        explanation: '`__init__` is the constructor method in Python, called automatically when creating a new instance.',
      },
      {
        id: 'q2-10',
        question: 'What does the self parameter represent inside a method?',
        options: ['The parent class', 'The current instance of the class', 'A global variable', 'The Python interpreter'],
        correctAnswer: 1,
        explanation: '`self` refers to the specific instance of the class that called the method.',
      },
      {
        id: 'q3-10',
        question: 'What happens when you instantiate a class with Hero("Ada", 100)?',
        options: ['It calls the __init__ method with those arguments', 'It creates a static variable', 'It imports the class', 'It throws a TypeError'],
        correctAnswer: 0,
        explanation: 'Calling the class name invokes `__init__` with the passed arguments.',
      },
    ],
    challenge: {
      id: 'ch-10',
      title: 'Mission: Bank Account Class',
      difficulty: 'Intermediate',
      prompt: 'Create a `BankAccount` class with:\n- `__init__(self, owner, balance)`\n- `deposit(self, amount)` that adds to `self.balance`\n- `get_balance(self)` that returns `self.balance`\n\nCreate an account for `"Ada"` with `100`, deposit `50`, and print: `Owner Ada has \$<balance>`.',
      starterCode: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def get_balance(self):
        return self.balance

account = BankAccount("Ada", 100)
account.deposit(50)
print(f"Owner {account.owner} has \${account.get_balance()}")
`,
      testCases: [
        {
          inputDescription: 'Create BankAccount and deposit 50',
          callExpression: 'print(f"Owner {account.owner} has \${account.get_balance()}")',
          expectedOutput: 'Owner Ada has $150',
        },
      ],
      hint: 'Define deposit(self, amount): self.balance += amount',
      solution: `class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n    def get_balance(self): return self.balance\naccount = BankAccount("Ada", 100)\naccount.deposit(50)\nprint(f"Owner {account.owner} has \${account.get_balance()}")`,
    },
    keyTakeaways: [
      'Classes define blueprints for state (attributes) and behavior (methods).',
      '__init__ is the initializer constructor and self binds to the specific instance.',
      'Real-world Python programs combine classes, functions, and data structures to build games, scripts, and production systems.',
    ],
  },
];
