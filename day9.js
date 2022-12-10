'use strict';
import fs from 'fs';

// turn data into array of arrays where each array is a direction and distance
const data = fs.readFileSync("./data/input9.txt").toString('utf-8').trim().split("\n");

for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split(" ");
  data[i][1] = parseInt(data[i][1]);
}

let visited = ["0/0"];
let rope = [];
for (let i = 0; i < 10; i++) rope.push([0, 0]);

function moveTail(head, tail) {
  let diffX = Math.abs(head[0] - tail[0]);
  let diffY = Math.abs(head[1] - tail[1]);

  if (diffX < 2 && diffY < 2) {
    return;
  }

  // if the h and t have the same x but different y by more than 1, or vice versa
  // only move on the axis that is different, otherwise move both
  // if head.axis - tail.axis > 0, head is on the right or above of tail
  // otherwise head is on the left or below
  if (diffX > 1 && !diffY) {
    tail[0] += head[0] - tail[0] > 0 ? 1 : -1;
  } else if (diffY > 1 && !diffX) {
    tail[1] += head[1] - tail[1] > 0 ? 1 : -1;
  } else {
    tail[0] += head[0] - tail[0] > 0 ? 1 : -1;
    tail[1] += head[1] - tail[1] > 0 ? 1 : -1;
  }
}


for (let i = 0; i < data.length; i++) {
  if (data[i][0] === "U") {
    for (let j = 0; j < data[i][1]; j++) {
      rope[0][1]++;
      
      for (let k = 0; k < rope.length - 1; k++) {
        moveTail(rope[k], rope[k + 1]);
        if (k === 8) {
          visited.push(`${rope[9][0]}/${rope[9][1]}`);
        } 
      }
    }
    continue;
  } else if (data[i][0] === "D") {
    for (let j = 0; j < data[i][1]; j++) {
      rope[0][1]--;

      for (let k = 0; k < rope.length - 1; k++) {
        moveTail(rope[k], rope[k + 1]);
        if (k === 8) {
          visited.push(`${rope[9][0]}/${rope[9][1]}`);
        }
      } 
    }
    continue;
  } else if (data[i][0] === "R") {
    for (let j = 0; j < data[i][1]; j++) {
      rope[0][0]++;

      for (let k = 0; k < rope.length - 1; k++) {
        moveTail(rope[k], rope[k + 1]);
        if (k === 8) {
          visited.push(`${rope[9][0]}/${rope[9][1]}`);
        }
      }
    }
    continue;
  } else if (data[i][0] === "L") {
    for (let j = 0; j < data[i][1]; j++) {
      rope[0][0]--;

      for (let k = 0; k < rope.length - 1; k++) {
        moveTail(rope[k], rope[k + 1]);
        if (k === 8) {
          visited.push(`${rope[9][0]}/${rope[9][1]}`);
        }
      } 
    }
    continue;
  }
}

// from the list of visited coordinates, remove duplicates
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

let unique = visited.filter(onlyUnique);
// answer is the number of unique coordinates in the visited coordinates list
console.log(unique.length);