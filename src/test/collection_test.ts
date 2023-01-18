import { Collection } from "..";

const nameCollection: Collection<string> = new Collection<string>();
const ageCollection: Collection<number> = new Collection<number>();
const listCollection: Collection<string[]> = new Collection<string[]>();

const mainCollection: Collection<any> = new Collection<any>();

nameCollection.AddUsingArray(["Fred", "Nig", "Obamna", "Kanye East", "The Rock"]);
ageCollection.AddUsingArray([10, 32, 53, 93, 0.428]);
listCollection.AddRepeat(["bruh", "niggard", "sussy"], 5);

console.log(nameCollection.Elements);
console.log(ageCollection.Elements);
console.log(listCollection.Elements);

mainCollection.MergeCollectionElements(nameCollection).MergeCollectionElements(ageCollection).MergeCollectionElements(listCollection);

console.log(mainCollection.Elements);
console.log(mainCollection.GetElementTypes())