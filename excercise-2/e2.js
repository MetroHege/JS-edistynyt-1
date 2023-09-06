'use strict';

// Sample user data array
const userArray = [
  {name: 'Alice', age: 25},
  {name: 'Bob', age: false},
  {age: 30},
  {name: 'Eve', age: null},
];

// Function to process user data
const processUserData = user =>
  `Welcome, ${user.name ?? 'Guest'}! You are ${user.age || 18} years old.`;
// Test the processUserData function with different user data
for (const user of userArray) {
  const userData = `Welcome, ${user.name ?? 'Guest'}! You are ${
    user.age || 18
  } years old.`;

  console.log(processUserData(user));
}

// The correct output should be:
// Welcome, Alice! You are 25 years old.
// Welcome, Bob! You are 18 years old.
// Welcome, Guest! You are 30 years old.
// Welcome, Eve! You are 18 years old.
