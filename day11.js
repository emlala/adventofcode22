'use strict';
import fs from 'fs';

let data = fs.readFileSync("./data/test.txt").toString('utf-8').trim().split('\r\n\r\n');
data = data.map((monkey) => {
    return monkey.replace(/,/g, '').split('\r\n');
});

let monkeys = [];

for (let i = 0; i < data.length; i++) {
  monkeys.push([]);
  for (let j = 1; j < data[i].length; j++) {
    let monkey = data[i][j].trimStart().split(' ');
    monkeys[i].push(monkey);
  }
}

function getItems(monkey) {
  let items = [];
  for (let j = 0; j < monkey[0].length; j++) {
    if (!isNaN(monkey[0][j])) {
      items.push(parseInt(monkey[0][j]));
    }
  }
  monkey[0] = items;
}

function getOperation(monkey) {
  let operation = [monkey[1][4], monkey[1][5]];
  monkey[1] = operation;
}

function getNum(monkey) {
  for (let i = 2; i < monkey.length; i++) {
    for (let j = 0; j < monkey[i].length; j++) {
      if (!isNaN(monkey[i][j])) {
        monkey[i] = parseInt(monkey[i][j]);
      }
    }
  }
}

function play() {
  for (let i = 0; i < monkeys.length; i++) {
    if (monkeys[i][0].length === 0) {
      continue;
    } else {
      while (monkeys[i][0].length > 0) {
        monkeyCount[i]++;
        let item = monkeys[i][0].shift();
        console.log("Monkey " + i + " item " + item);
        let y;
        
        if (monkeys[i][1][1] === "old") {
          y = item;
        } else {
          y = parseInt(monkeys[i][1][1]);
        }
        
        if (monkeys[i][1][0] === "+") {
          item = item + y;
        } else if (monkeys[i][1][0] === "*") {
          item = item * y;
        }

        item = Math.floor(item / 3);
        console.log(" after operation:" + item);

        if (item % monkeys[i][2] == 0){
          let x = monkeys[i][3];
          monkeys[x][0].push(item);
          console.log(item + "is divisible by " + monkeys[i][2] + " so it goes to monkey " + x)
        } else {
          let x = monkeys[i][4];
          monkeys[x][0].push(item);   
          console.log(item + "is not divisible by " + monkeys[i][2] + " so it goes to monkey " + x)     
        }
      }
    }
  }
}

function monkeyBusiness(monkeyCount) {
  let temp = monkeyCount.sort((a, b) => b - a);
  let first = temp[0];
  let second = temp[1];
  return first * second;
}

let monkeyCount = [];

for (let i = 0; i < monkeys.length; i++) {
  getItems(monkeys[i]);
  getOperation(monkeys[i]);
  getNum(monkeys[i]);
  monkeyCount.push([0]);
}

for (let i = 0; i < 1; i++) {
  play();
}

console.log(monkeyBusiness(monkeyCount));


// part 2
// ????