'use strict';
import fs from 'fs';

const text = fs.readFileSync("./data/input.txt").toString('utf-8');

// function for creating an array of int arrays
function createArray(data) {
    data = data.split("\n\n");
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split("\n");
        for (let j = 0; j < data[i].length; j++) {
            data[i][j] = parseInt(data[i][j]);
        }
    }
    // remove last element of last array
    // it's NaN because of an extra newline at the end of the data set
    data[data.length - 1].pop();
    return data;
}

// create a sorted array of sums
function createSumArray(data) {
    let sums = [];
    for (let i = 0; i < data.length; i++) {
        sums.push(data[i].reduce((a, b) => a + b));
    }
    sums.sort((a, b) => b - a);
    return sums;
}

let dataArray = createArray(text);
let sumArray = createSumArray(dataArray);
let topThree = sumArray.slice(0, 3);
let sumOfTopThree = topThree.reduce((a, b) => a + b);

console.log("largest sum: " + sumArray[0] + "\ntop three: " + topThree + "\nsum of top three: " + sumOfTopThree);