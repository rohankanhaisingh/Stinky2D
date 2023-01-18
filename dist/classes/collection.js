"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const uid_1 = require("../functions/uid");
class Collection {
    /**
     * Creates a new collection, allowing you to manipulate elements in an advanced way.
     * It represents a strongly typed array of object that can be accessed by several methods.
     *
     * This class is highly inspired by the List<T> class written in C#.
     */
    constructor(elements) {
        this.elements = [];
        this.maxSize = null;
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        if (elements)
            this.elements = elements;
    }
    get Count() {
        return this.elements.length;
    }
    get Elements() {
        return this.elements;
    }
    get FirstElement() {
        return this.elements[0];
    }
    /**
     * Adds an element to the list of strongly typed objects.
     *
     * This method cannot add multiple elements at once using an array.
     * Instead, use the 'AddUsingArray' method.
     * @param element
     */
    Add(element) {
        if (this.maxSize === null) {
            this.elements.push(element);
            return this;
        }
        const currentElementsLength = this.elements.length;
        if (currentElementsLength > this.maxSize - 1)
            throw new Error(`Cannot add object to strongly typed list, since it exceeded the maximum size of entries which is set to ${this.maxSize}.`);
        this.elements.push(element);
        return this;
    }
    AddRepeat(object, amount) {
        if (this.maxSize === null) {
            for (let i = 0; i < amount; i++)
                this.elements.push(object);
            return this;
        }
        const currentElementsLength = this.elements.length;
        if (currentElementsLength + amount > this.maxSize - 1)
            throw new Error(`Cannot add object to strongly typed list, since it exceeded the maximum size of entries which is set to ${this.maxSize}.`);
        for (let i = 0; i < amount; i++)
            this.elements.push(object);
        return this;
    }
    AddUsingArray(arr) {
        if (this.maxSize === null) {
            for (let i = 0; i < arr.length; i++)
                this.elements.push(arr[i]);
            return this;
        }
        const currentElementsLength = this.elements.length;
        if (currentElementsLength + arr.length > this.maxSize - 1)
            throw new Error(`Cannot add object to strongly typed list, since it exceeded the maximum size of entries which is set to ${this.maxSize}.`);
        for (let i = 0; i < arr.length; i++)
            this.elements.push(arr[i]);
        return this;
    }
    GetElement(index) {
        return this.elements[index];
    }
    Clear() {
        this.elements = [];
        return this;
    }
    Has(object) {
        let isEqual = false;
        for (let element of this.elements) {
            if (element === object)
                isEqual = true;
        }
        return isEqual;
    }
    ToArray() {
        return this.elements;
    }
    ForEach(callback) {
        const elements = this.elements;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            callback(element, i);
        }
    }
    Delete(object) {
        const elements = this.elements;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element === object) {
                const removeElement = this.elements.splice(i, 1);
                return removeElement;
            }
        }
        return false;
    }
    First() {
        const elements = this.elements;
        if (typeof elements[0] === "undefined")
            return null;
        return elements[0];
    }
    Last() {
        const elements = this.elements;
        if (typeof elements[elements.length - 1] === "undefined")
            return null;
        return elements[elements.length - 1];
    }
    Reverse() {
        return this.elements.reverse();
    }
    SaveReverse() {
        this.elements = this.elements.reverse();
        return this.elements;
    }
    FilterStringElements() {
        const results = [];
        const elements = this.elements;
        for (let element of elements) {
            if (typeof element === "string")
                results.push(element);
        }
        return results;
    }
    FilterNumberElements() {
        const results = [];
        const elements = this.elements;
        for (let element of elements) {
            if (typeof element === "number")
                results.push(element);
        }
        return results;
    }
    FilterBooleanElements() {
        const results = [];
        const elements = this.elements;
        for (let element of elements) {
            if (typeof element === "boolean")
                results.push(element);
        }
        return results;
    }
    FilterFunctionElements() {
        const results = [];
        const elements = this.elements;
        for (let element of elements) {
            if (typeof element === "function")
                results.push(element);
        }
        return results;
    }
    Range(min, max) {
        const elements = this.elements;
        const results = [];
        for (let i = min; i < max; i++) {
            const element = elements[i];
            if (typeof element !== "undefined")
                results.push(element);
        }
        return results;
    }
    DeleteLast() {
        const removedElement = this.elements.pop();
        if (typeof removedElement === "undefined")
            return null;
        return removedElement;
    }
    ReplaceElement(index, object) {
        this.elements[index] = object;
        return object;
    }
    CloneCollection() {
        return new Collection(this.elements);
    }
    MergeCollectionElements(collection) {
        for (let collectionElements of collection.elements) {
            this.elements.push(collectionElements);
        }
        return this;
    }
    Shuffle() {
        const elements = [...this.elements];
        let currentIndex = elements.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [elements[currentIndex], elements[randomIndex]] = [elements[randomIndex], elements[currentIndex]];
        }
        return elements;
    }
    SaveShuffle() {
        const entries = this.elements;
        let currentIndex = entries.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [entries[currentIndex], entries[randomIndex]] = [entries[randomIndex], entries[currentIndex]];
        }
        return entries;
    }
    AllElements() {
        return this.elements;
    }
    Length() {
        return this.elements.length;
    }
    GetElementTypes() {
        const types = [];
        const elements = this.elements;
        for (let element of elements) {
            const elementType = typeof element;
            if (!types.includes(elementType))
                types.push(elementType);
        }
        return types;
    }
}
exports.Collection = Collection;
