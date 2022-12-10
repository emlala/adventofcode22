'use strict';
import fs from 'fs';

// turn data into array
const data = fs.readFileSync("./data/input10.txt").toString('utf-8').trim().split("\n");

// Part 1

let cycle1 = 0;
let x1 = 1;
let signalStrength = [];

function cycle() {
  cycle1++;
  if (cycle1 % 40 === 20) {
    signalStrength.push(cycle1 * x1);
  }
}

for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split(" ");
  data[i][1] = parseInt(data[i][1]);

  if (data[i][0] === "noop") {
    cycle();
  } else if (data[i][0] === "addx") {
    cycle();
    cycle();
    x1 += data[i][1];
  }
}

let sum = signalStrength.reduce((a, b) => a + b, 0);
console.log("Part 1: " + sum);

// Part 2
// "draw" the crt message, each cycle is one pixel in the 40*6 crt
// x marks the centre position of the 3-pixel sprite
// if the current pixel overlaps with the sprite, draw a #, otherwise draw a .

let cycle2 = 0;
let x2 = 1;
let crt = [[], [], [], [], [], []];
let crtRow = 0;
let sprite = [0, 1, 2];

function draw() {
  // switch row(/array) when cycle reaches 40 and start counting from 0 again
  if (cycle2 === 40) {
    crtRow++;
    cycle2 = 0;
  }

  if (sprite.includes(cycle2)) {
    crt[crtRow].push("#");
  } else {
    crt[crtRow].push(".");
  }
  cycle2++;
}

for (let i = 0; i < data.length; i++) {
  if (data[i][0] === "noop") {
    draw();
  } else if (data[i][0] === "addx") {
    draw();
    draw();
    x2 += data[i][1];
    sprite = [x2 - 1 , x2, x2 + 1]; // update sprite position according to the value of x
    
  }
}

// merge each row into strings so they can be printed neatly to see the message
let result = crt.map(row => row.join(""));
console.log("Part 2:");
console.log(result);