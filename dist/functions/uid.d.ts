import { GeneratedUniqueIDObject } from "../typings";
/**
 * Generates an unique ID, with the given length.
 * The generated ID includes normal and capital letters and numbers, it does not include symbols.
 *
 * @param len Specifies the length of the generated ID. No length will result an ID with the length of 12.
 */
export declare function UniqueID(len?: number): GeneratedUniqueIDObject;
