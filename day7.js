'use strict';
import fs from 'fs';

const text = fs.readFileSync("./data/input7.txt").toString('utf-8').trim().split("\n");

// calculate the size of each directory, subdirectory sizes included
// return an object with the directory names as keys and the size as values
// keep track of the current directory path with an array, add the file size to all directories in the path

function calcSizes(text) {
  let dirs = {};
  let current = [];

  for (let i = 0; i < text.length; i++) {
    if (text[i].includes("$ cd") && !text[i].includes("..")) {
      let dir = text[i].slice(5);
      // some directories have the same name, so we add a number to the end
      if (dir in dirs) {
          dir += i;
      }
      current.push(dir);
      dirs[dir] = 0;
    } else if (text[i].includes("$ cd ..")) {
      current.pop();
    } else if (!isNaN(text[i][0])) {
      text[i] = text[i].split(" ");
      text[i][0] = parseInt(text[i][0]);
      current.forEach(dir => {dirs[dir] += text[i][0];});
    }
  }
  return dirs;
}

let dirs = calcSizes(text);

// part 1
// find the directories that have the size of 100,000 units at most
// calculate the total sum of the sizes of these directories

function smallDirTotal(dirs) {
  let sum = 0;
  Object.keys(dirs).forEach(dir => {
      if (dirs[dir] <= 100000) {
          sum += dirs[dir];
      }
  });
  return sum;
}

console.log("Part 1: " + smallDirTotal(dirs));

// part 2
// find the smallest directory that we can delete to have at least 30,000,000 units of free space
// total disk space is 70,000,000 units

function findFreeSpace(dirs) {
  let spaceNeeded = 30000000 - (70000000 - dirs['/']);
  let sorted = [];
  Object.keys(dirs).forEach(dir => {
    if (dirs[dir] >= spaceNeeded) {
      sorted.push(dirs[dir]);
    }
  });
  return sorted.sort((a, b) => a - b)[0];
}

console.log("Part 2: " + findFreeSpace(dirs));