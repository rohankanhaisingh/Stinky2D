import { CollectionElementTypes } from "../typings";
export declare class Collection<T = any> {
    private elements;
    maxSize: null | number;
    id: string;
    timestamp: number;
    /**
     * Creates a new collection, allowing you to manipulate elements in an advanced way.
     * It represents a strongly typed array of object that can be accessed by several methods.
     *
     * This class is highly inspired by the List<T> class written in C#.
     */
    constructor(elements?: T[]);
    get Count(): number;
    get Elements(): T[];
    get FirstElement(): T | undefined;
    /**
     * Adds an element to the list of strongly typed objects.
     *
     * This method cannot add multiple elements at once using an array.
     * Instead, use the 'AddUsingArray' method.
     * @param element
     */
    Add(element: T): Collection<T>;
    AddRepeat(object: T, amount: number): Collection<T>;
    AddUsingArray(arr: T[]): Collection<T>;
    GetElement(index: number): T;
    Clear(): Collection<T>;
    Has(object: T): boolean;
    ToArray(): T[];
    ForEach(callback: (element: T, index: number) => void): void;
    Delete(object: T): T[] | boolean;
    First(): T | null;
    Last(): T | null;
    Reverse(): T[];
    SaveReverse(): T[];
    FilterStringElements(): string[];
    FilterNumberElements(): number[];
    FilterBooleanElements(): boolean[];
    FilterFunctionElements(): Function[];
    Range(min: number, max: number): T[];
    DeleteLast(): T | null;
    ReplaceElement(index: number, object: T): T;
    CloneCollection(): Collection<T>;
    MergeCollectionElements(collection: Collection<T>): Collection<T>;
    Shuffle(): T[];
    SaveShuffle(): T[];
    AllElements(): T[];
    Length(): number;
    GetElementTypes(): CollectionElementTypes[];
}
