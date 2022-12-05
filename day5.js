'use strict';
import fs from 'fs';

const data = fs.readFileSync("./data/input5.txt").toString('utf-8').trim().split("\n");
let piles = [[], [], [], [], [], [], [], [], []];

// The first nine lines of the data contain a table of "containers" in vertical "piles"
// Parse through the table line by line and turn the piles into arrays

for (let i = 0; i < 8; i++) {
  let counter = 0;
  for (let j = 1; j < data[i].length; j += 4) {
    if (data[i][j] != ' ') {
      piles[counter].push(data[i][j]);
    }
    counter++;
  }
}

// part 1
function moveAndRearrange(count, from, to) {
  from -= 1;
  to -= 1;
  let items = piles[from].splice(0, count)
  items.forEach(item => piles[to].unshift(item));
}

// part 2
function moveDontRearrange(count, from, to) {
  from -= 1;
  to -= 1;
  let items = piles[from].splice(0, count)
  piles[to] = items.concat(piles[to]);
}

for (let i = 10; i < data.length; i++) {
  // parse input from line 11 onwards to int arrays before calling the moving function
  data[i] = data[i].replace("move ", "").replace("from ", ""). replace("to ", "").split(" ").map(Number);
  moveAndRearrange(data[i][0], data[i][1], data[i][2]);
}

// result is the top (/first) container in each pile
console.log("Result: " + piles[0][0] + piles[1][0] + piles[2][0] + piles[3][0] + piles[4][0] + piles[5][0] + piles[6][0] + piles[7][0] + piles[8][0]);