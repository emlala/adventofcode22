'use strict';
import fs from 'fs';

const data = fs.readFileSync("./data/input6.txt").toString('utf-8').trim();

// part 1
// find four unique consecutive letters ("marker"), return the string and the index of the next letter
function findMarkerFour(data) {
    let marker = data[0];
    for (let i = 1; i < data.length; i++) {
        if (!marker.includes(data[i])) {
            marker += data[i];
            if (marker.length === 4) {
                return `Part 1: ${marker}, ${i+=1}`;
            } 
        } else {
            // the marker contains the letter, find the first occurence and slice the marker after it
            let ind = marker.indexOf(data[i]);
            marker = marker.slice(ind + 1) + data[i]
        }
    }
}

// part 2
// find fourteen unique consecutive letters ("marker"), return the string and the index of the next letter
function findMarkerFourteen(data) {
    let marker = data[0];
    for (let i = 1; i < data.length; i++) {
        if (!marker.includes(data[i])) {
            marker += data[i];
            if (marker.length === 14) {
                return `Part 2: ${marker}, ${i+=1}`;
            }
        } else {
            let ind = marker.indexOf(data[i]);
            marker = marker.slice(ind + 1) + data[i];
        }
    }
}

console.log(findMarkerFour(data) + "\n" + findMarkerFourteen(data));