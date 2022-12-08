'use strict';
import fs from 'fs';

// Part 1
// for every tree check if there are larger in any of the 4 directions of the matrix
// if search reaches a tree that is larger or same size, stop search in that direction

function treesVisibleFromOutside(data) {

  let visibleTrees = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {

      let right = data[i].slice(j + 1);
      let left = data[i].slice(0, j).reverse();
      let up = data.slice(0, i).map(x => x[j]).reverse();
      let down = data.slice(i + 1).map(x => x[j]);
      let directions = [left, up, right, down];

      // if tree is on the edge, it is visible
      if (i === 0 || i === data.length - 1 || j === 0 || j === data[i].length - 1) {
        visibleTrees++;
        continue;
      } else {
        let notVisible = 0;
        // check if there are larger trees in any of the directions
        directions.forEach(dir => {
          if (dir.length > 0) {
            for (let k = 0; k < dir.length; k++) {
              if (dir[k] >= data[i][j]) {
                notVisible++;
                break; // if there is a larger tree in the direction, stop the search
              }
            }
          }
        });
        if (notVisible < 4) { // if there is at least one direction without a larger tree, the tree is visible
          visibleTrees++;
        }
      }
    }
  }
  return visibleTrees;
}

// Part 2
// count how many visible trees there are in every direction
// a tree of same or larger size blocks the view from the rest


function findTreeCounts(data) {
  let treeCounts = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      
      let right = data[i].slice(j + 1);
      let left = data[i].slice(0, j).reverse();
      let up = data.slice(0, i).map(x => x[j]).reverse();
      let down = data.slice(i + 1).map(x => x[j]);
      let directions = [left, up, right, down];

      let treeCount = []

      directions.forEach(dir => {
        let count = 0; // counter for trees in each direction
        if (dir.length > 0) {
          for (let k = 0; k < dir.length; k++) {
            if (dir[k] >= data[i][j]) {
              count++;
              break; // if there is a larger or same size tree in the direction, stop the search
            } else {
              count++;
            }
          }
        }
        treeCount.push(count);
      });
      treeCounts.push(treeCount);
    }
  }
  return treeCounts;
}

// turn data into an int matrix
const data = fs.readFileSync("./data/input8.txt").toString('utf-8').trim().split("\n");
for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split("");
}

// part 1
console.log("Part 1: " + treesVisibleFromOutside(data)); 

// part 2
let treeCounts = findTreeCounts(data);

// "Scenic score" is all of the tree counts in each direction multiplied together
for (let i = 0; i < treeCounts.length; i++) {
  treeCounts[i] = treeCounts[i].reduce((a, b) => a * b);
}

// find the largest scenic score
let largest = 0;
for (let i = 0; i < treeCounts.length; i++) {
  if (treeCounts[i] > largest) {
    largest = treeCounts[i];
  }
}

console.log("Part 2: " + largest);

// not very proud of this one, but it works
