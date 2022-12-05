'use strict';
import fs from 'fs';

const text = fs.readFileSync("./data/input2.txt").toString('utf-8');

const x = 1; // a
const y = 2; // b
const z = 3; // c
const lose = 0; // xb, yc, za
const draw = 3; // xa, yb, zc
const win = 6; // xc, ya, zb

let score1 = 0;
let score2 = 0;

// part 1
function getScoreOne(a, b) {
  if (a === "X") {
    score1 += x;
    if (b === "A") {
        score1 += draw;
    } else if (b === "B") {
        score1 += lose;
    } else if (b === "C") {
        score1 += win;
    }
  } else if (a === "Y") {
      score1 += y;
      if (b === "A") {
          score1 += win;
      } else if (b === "B") {
          score1 += draw;
      } else if (b === "C") {
          score1 += lose;
      }
  } else if (a === "Z") {
      score1 += z;
      if (b === "A") {
          score1 += lose;
      } else if (b === "B") {
          score1 += win;
      } else if (b === "C") {
          score1 += draw;
      }
  }
}

// part 2
function getScoreTwo(a, b) {
  if (a === "X") {
    score2 += lose;
    if (b === "A") {
        score2 += z;
    } else if (b === "B") {
        score2 += x;
    } else if (b === "C") {
        score2 += y;
    }
  } else if (a === "Y") {
      score2 += draw;
      if (b === "A") {
          score2 += x;
      } else if (b === "B") {
          score2 += y;
      } else if (b === "C") {
          score2 += z;
      }
  } else if (a === "Z") {
      score2 += win;
      if (b === "A") {
          score2 += y;
      } else if (b === "B") {
          score2 += z;
      } else if (b === "C") {
          score2 += x;
      }
  }
}
  
let data = text.split("\n");

for (let i = 0; i < data.length; i++) {
    data[i] = data[i].split(" ");
    getScoreOne(data[i][1], data[i][0]);
    getScoreTwo(data[i][1], data[i][0]);
}

console.log("Score 1: " + score1 + "\nScore 2: " + score2);

// again there's extra whitespace at the end of the file, this solution just ignores it 
// the functions process the whitespace, but as it doesn't match the conditions, it's ignored