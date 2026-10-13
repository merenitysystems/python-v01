/**
 * Tiered coding challenges for all 10 chapters across Easy, Medium, and Hard difficulty levels.
 * Dynamically adjusts challenge prompt, starter code, test suites, and reference solutions.
 */

import { Challenge, DifficultyLevel } from '../types';

export const DIFFICULTY_CHALLENGES: Record<number, Record<DifficultyLevel, Challenge>> = {
  // Chapter 1: The First Breath
  1: {
    Easy: {
      id: 'ch-01-easy',
      title: 'Level 1 (Easy): Terminal Greeting',
      difficulty: 'Easy',
      prompt: 'Write two print statements to output your developer codename and specialty:\n\nCoder: Ada Lovelace\nTrack: Python Mastery',
      starterCode: `print("Coder: Ada Lovelace")\n# Add the second print statement below:\n`,
      testCases: [
        {
          inputDescription: 'Check standard output',
          callExpression: 'print("Coder: Ada Lovelace")\nprint("Track: Python Mastery")',
          expectedOutput: 'Coder: Ada Lovelace\nTrack: Python Mastery',
        },
      ],
      hint: 'Call print() twice, once for the Coder line and once for the Track line.',
      solution: `print("Coder: Ada Lovelace")\nprint("Track: Python Mastery")`,
    },
    Medium: {
      id: 'ch-01-med',
      title: 'Level 2 (Medium): Formatted System Banner',
      difficulty: 'Medium',
      prompt: 'Use the `sep` and `end` arguments of `print()` to format a 3-part header:\n1. Print `"SYSTEM"`, `"ONLINE"`, `"2026"` separated by `" | "`.\n2. On the same line using `end=" -> "`, and follow it with `print("READY")`.\n\nExpected output:\nSYSTEM | ONLINE | 2026 -> READY',
      starterCode: `# Use sep=" | " and end=" -> "\nprint("SYSTEM", "ONLINE", "2026", sep=" | ", end=" -> ")\nprint("READY")\n`,
      testCases: [
        {
          inputDescription: 'Inspect custom separators and endings',
          callExpression: 'print("SYSTEM", "ONLINE", "2026", sep=" | ", end=" -> ")\nprint("READY")',
          expectedOutput: 'SYSTEM | ONLINE | 2026 -> READY',
        },
      ],
      hint: 'Combine sep=" | " and end=" -> " in the first print call.',
      solution: `print("SYSTEM", "ONLINE", "2026", sep=" | ", end=" -> ")\nprint("READY")`,
    },
    Hard: {
      id: 'ch-01-hard',
      title: 'Level 3 (Hard): Terminal Receipt Generator',
      difficulty: 'Hard',
      prompt: 'Generate a formatted 3-line receipt using `sep` and custom alignment:\nLine 1: `ITEM:BOOK | QTY:2` (use sep=" | ")\nLine 2: `-----------------` (exactly 17 dashes)\nLine 3: `TOTAL: $39.99`',
      starterCode: `# Produce the 3 receipt lines:\nprint("ITEM:BOOK", "QTY:2", sep=" | ")\nprint("-" * 17)\nprint("TOTAL: $39.99")\n`,
      testCases: [
        {
          inputDescription: 'Verify exact 3-line receipt layout',
          callExpression: 'print("ITEM:BOOK", "QTY:2", sep=" | ")\nprint("-" * 17)\nprint("TOTAL: $39.99")',
          expectedOutput: 'ITEM:BOOK | QTY:2\n-----------------\nTOTAL: $39.99',
        },
      ],
      hint: 'Use print("ITEM:BOOK", "QTY:2", sep=" | ") then print("-" * 17) and print("TOTAL: $39.99").',
      solution: `print("ITEM:BOOK", "QTY:2", sep=" | ")\nprint("-" * 17)\nprint("TOTAL: $39.99")`,
    },
  },

  // Chapter 2: Variables & Core Data Types
  2: {
    Easy: {
      id: 'ch-02-easy',
      title: 'Level 1 (Easy): Profile Badge Generator',
      difficulty: 'Easy',
      prompt: 'Define `username = "py_explorer"`, `xp = 1250`, and `verified = True`.\nUse an f-string to print:\n`Agent py_explorer has 1250 XP (Status: True)`',
      starterCode: `username = "py_explorer"\nxp = 1250\nverified = True\n\n# Print using f-string:\n`,
      testCases: [
        {
          inputDescription: 'Inspect badge formatting',
          callExpression: 'print(f"Agent {username} has {xp} XP (Status: {verified})")',
          expectedOutput: 'Agent py_explorer has 1250 XP (Status: True)',
        },
      ],
      hint: 'Use print(f"Agent {username} has {xp} XP (Status: {verified})")',
      solution: `username = "py_explorer"\nxp = 1250\nverified = True\nprint(f"Agent {username} has {xp} XP (Status: {verified})")`,
    },
    Medium: {
      id: 'ch-02-med',
      title: 'Level 2 (Medium): Dynamic Type Conversion & Rebinding',
      difficulty: 'Medium',
      prompt: 'Given string `raw_input = "450"`:\n1. Convert it to integer `base_val`\n2. Add `50` to it, producing `final_val`\n3. Print: `Base: 450, Final: 500, Type: <class \'int\'>`',
      starterCode: `raw_input = "450"\nbase_val = int(raw_input)\nfinal_val = base_val + 50\nprint(f"Base: {base_val}, Final: {final_val}, Type: {type(final_val)}")\n`,
      testCases: [
        {
          inputDescription: 'Check type conversion and arithmetic',
          callExpression: 'print(f"Base: {base_val}, Final: {final_val}, Type: {type(final_val)}")',
          expectedOutput: "Base: 450, Final: 500, Type: <class 'int'>",
        },
      ],
      hint: 'Convert with int(raw_input) and inspect with type(final_val).',
      solution: `raw_input = "450"\nbase_val = int(raw_input)\nfinal_val = base_val + 50\nprint(f"Base: {base_val}, Final: {final_val}, Type: {type(final_val)}")`,
    },
    Hard: {
      id: 'ch-02-hard',
      title: 'Level 3 (Hard): Multi-Field Payload Serializer',
      difficulty: 'Hard',
      prompt: 'Parse values from 3 variables: `user_id = "USER_981"`, `rating = 4.85`, and `is_premium = True`.\nFormat into a standardized telemetry string:\n`ID:USER_981 | Rating:4.8 | Premium:True` (note: format rating to 1 decimal place using `round(rating, 1)`).',
      starterCode: `user_id = "USER_981"\nrating = 4.85\nis_premium = True\n\nformatted_rating = round(rating, 1)\nprint(f"ID:{user_id} | Rating:{formatted_rating} | Premium:{is_premium}")\n`,
      testCases: [
        {
          inputDescription: 'Verify serialized telemetry payload',
          callExpression: 'print(f"ID:{user_id} | Rating:{round(rating, 1)} | Premium:{is_premium}")',
          expectedOutput: 'ID:USER_981 | Rating:4.8 | Premium:True',
        },
      ],
      hint: 'Use round(rating, 1) and combine into an f-string with pipes.',
      solution: `user_id = "USER_981"\nrating = 4.85\nis_premium = True\nprint(f"ID:{user_id} | Rating:{round(rating, 1)} | Premium:{is_premium}")`,
    },
  },

  // Chapter 3: Numbers & Mathematical Operations
  3: {
    Easy: {
      id: 'ch-03-easy',
      title: 'Level 1 (Easy): Time Unit Converter',
      difficulty: 'Easy',
      prompt: 'Given `total_seconds = 3754`, calculate hours, minutes, and seconds using floor division `//` and modulo `%`.\nPrint: `3754 seconds is 1h 2m 34s`',
      starterCode: `total_seconds = 3754\nhours = total_seconds // 3600\nrem = total_seconds % 3600\nminutes = rem // 60\nseconds = rem % 60\nprint(f"{total_seconds} seconds is {hours}h {minutes}m {seconds}s")\n`,
      testCases: [
        {
          inputDescription: 'Check conversion calculation',
          callExpression: 'print(f"{total_seconds} seconds is {hours}h {minutes}m {seconds}s")',
          expectedOutput: '3754 seconds is 1h 2m 34s',
        },
      ],
      hint: 'Use hours = total_seconds // 3600, rem = total_seconds % 3600.',
      solution: `total_seconds = 3754\nhours = total_seconds // 3600\nrem = total_seconds % 3600\nminutes = rem // 60\nseconds = rem % 60\nprint(f"{total_seconds} seconds is {hours}h {minutes}m {seconds}s")`,
    },
    Medium: {
      id: 'ch-03-med',
      title: 'Level 2 (Medium): Compound Interest Calculator',
      difficulty: 'Medium',
      prompt: 'Calculate compound interest on `principal = 1000` with `rate = 0.05` for `years = 3` using formula: `amount = principal * ((1 + rate) ** years)`.\nRound to 2 decimal places with `round(amount, 2)`.\nPrint: `Future value: $1157.63`',
      starterCode: `principal = 1000\nrate = 0.05\nyears = 3\namount = round(principal * ((1 + rate) ** years), 2)\nprint(f"Future value: \${amount}")\n`,
      testCases: [
        {
          inputDescription: 'Check compound interest calculation',
          callExpression: 'print(f"Future value: ${round(1000 * ((1 + 0.05) ** 3), 2)}")',
          expectedOutput: 'Future value: $1157.63',
        },
      ],
      hint: 'Use amount = round(principal * ((1 + rate) ** years), 2).',
      solution: `principal = 1000\nrate = 0.05\nyears = 3\namount = round(principal * ((1 + rate) ** years), 2)\nprint(f"Future value: \${amount}")`,
    },
    Hard: {
      id: 'ch-03-hard',
      title: 'Level 3 (Hard): 2D Vector Distance Calculation',
      difficulty: 'Hard',
      prompt: 'Given two points `(x1, y1) = (3, 4)` and `(x2, y2) = (7, 1)`:\nCalculate Euclidean distance using `((x2 - x1)**2 + (y2 - y1)**2) ** 0.5`.\nPrint: `Distance between points: 5.0`',
      starterCode: `x1, y1 = 3, 4\nx2, y2 = 7, 1\n\ndistance = ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5\nprint(f"Distance between points: {distance}")\n`,
      testCases: [
        {
          inputDescription: 'Verify 2D distance calculation',
          callExpression: 'print(f"Distance between points: {(((7-3)**2 + (1-4)**2)**0.5)}")',
          expectedOutput: 'Distance between points: 5.0',
        },
      ],
      hint: 'Square difference with **2 and square root with ** 0.5.',
      solution: `x1 = 3\ny1 = 4\nx2 = 7\ny2 = 1\ndistance = ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5\nprint(f"Distance between points: {distance}")`,
    },
  },

  // Chapter 4: Making Decisions: Conditionals & Logic
  4: {
    Easy: {
      id: 'ch-04-easy',
      title: 'Level 1 (Easy): Thermostat Threshold',
      difficulty: 'Easy',
      prompt: 'Write an `if-elif-else` block for `temp = 28`:\n- If `temp > 30`, print: `AC High`\n- Else if `temp >= 24`, print: `AC Moderate`\n- Else if `temp >= 18`, print: `Comfort Zone`\n- Else, print: `Heater On`',
      starterCode: `temp = 28\nif temp > 30:\n    print("AC High")\nelif temp >= 24:\n    print("AC Moderate")\nelif temp >= 18:\n    print("Comfort Zone")\nelse:\n    print("Heater On")\n`,
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
    Medium: {
      id: 'ch-04-med',
      title: 'Level 2 (Medium): Gatekeeper Admission Logic',
      difficulty: 'Medium',
      prompt: 'Check entry criteria with variables:\n`has_ticket = True`, `age = 17`, `is_vip = False`\nAdmission rule:\n- If `has_ticket` is True AND (`age >= 18` OR `is_vip` is True), print: `Access Granted`\n- Else, print: `Access Denied: Age or VIP required`',
      starterCode: `has_ticket = True\nage = 17\nis_vip = False\n\nif has_ticket and (age >= 18 or is_vip):\n    print("Access Granted")\nelse:\n    print("Access Denied: Age or VIP required")\n`,
      testCases: [
        {
          inputDescription: 'Test boundary criteria',
          callExpression: 'if has_ticket and (age >= 18 or is_vip):\n    print("Access Granted")\nelse:\n    print("Access Denied: Age or VIP required")',
          expectedOutput: 'Access Denied: Age or VIP required',
        },
      ],
      hint: 'Group (age >= 18 or is_vip) inside parentheses.',
      solution: `has_ticket = True\nage = 17\nis_vip = False\nif has_ticket and (age >= 18 or is_vip):\n    print("Access Granted")\nelse:\n    print("Access Denied: Age or VIP required")`,
    },
    Hard: {
      id: 'ch-04-hard',
      title: 'Level 3 (Hard): Leap Year Multi-Tier Algorithm',
      difficulty: 'Hard',
      prompt: 'Determine whether `year = 2024` is a leap year:\nRule: Divisible by 4, EXCEPT if divisible by 100, UNLESS also divisible by 400.\nPrint: `2024 is a Leap Year: True`',
      starterCode: `year = 2024\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint(f"{year} is a Leap Year: {is_leap}")\n`,
      testCases: [
        {
          inputDescription: 'Evaluate leap year algorithm',
          callExpression: 'print(f"{year} is a Leap Year: {(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)}")',
          expectedOutput: '2024 is a Leap Year: True',
        },
      ],
      hint: 'Use (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0).',
      solution: `year = 2024\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint(f"{year} is a Leap Year: {is_leap}")`,
    },
  },

  // Chapter 5: Loops & Iteration
  5: {
    Easy: {
      id: 'ch-05-easy',
      title: 'Level 1 (Easy): Sum of Multiples',
      difficulty: 'Easy',
      prompt: 'Write a loop that calculates the sum of all numbers from 1 to 20 divisible by 3.\nStore in `total_sum` and print: `Total sum: 63`',
      starterCode: `total_sum = 0\nfor n in range(1, 21):\n    if n % 3 == 0:\n        total_sum += n\nprint(f"Total sum: {total_sum}")\n`,
      testCases: [
        {
          inputDescription: 'Sum of multiples of 3 up to 20',
          callExpression: 'print(f"Total sum: {total_sum}")',
          expectedOutput: 'Total sum: 63',
        },
      ],
      hint: 'Check n % 3 == 0 inside for n in range(1, 21).',
      solution: `total_sum = 0\nfor n in range(1, 21):\n    if n % 3 == 0:\n        total_sum += n\nprint(f"Total sum: {total_sum}")`,
    },
    Medium: {
      id: 'ch-05-med',
      title: 'Level 2 (Medium): FizzBuzz Generator',
      difficulty: 'Medium',
      prompt: 'Loop through numbers 1 to 15. For each number:\n- If divisible by 3 and 5, print `FizzBuzz`\n- If divisible by 3, print `Fizz`\n- If divisible by 5, print `Buzz`\n- Else print the number.',
      starterCode: `for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n`,
      testCases: [
        {
          inputDescription: 'Check FizzBuzz sequence output from 1 to 15',
          callExpression: 'for i in range(1, 16):\n    if i % 15 == 0: print("FizzBuzz")\n    elif i % 3 == 0: print("Fizz")\n    elif i % 5 == 0: print("Buzz")\n    else: print(i)',
          expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
        },
      ],
      hint: 'Always test i % 15 == 0 before testing 3 or 5 individually.',
      solution: `for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)`,
    },
    Hard: {
      id: 'ch-05-hard',
      title: 'Level 3 (Hard): Prime Number Search',
      difficulty: 'Hard',
      prompt: 'Find all prime numbers between 2 and 20. Store them in a list `primes`.\nPrint: `Primes found: [2, 3, 5, 7, 11, 13, 17, 19]`',
      starterCode: `primes = []\nfor num in range(2, 21):\n    is_prime = True\n    for divisor in range(2, num):\n        if num % divisor == 0:\n            is_prime = False\n            break\n    if is_prime:\n        primes.append(num)\nprint(f"Primes found: {primes}")\n`,
      testCases: [
        {
          inputDescription: 'Verify prime numbers list up to 20',
          callExpression: 'print(f"Primes found: {primes}")',
          expectedOutput: 'Primes found: [2, 3, 5, 7, 11, 13, 17, 19]',
        },
      ],
      hint: 'Use a nested loop and break as soon as num % divisor == 0.',
      solution: `primes = []\nfor num in range(2, 21):\n    is_prime = True\n    for divisor in range(2, num):\n        if num % divisor == 0:\n            is_prime = False\n            break\n    if is_prime:\n        primes.append(num)\nprint(f"Primes found: {primes}")`,
    },
  },

  // Chapter 6: Ordered Collections: Lists & Tuples
  6: {
    Easy: {
      id: 'ch-06-easy',
      title: 'Level 1 (Easy): Positive Number Filter',
      difficulty: 'Easy',
      prompt: 'Given `raw_data = [12, -4, 25, 0, -8, 19, 30]`, create an empty list `positive_numbers`, append items > 0, and print: `Filtered: [12, 25, 19, 30]`',
      starterCode: `raw_data = [12, -4, 25, 0, -8, 19, 30]\npositive_numbers = []\nfor item in raw_data:\n    if item > 0:\n        positive_numbers.append(item)\nprint(f"Filtered: {positive_numbers}")\n`,
      testCases: [
        {
          inputDescription: 'Filter positive numbers',
          callExpression: 'print(f"Filtered: {positive_numbers}")',
          expectedOutput: 'Filtered: [12, 25, 19, 30]',
        },
      ],
      hint: 'Append when item > 0.',
      solution: `raw_data = [12, -4, 25, 0, -8, 19, 30]\npositive_numbers = []\nfor item in raw_data:\n    if item > 0:\n        positive_numbers.append(item)\nprint(f"Filtered: {positive_numbers}")`,
    },
    Medium: {
      id: 'ch-06-med',
      title: 'Level 2 (Medium): Deduplicate Preserving Order',
      difficulty: 'Medium',
      prompt: 'Given `items = ["a", "b", "a", "c", "b", "d"]`:\nBuild a list `unique_ordered` containing only unique items while preserving their first occurrence order.\nPrint: `Deduplicated: [\'a\', \'b\', \'c\', \'d\']`',
      starterCode: `items = ["a", "b", "a", "c", "b", "d"]\nunique_ordered = []\nfor x in items:\n    if x not in unique_ordered:\n        unique_ordered.append(x)\nprint(f"Deduplicated: {unique_ordered}")\n`,
      testCases: [
        {
          inputDescription: 'Deduplicate while preserving sequence order',
          callExpression: 'print(f"Deduplicated: {unique_ordered}")',
          expectedOutput: "Deduplicated: ['a', 'b', 'c', 'd']",
        },
      ],
      hint: 'Check if x not in unique_ordered before appending.',
      solution: `items = ["a", "b", "a", "c", "b", "d"]\nunique_ordered = []\nfor x in items:\n    if x not in unique_ordered:\n        unique_ordered.append(x)\nprint(f"Deduplicated: {unique_ordered}")`,
    },
    Hard: {
      id: 'ch-06-hard',
      title: 'Level 3 (Hard): Running Cumulative Sum',
      difficulty: 'Hard',
      prompt: 'Given numbers `[1, 2, 3, 4, 5]`, compute the running cumulative sum list where index `i` is the sum of elements up to `i`.\nPrint: `Running totals: [1, 3, 6, 10, 15]`',
      starterCode: `nums = [1, 2, 3, 4, 5]\nrunning_totals = []\nacc = 0\nfor n in nums:\n    acc += n\n    running_totals.append(acc)\nprint(f"Running totals: {running_totals}")\n`,
      testCases: [
        {
          inputDescription: 'Compute prefix cumulative sums',
          callExpression: 'print(f"Running totals: {running_totals}")',
          expectedOutput: 'Running totals: [1, 3, 6, 10, 15]',
        },
      ],
      hint: 'Maintain an accumulator variable acc += n and append to running_totals.',
      solution: `nums = [1, 2, 3, 4, 5]\nrunning_totals = []\nacc = 0\nfor n in nums:\n    acc += n\n    running_totals.append(acc)\nprint(f"Running totals: {running_totals}")`,
    },
  },

  // Chapter 7: Key-Value Mapping: Dictionaries & Sets
  7: {
    Easy: {
      id: 'ch-07-easy',
      title: 'Level 1 (Easy): Cart Cost Calculation',
      difficulty: 'Easy',
      prompt: 'Given prices and cart dictionaries, compute total cost and print: `Total cart cost: 70`',
      starterCode: `prices = {"potion": 15, "elixir": 40, "antidote": 25}\ncart = {"potion": 2, "elixir": 1}\ntotal_cost = 0\nfor item, qty in cart.items():\n    total_cost += prices[item] * qty\nprint(f"Total cart cost: {total_cost}")\n`,
      testCases: [
        {
          inputDescription: 'Calculate cart cost',
          callExpression: 'print(f"Total cart cost: {total_cost}")',
          expectedOutput: 'Total cart cost: 70',
        },
      ],
      hint: 'Multiply prices[item] * qty for each item in cart.',
      solution: `prices = {"potion": 15, "elixir": 40, "antidote": 25}\ncart = {"potion": 2, "elixir": 1}\ntotal_cost = 0\nfor item, qty in cart.items():\n    total_cost += prices[item] * qty\nprint(f"Total cart cost: {total_cost}")`,
    },
    Medium: {
      id: 'ch-07-med',
      title: 'Level 2 (Medium): Word Frequency Counter',
      difficulty: 'Medium',
      prompt: 'Count the frequency of each fruit in list:\n`basket = ["apple", "banana", "apple", "cherry", "banana", "apple"]`\nStore in dictionary `counts` and print: `Frequencies: {\'apple\': 3, \'banana\': 2, \'cherry\': 1}`',
      starterCode: `basket = ["apple", "banana", "apple", "cherry", "banana", "apple"]\ncounts = {}\nfor fruit in basket:\n    counts[fruit] = counts.get(fruit, 0) + 1\nprint(f"Frequencies: {counts}")\n`,
      testCases: [
        {
          inputDescription: 'Inspect dictionary frequencies',
          callExpression: 'print(f"Frequencies: {counts}")',
          expectedOutput: "Frequencies: {'apple': 3, 'banana': 2, 'cherry': 1}",
        },
      ],
      hint: 'Use counts[fruit] = counts.get(fruit, 0) + 1.',
      solution: `basket = ["apple", "banana", "apple", "cherry", "banana", "apple"]\ncounts = {}\nfor fruit in basket:\n    counts[fruit] = counts.get(fruit, 0) + 1\nprint(f"Frequencies: {counts}")`,
    },
    Hard: {
      id: 'ch-07-hard',
      title: 'Level 3 (Hard): Invert Dictionary Mapping',
      difficulty: 'Hard',
      prompt: 'Given `lookup = {"US": 1, "UK": 44, "JP": 81}`:\nInvert it into `inverted` where country code numbers map back to country string keys.\nPrint: `Inverted: {1: \'US\', 44: \'UK\', 81: \'JP\'}`',
      starterCode: `lookup = {"US": 1, "UK": 44, "JP": 81}\ninverted = {}\nfor k, v in lookup.items():\n    inverted[v] = k\nprint(f"Inverted: {inverted}")\n`,
      testCases: [
        {
          inputDescription: 'Invert key-value dictionary mapping',
          callExpression: 'print(f"Inverted: {inverted}")',
          expectedOutput: "Inverted: {1: 'US', 44: 'UK', 81: 'JP'}",
        },
      ],
      hint: 'Assign inverted[v] = k for each k, v in lookup.items().',
      solution: `lookup = {"US": 1, "UK": 44, "JP": 81}\ninverted = {}\nfor k, v in lookup.items():\n    inverted[v] = k\nprint(f"Inverted: {inverted}")`,
    },
  },

  // Chapter 8: Functions & Scope
  8: {
    Easy: {
      id: 'ch-08-easy',
      title: 'Level 1 (Easy): Temperature Function',
      difficulty: 'Easy',
      prompt: 'Write a function `celsius_to_fahrenheit(c)` returning `(c * 9/5) + 32`.\nCall with 25 and print: `25C is 77.0F`',
      starterCode: `def celsius_to_fahrenheit(c):\n    return (c * 9/5) + 32\n\ntemp_c = 25\ntemp_f = celsius_to_fahrenheit(temp_c)\nprint(f"{temp_c}C is {temp_f}F")\n`,
      testCases: [
        {
          inputDescription: 'Convert 25C to Fahrenheit',
          callExpression: 'print(f"{temp_c}C is {temp_f}F")',
          expectedOutput: '25C is 77.0F',
        },
      ],
      hint: 'return (c * 9/5) + 32',
      solution: `def celsius_to_fahrenheit(c):\n    return (c * 9/5) + 32\ntemp_c = 25\ntemp_f = celsius_to_fahrenheit(temp_c)\nprint(f"{temp_c}C is {temp_f}F")`,
    },
    Medium: {
      id: 'ch-08-med',
      title: 'Level 2 (Medium): Palindrome Checker Function',
      difficulty: 'Medium',
      prompt: 'Write a function `is_palindrome(text)` that returns `True` if `text.lower()` reads the same forwards and backwards, else `False`.\nTest with `"Radar"` and print: `Radar is palindrome: True`',
      starterCode: `def is_palindrome(text):\n    clean = text.lower()\n    return clean == clean[::-1]\n\nword = "Radar"\nprint(f"{word} is palindrome: {is_palindrome(word)}")\n`,
      testCases: [
        {
          inputDescription: 'Verify palindrome check function',
          callExpression: 'print(f"{word} is palindrome: {is_palindrome(word)}")',
          expectedOutput: 'Radar is palindrome: True',
        },
      ],
      hint: 'Use clean == clean[::-1] on lowercase string.',
      solution: `def is_palindrome(text):\n    clean = text.lower()\n    return clean == clean[::-1]\nword = "Radar"\nprint(f"{word} is palindrome: {is_palindrome(word)}")`,
    },
    Hard: {
      id: 'ch-08-hard',
      title: 'Level 3 (Hard): Fibonacci Number Generator',
      difficulty: 'Hard',
      prompt: 'Write a function `fibonacci(n)` that returns the n-th Fibonacci number (where `fib(0)=0`, `fib(1)=1`, `fib(2)=1`, `fib(3)=2`, `fib(4)=3`, `fib(5)=5`, `fib(6)=8`).\nCall `fibonacci(7)` and print: `Fibonacci 7 is 13`',
      starterCode: `def fibonacci(n):\n    if n <= 0: return 0\n    if n == 1: return 1\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\nval = fibonacci(7)\nprint(f"Fibonacci 7 is {val}")\n`,
      testCases: [
        {
          inputDescription: 'Compute 7th Fibonacci number',
          callExpression: 'print(f"Fibonacci 7 is {fibonacci(7)}")',
          expectedOutput: 'Fibonacci 7 is 13',
        },
      ],
      hint: 'Use an iterative loop updating a, b = b, a + b.',
      solution: `def fibonacci(n):\n    if n <= 0: return 0\n    if n == 1: return 1\n    a = 0\n    b = 1\n    for _ in range(2, n + 1):\n        temp = a + b\n        a = b\n        b = temp\n    return b\nval = fibonacci(7)\nprint(f"Fibonacci 7 is {val}")`,
    },
  },

  // Chapter 9: Errors & Exceptions
  9: {
    Easy: {
      id: 'ch-09-easy',
      title: 'Level 1 (Easy): Safe Number Parser',
      difficulty: 'Easy',
      prompt: 'Write `parse_age(age_str)` catching `ValueError` and returning `-1`. Print: `Result: -1`',
      starterCode: `def parse_age(age_str):\n    try:\n        return int(age_str)\n    except ValueError:\n        return -1\n\ntest_result = parse_age("not_a_number")\nprint(f"Result: {test_result}")\n`,
      testCases: [
        {
          inputDescription: 'Catch ValueError on int conversion',
          callExpression: 'print(f"Result: {test_result}")',
          expectedOutput: 'Result: -1',
        },
      ],
      hint: 'Wrap int(age_str) in try/except ValueError.',
      solution: `def parse_age(age_str):\n    try:\n        return int(age_str)\n    except ValueError:\n        return -1\ntest_result = parse_age("not_a_number")\nprint(f"Result: {test_result}")`,
    },
    Medium: {
      id: 'ch-09-med',
      title: 'Level 2 (Medium): Dual-Exception Safe Calculator',
      difficulty: 'Medium',
      prompt: 'Write `safe_divide(a, b)`:\n- Catch `ZeroDivisionError`: return `"Division by zero error"`\n- Catch `TypeError`: return `"Invalid operand type"`\n- Else return `a / b`.\nCall `safe_divide(10, 0)` and print: `Output: Division by zero error`',
      starterCode: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Division by zero error"\n    except TypeError:\n        return "Invalid operand type"\n\nres = safe_divide(10, 0)\nprint(f"Output: {res}")\n`,
      testCases: [
        {
          inputDescription: 'Catch zero division error cleanly',
          callExpression: 'print(f"Output: {safe_divide(10, 0)}")',
          expectedOutput: 'Output: Division by zero error',
        },
      ],
      hint: 'Catch ZeroDivisionError and TypeError separately.',
      solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Division by zero error"\n    except TypeError:\n        return "Invalid operand type"\nres = safe_divide(10, 0)\nprint(f"Output: {res}")`,
    },
    Hard: {
      id: 'ch-09-hard',
      title: 'Level 3 (Hard): Defensive Dictionary Parser',
      difficulty: 'Hard',
      prompt: 'Write `get_user_score(data, user_id)`:\n- If user_id missing: catch `KeyError` and return `"User not registered"`\n- If score is non-numeric: catch `ValueError` or `TypeError` and return `"Corrupted score record"`\n- Else return integer score.\nTest with `{"alice": "invalid_score"}` for `"alice"` and print: `Status: Corrupted score record`',
      starterCode: `def get_user_score(data, user_id):\n    try:\n        val = data[user_id]\n        return int(val)\n    except KeyError:\n        return "User not registered"\n    except (ValueError, TypeError):\n        return "Corrupted score record"\n\nres = get_user_score({"alice": "invalid_score"}, "alice")\nprint(f"Status: {res}")\n`,
      testCases: [
        {
          inputDescription: 'Defensively handle malformed dictionary entries',
          callExpression: 'print(f"Status: {get_user_score({\'alice\': \'invalid_score\'}, \'alice\')}")',
          expectedOutput: 'Status: Corrupted score record',
        },
      ],
      hint: 'Catch KeyError first, then catch (ValueError, TypeError).',
      solution: `def get_user_score(data, user_id):\n    try:\n        val = data[user_id]\n        return int(val)\n    except KeyError:\n        return "User not registered"\n    except (ValueError, TypeError):\n        return "Corrupted score record"\nres = get_user_score({"alice": "invalid_score"}, "alice")\nprint(f"Status: {res}")`,
    },
  },

  // Chapter 10: OOP & Capstone
  10: {
    Easy: {
      id: 'ch-10-easy',
      title: 'Level 1 (Easy): BankAccount Class',
      difficulty: 'Easy',
      prompt: 'Create `BankAccount(owner, balance)` with `deposit(amount)` and `get_balance()`. Create for `"Ada"`, 100, deposit 50, and print: `Owner Ada has $150`',
      starterCode: `class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def get_balance(self):\n        return self.balance\n\naccount = BankAccount("Ada", 100)\naccount.deposit(50)\nprint(f"Owner {account.owner} has \${account.get_balance()}")\n`,
      testCases: [
        {
          inputDescription: 'Create BankAccount and deposit 50',
          callExpression: 'print(f"Owner {account.owner} has ${account.get_balance()}")',
          expectedOutput: 'Owner Ada has $150',
        },
      ],
      hint: 'Define deposit(self, amount): self.balance += amount.',
      solution: `class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n    def get_balance(self): return self.balance\naccount = BankAccount("Ada", 100)\naccount.deposit(50)\nprint(f"Owner {account.owner} has \${account.get_balance()}")`,
    },
    Medium: {
      id: 'ch-10-med',
      title: 'Level 2 (Medium): BankAccount with Overdraft Protection',
      difficulty: 'Medium',
      prompt: 'Extend `BankAccount` with `withdraw(self, amount)`:\n- If `amount <= self.balance`: subtract amount and return `True`\n- Else: do NOT deduct balance and return `False`.\nWithdraw `200` from Ada\'s account ($100 balance) and print: `Success: False, Balance: 100`',
      starterCode: `class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            return True\n        return False\n\nacct = BankAccount("Ada", 100)\nsuccess = acct.withdraw(200)\nprint(f"Success: {success}, Balance: {acct.balance}")\n`,
      testCases: [
        {
          inputDescription: 'Refuse overdraft withdrawal cleanly',
          callExpression: 'print(f"Success: {success}, Balance: {acct.balance}")',
          expectedOutput: 'Success: False, Balance: 100',
        },
      ],
      hint: 'Check if amount <= self.balance before deducting.',
      solution: `class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            return True\n        return False\nacct = BankAccount("Ada", 100)\nsuccess = acct.withdraw(200)\nprint(f"Success: {success}, Balance: {acct.balance}")`,
    },
    Hard: {
      id: 'ch-10-hard',
      title: 'Level 3 (Hard): RPG Character Inventory Manager',
      difficulty: 'Hard',
      prompt: 'Create `Hero` class with:\n- `__init__(self, name)`: `self.name = name`, `self.bag = []`\n- `loot(self, item)`: appends item to bag\n- `has_item(self, item)`: returns `True` if item in bag else `False`\nCreate hero `"Kira"`, loot `"Key"`, and print: `Kira has Key: True`',
      starterCode: `class Hero:\n    def __init__(self, name):\n        self.name = name\n        self.bag = []\n\n    def loot(self, item):\n        self.bag.append(item)\n\n    def has_item(self, item):\n        return item in self.bag\n\nhero = Hero("Kira")\nhero.loot("Key")\nprint(f"{hero.name} has Key: {hero.has_item('Key')}")\n`,
      testCases: [
        {
          inputDescription: 'Manage OOP character inventory and item queries',
          callExpression: 'print(f"{hero.name} has Key: {hero.has_item(\'Key\')}")',
          expectedOutput: 'Kira has Key: True',
        },
      ],
      hint: 'Check return item in self.bag.',
      solution: `class Hero:\n    def __init__(self, name):\n        self.name = name\n        self.bag = []\n    def loot(self, item):\n        self.bag.append(item)\n    def has_item(self, item):\n        return item in self.bag\nhero = Hero("Kira")\nhero.loot("Key")\nprint(f"{hero.name} has Key: {hero.has_item('Key')}")`,
    },
  },
};

export function getChallengeForDifficulty(
  chapterId: number,
  difficulty: DifficultyLevel,
  fallbackChallenge: Challenge
): Challenge {
  const chapterTiers = DIFFICULTY_CHALLENGES[chapterId];
  if (chapterTiers && chapterTiers[difficulty]) {
    return chapterTiers[difficulty];
  }
  return fallbackChallenge;
}
