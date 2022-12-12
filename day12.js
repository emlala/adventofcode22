'use strict';
import fs from 'fs';

const data = fs.readFileSync("./data/input12.txt").toString('utf-8').trim().split('\n');

// Part 1
// turn data into an int matrix of character codes for easier comparison
let rows = data.map(row => row.split('').map(character => character.charCodeAt(0)));

let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };

// save the start and end positions
// and replace them with a and z in the grid to make the comparison easier
for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
        if (rows[y][x] == 'S'.charCodeAt(0)) {
            start = { x, y };
            rows[y][x] = 'a'.charCodeAt(0);
        }
        if (rows[y][x] == 'E'.charCodeAt(0)) {
            end = { x, y };
            rows[y][x] = 'z'.charCodeAt(0);
        }
    }
}

let finalPath = [];
let queue = [];
let visited = [`${start.x},${start.y}`];

queue.push([start]);
while (queue.length > 0 && finalPath.length == 0) {
    let path = queue.shift();
    let position = path[path.length - 1];

    let directions = [
        { x: position.x + 1, y: position.y }, // right
        { x: position.x, y: position.y + 1 }, // down
        { x: position.x - 1, y: position.y }, // left
        { x: position.x, y: position.y - 1 } // up
    ];

    for (let direction of directions) {
      // check if the direction is valid: not visited, not outside the grid
      // and not more than 1 higher than the current position (you can only climb 1 step at a time)
        if (direction.x < 0 || direction.x >= rows[0].length ||
            direction.y < 0 || direction.y >= rows.length ||
            visited.includes(`${direction.x},${direction.y}`) ||
            rows[direction.y][direction.x] - rows[position.y][position.x] > 1) {
            continue;
        }

        // if the direction is the end, save the path and end the while-loop
        if (direction.x == end.x && direction.y == end.y) finalPath = path.concat([end]);
        visited.push(`${direction.x},${direction.y}`);
        queue.push(path.concat([direction]));
    }
}

// console.log(finalPath);
console.log(finalPath.length - 1);