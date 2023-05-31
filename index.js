#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const data = content.trim().split('\n').slice(1).map((item) => {
  let newItem = item.split('|')
  return {
      entity: newItem[1].trim(),
      power: Number(newItem[2].trim()),
      health: Number(newItem[3].trim()),
      countToParty: Number(newItem[4].trim()),
      height: Number(newItem[5].trim()),
      weight: Number(newItem[6].trim()),
      price: Number(newItem[7].trim())
  }
})

console.log(`Видов существ ${data.length}`)

// 2)
let copyData = Array.from(data);
const pricePowered = copyData.sort(function (current, next) {
  return next.power - current.power
});

const mostPowered = pricePowered.shift().price * 10;
const secondPowered = pricePowered.shift().price * 20;

console.log(`Стоимость 10 самых сильных: ${mostPowered}. Стоимость 20 вторых по силе: ${secondPowered}`)

// 3)
copyData = Array.from(data)

const weightableSort = copyData.sort(function (current, next) {
  return next.weight - current.weight
});

const maxWeight =  weightableSort.shift().entity
const minWeight = weightableSort.pop().entity

console.log(`Самый толстый юнит: ${maxWeight}. Самый худой юнит: ${minWeight}`)

// 4)
copyData = Array.from(data)

const costPerPowerSort = copyData.sort(function (current, next) {
  return next.price / next.power - current.price / current.power
});

const lessCostPerPower =  costPerPowerSort.shift()
const mostCostPerPower = costPerPowerSort.pop()

console.log(`Самый невыгодный по силе: ${lessCostPerPower.entity}. Самый выгодный по силе: ${mostCostPerPower.entity}`)

// 5)
copyData = Array.from(data)

const sum = 10000;

const total = sum / mostCostPerPower.price

console.log(`Самая сильная армия состоит из ${mostCostPerPower.entity}. Мы можем нанять ${total} юнитов за ${sum}. Суммарная сила равна ${total * mostCostPerPower.power}`)
console.log(content)
// END
