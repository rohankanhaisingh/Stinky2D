/*
 * Collection Test
 * by Rohan Kanhaisingh
 * 
 * -------------------------
 * 
 * This example demonstrates the Collection<T> class which can be used to
 * store and manipulate data in an advanced way. This is based on the
 * .NET class List<T>.
 * 
 * Really cool.
 * 
 */

import { Collection } from "..";

// Creating collections to store specific typed data.
// The data type can be specified as generic when instancing.
const nameCollection: Collection<string> = new Collection<string>();
const ageCollection: Collection<number> = new Collection<number>();
const listCollection: Collection<string[]> = new Collection<string[]>();

const mainCollection: Collection<any> = new Collection<any>();

// There are three ways to add elements to a collection.
// .AddElement
// .AddUsingArray
// .AddRepeat
nameCollection.AddUsingArray(["Fred", "Nig", "Obamna", "Kanye East", "The Rock"]);
ageCollection.AddUsingArray([10, 32, 53, 93, 0.428]);
listCollection.AddRepeat(["bruh", "niggard", "sussy"], 5);

console.log(nameCollection.Elements);
console.log(ageCollection.Elements);
console.log(listCollection.Elements);

// A collection it's elements can also be merged with other collections.
mainCollection.MergeCollectionElements(nameCollection).MergeCollectionElements(ageCollection).MergeCollectionElements(listCollection);

console.log(mainCollection.Elements);
console.log(mainCollection.GetElementTypes());