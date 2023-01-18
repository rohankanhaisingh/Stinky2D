"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const nameCollection = new __1.Collection();
const ageCollection = new __1.Collection();
const listCollection = new __1.Collection();
const mainCollection = new __1.Collection();
nameCollection.AddUsingArray(["Fred", "Nig", "Obamna", "Kanye East", "The Rock"]);
ageCollection.AddUsingArray([10, 32, 53, 93, 0.428]);
listCollection.AddRepeat(["bruh", "niggard", "sussy"], 5);
console.log(nameCollection.Elements);
console.log(ageCollection.Elements);
console.log(listCollection.Elements);
mainCollection.MergeCollectionElements(nameCollection).MergeCollectionElements(ageCollection).MergeCollectionElements(listCollection);
console.log(mainCollection.Elements);
console.log(mainCollection.GetElementTypes());
