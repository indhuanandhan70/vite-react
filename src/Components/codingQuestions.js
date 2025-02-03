const codingQuestions = [
  // Existing Questions
  {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Write a function that takes two integers and returns their sum.",
    exampleInput: [3, 5],
    exampleOutput: 8,
    functionSignature: "function sum(a, b) { // Your code here }",
    solution: (a, b) => a + b,
  },
  {
    id: 2,
    title: "Check Prime Number",
    description: "Write a function that checks if a number is prime.",
    exampleInput: [7],
    exampleOutput: true,
    functionSignature: "function isPrime(num) { // Your code here }",
    solution: (num) => {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    },
  },
  {
    id: 3,
    title: "Find Maximum in Array",
    description: "Write a function that returns the maximum number in an array.",
    exampleInput: [[1, 5, 3, 9, 2]],
    exampleOutput: 9,
    functionSignature: "function findMax(arr) { // Your code here }",
    solution: (arr) => Math.max(...arr),
  },
  {
    id: 4,
    title: "Reverse a String",
    description: "Write a function to reverse a given string.",
    exampleInput: ['hello'],
    exampleOutput: 'olleh',
    functionSignature: "function reverseString(str) { // Your code here }",
    solution: (str) => str.split("").reverse().join(""),
  },
  {
    id: 5,
    title: "Generate Fibonacci Sequence",
    description: "Write a function to generate the first n Fibonacci numbers.",
    exampleInput: [5],
    exampleOutput: [0, 1, 1, 2, 3],
    functionSignature: "function generateFibonacci(n) { // Your code here }",
    solution: (n) => {
      const fib = [0, 1];
      for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
      }
      return fib.slice(0, n);
    },
  },

  // Additional Questions

  {
    id: 7,
    title: "Check Palindrome String",
    description: "Write a function that checks if a string is a palindrome.",
    exampleInput: ['madam'],
    exampleOutput: true,
    functionSignature: "function isPalindrome(str) { // Your code here }",
    solution: (str) => str === str.split("").reverse().join(""),
  },
  {
    id: 8,
    title: "Merge Two Sorted Arrays",
    description: "Write a function that merges two sorted arrays into one sorted array.",
    exampleInput: [[1, 3, 5], [2, 4, 6]],
    exampleOutput: [1, 2, 3, 4, 5, 6],
    functionSignature: "function mergeArrays(arr1, arr2) { // Your code here }",
    solution: (arr1, arr2) => {
      let i = 0, j = 0, merged = [];
      while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) merged.push(arr1[i++]);
        else merged.push(arr2[j++]);
      }
      return [...merged, ...arr1.slice(i), ...arr2.slice(j)];
    },
  },
  {
    id: 9,
    title: "Count Occurrences of a Character in String",
    description: "Write a function that counts the number of times a character appears in a string.",
    exampleInput: ['hello', 'l'],
    exampleOutput: 2,
    functionSignature: "function countChar(str, char) { // Your code here }",
    solution: (str, char) => str.split(char).length - 1,
  },
  {
    id: 10,
    title: "Find GCD of Two Numbers",
    description: "Write a function to find the greatest common divisor (GCD) of two numbers.",
    exampleInput: [12, 15],
    exampleOutput: 3,
    functionSignature: "function findGCD(a, b) { // Your code here }",
    solution: (a, b) => {
      while (b) {
        [a, b] = [b, a % b];
      }
      return a;
    },
  },
  {
    id: 11,
    title: "Sort Array of Strings by Length",
    description: "Write a function that sorts an array of strings by their length.",
    exampleInput: [['apple', 'banana', 'cherry', 'kiwi']],
    exampleOutput: ['kiwi', 'apple', 'cherry', 'banana'],
    functionSignature: "function sortByLength(arr) { // Your code here }",
    solution: (arr) => arr.sort((a, b) => a.length - b.length),
  },
  {
    id: 12,
    title: "Find the Missing Number in an Array",
    description: "Write a function that finds the missing number in an array of numbers from 1 to n.",
    exampleInput: [[1, 2, 3, 5]],
    exampleOutput: 4,
    functionSignature: "function findMissingNumber(arr) { // Your code here }",
    solution: (arr) => {
      const n = arr.length + 1;
      const expectedSum = (n * (n + 1)) / 2;
      const actualSum = arr.reduce((acc, num) => acc + num, 0);
      return expectedSum - actualSum;
    },
  },
  {
    id: 13,
    title: "Sum of Digits in a Number",
    description: "Write a function that returns the sum of digits of a number.",
    exampleInput: [123],
    exampleOutput: 6,
    functionSignature: "function sumOfDigits(n) { // Your code here }",
    solution: (n) => n.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0),
  },
  {
    id: 14,
    title: "Flatten Nested Arrays",
    description: "Write a function that flattens a nested array.",
    exampleInput: [[1, [2, 3], [4, [5]]]],
    exampleOutput: [1, 2, 3, 4, 5],
    functionSignature: "function flattenArray(arr) { // Your code here }",
    solution: (arr) => arr.flat(Infinity),
  },
  {
    id: 15,
    title: "Find Anagrams in an Array of Strings",
    description: "Write a function that finds all anagrams in an array of strings.",
    exampleInput: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
    exampleOutput: [['eat', 'tea', 'ate'], ['tan', 'nat']],
    functionSignature: "function findAnagrams(arr) { // Your code here }",
    solution: (arr) => {
      const grouped = arr.reduce((acc, str) => {
        const sorted = str.split('').sort().join('');
        if (!acc[sorted]) acc[sorted] = [];
        acc[sorted].push(str);
        return acc;
      }, {});
      return Object.values(grouped);
    },
  },

  // More complex or advanced problems can be added below
];

export default codingQuestions;
