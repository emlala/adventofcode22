'use strict';
import fs from 'fs';

const data = fs.readFileSync("./data/input5.txt").toString('utf-8').trim().split("\n");
let layers = [];
let piles = [[], [], [], [], [], [], [], [], []];

// Parse the input, first to an array of lines (layers)
// then arrange the lines into piles

for (let i = 0; i < 8; i++) {
  layers.push([]);
  for (let j = 1; j < data[i].length; j += 4) {
    layers[i].push(data[i][j]);
  }
}

for (let i = 0; i < layers.length; i++) {
  for (let j = 0; j < layers[i].length; j++) {
    if (layers[i][j] != ' ') {
     piles[j].push(layers[i][j]);
    }
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
  // change input to int arrays before calling the moving function
  data[i] = data[i].replace("move ", "").replace("from ", ""). replace("to ", "").split(" ").map(Number);
  moveDontRearrange(data[i][0], data[i][1], data[i][2]);
}

console.log("Result 2: " + piles[0][0] + piles[1][0] + piles[2][0] + piles[3][0] + piles[4][0] + piles[5][0] + piles[6][0] + piles[7][0] + piles[8][0]);