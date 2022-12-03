'use strict';
import fs from 'fs';

const text = fs.readFileSync("./data/input3.txt").toString('utf-8').split("\n");

// part 1
// see if there's a matching letter in the first and second half of each string
let sum1 = 0;

function findMatch1(compartment1, compartment2) {
  for (let i = 0; i < compartment1.length; i++) {
    let letter = compartment1[i];
    if (compartment2.includes(letter)) {
      if (letter == letter.toUpperCase()) {
        sum1 += letter.charCodeAt(0) - 38; // A-Z values 27-52
      } else {
        sum1 += letter.charCodeAt(0) - 96; // a-z values 1-26
      }
      break;
    }
  }
}

for (let i = 0; i < text.length; i++) {
  let cLength = text[i].length / 2;
  let compartment1 = text[i].slice(0, cLength);
  let compartment2 = text[i].slice(cLength);
  findMatch1(compartment1, compartment2);
}

console.log(`Sum 1: ${sum1}`);

// part 2
// see if there's a matching letter in each of the three strings
let sum2 = 0;

function findMatch2(rucksack1, rucksack2, rucksack3) {
  for (let i = 0; i < rucksack1.length; i++) {
    let letter = rucksack1[i];
    if (rucksack2.includes(letter) && rucksack3.includes(letter)) {
      if (letter == letter.toUpperCase()) {
        sum2 += letter.charCodeAt(0) - 38; // A-Z values 27-52
      } else {
        sum2 += letter.charCodeAt(0) - 96; // a-z values 1-26
      }
      break;
    }
  }
}

let data = [];
for (let i = 0; i < text.length; i += 3) {
  const chunk = text.slice(i, i + 3);
  data.push(chunk);
}

for (let i = 0; i < data.length; i++) {
  findMatch2(data[i][0], data[i][1], data[i][2]);
}

console.log(`Sum 2: ${sum2}`);