'use strict';
import fs from 'fs';

const data = fs.readFileSync("./data/input4.txt").toString('utf-8').split("\n");

let overlaps = 0;
let totalOverlaps = 0;

// count total overlaps (part 1) and all overlaps (part 2)
function findOverlaps(a, b, c, d) {
  if (a >= c && b <= d || a <= c && b >= d) {
    totalOverlaps++;
    overlaps++;
  } else if (b >= c && a <= d) {
    overlaps++;
  }
}

for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split(/\-|\,/).map(Number);
  findOverlaps(data[i][0], data[i][1], data[i][2], data[i][3]);
}

console.log(`Total overlaps: ${totalOverlaps}
All overlaps: ${overlaps}`);