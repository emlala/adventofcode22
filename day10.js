'use strict';
import fs from 'fs';

const data = fs.readFileSync("./data/input10.txt").toString('utf-8').trim().split("\n");

let cycle = 0;
let x = 1;
let signalStrength = [];
let pixel = 0;
let crt = [[], [], [], [], [], []];
let crtRow = 0;
let sprite = [x - 1 , x, x + 1];

// Part 1
// at cycles 20, 60, 100, 140, 180 and 220, calculate signal strength
// signal strength = cycle * x
function CalSigStr() {
  cycle++;
  if (cycle % 40 === 20) {
    signalStrength.push(cycle * x);
  }
}

// Part 2
// "draw" the crt message, each cycle is one pixel in the 40*6 crt
// x marks the centre position of the 3-pixel sprite
// if the current pixel overlaps with the sprite, draw a #, otherwise draw a .
function draw() {
  // switch row(/array) when cycle reaches 40 and start counting from 0 again
  if (pixel === 40) {
    crtRow++;
    pixel = 0;
  }

  if (sprite.includes(pixel)) {
    crt[crtRow].push("#");
  } else {
    crt[crtRow].push(".");
  }
  pixel++;
}

// loop through data and execute the commands for both part 1 and 2
for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split(" ");
  data[i][1] = parseInt(data[i][1]);

  if (data[i][0] === "noop") {
    draw();
    CalSigStr()
  } else if (data[i][0] === "addx") {
    draw();
    CalSigStr()
    draw();
    CalSigStr()
    x += data[i][1];
    sprite = [x - 1 , x, x + 1]; // update sprite position according to the value of x
  }
}

// answer 1 is the sum of the signal strengths at the given cycles
let sum = signalStrength.reduce((a, b) => a + b, 0);
console.log("Part 1: " + sum);

// answer 2 is the message drawn to the crt
// merge each row into strings so they can be printed neatly to see the message
let result = crt.map(row => row.join(""));
console.log("Part 2:");
console.log(result);