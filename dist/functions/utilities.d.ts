import { SimplifiedImageData } from "../typings";
/**
 * Asynchronous function that stops the program for a certain amount of time and then continues.
 * @param ms Time to continue.
 */
export declare function WaitFor(ms: number): Promise<number>;
/**
 * Loads an image asynchronously, and returns an HTMLImageElement that can be used as a renderer component.
 * An error is thrown if the source entered does not exist, or the file cannot be accessed.
 * @param url Path of the image.
 * */
export declare function LoadImageSync(url: string): Promise<HTMLImageElement>;
/**
 * Loads an audio asynchronously, and returns an HTMLAudioElement that can be used to play audio.
 * An error is thrown if the source entered does not exist, or the file cannot be accessed.
 * @param url Path of the audio.
 * */
export declare function LoadAudioSync(url: string): Promise<HTMLAudioElement>;
/**
 * Simplifies an object containing image data into readable content.
 */
export declare function SimplifyImageData(imageData: ImageData): SimplifiedImageData;
export declare function Bruh(): void;
