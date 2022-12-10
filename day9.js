'use strict';
import fs from 'fs';

// turn data into array of arrays where each array is a direction and distance
const data = fs.readFileSync("./data/input9.txt").toString('utf-8').trim().split("\n");
for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split(" ");
  data[i][1] = parseInt(data[i][1]);
}

let coorH = [0, 0];
let coorT = [0, 0];
let visited = ["0-0"];

// Part 1

function followTail(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == "U") {
      for (let j = 0; j < data[i][1]; j++) {
        coorH[1]++;
        if (coorH[1] > coorT[1] + 1) {
          if (coorH[0] != coorT[0]) {
            coorT[0] = coorH[0];
          }
          coorT[1]++;
          visited.push(coorT[0] + "-" + coorT[1]);
        } 
      }
      continue;
    } else if (data[i][0] == "D") {
      for (let j = 0; j < data[i][1]; j++) {
        coorH[1]--;
        if (coorH[1] < coorT[1] - 1) {
          if (coorH[0] != coorT[0]) {
            coorT[0] = coorH[0];
          }
          coorT[1]--;
          visited.push(coorT[0] + "-" + coorT[1]);
        } 
      }
      continue;
    } else if (data[i][0] == "R") {
      for (let j = 0; j < data[i][1]; j++) {
        coorH[0]++;
        if (coorH[0] > coorT[0] + 1) {
          if (coorH[1] != coorT[1]) {
            coorT[1] = coorH[1];
          }
          coorT[0]++;
          visited.push(coorT[0] + "-" + coorT[1]);
        } 
      }
      continue;
    } else if (data[i][0] == "L") {
      for (let j = 0; j < data[i][1]; j++) {
        coorH[0]--;

        if (coorH[0] < coorT[0] - 1) {
          if (coorH[1] != coorT[1]) {
            coorT[1] = coorH[1];
          }

          coorT[0]--;
          visited.push(coorT[0] + "-" + coorT[1]);
        } 
      }
      continue;
    }
  }
}

// from the list of visited coordinates, remove duplicates
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

followTail(data);

let unique = visited.filter(onlyUnique);

// answer is the number of unique coordinates in the visited coordinates list
console.log(unique.length);