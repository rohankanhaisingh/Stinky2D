"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplifyImageData = exports.LoadImageSync = exports.WaitFor = void 0;
const colors_1 = require("../constants/colors");
/**
 * Asynchronous function that stops the program for a certain amount of time and then continues.
 * @param ms Time to continue.
 */
function WaitFor(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(Date.now());
            }, ms);
        });
    });
}
exports.WaitFor = WaitFor;
/**
 * Loads an image asynchronously, and returns an HTMLImageElement that can be used as a renderer component.
 * An error is thrown if the source entered does not exist, or the file cannot be accessed.
 * @param url Path of the image.
 * */
function LoadImageSync(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = url;
            img.addEventListener("load", function () {
                resolve(img);
            });
            img.addEventListener("error", function () {
                reject();
            });
        });
    });
}
exports.LoadImageSync = LoadImageSync;
function SimplifyImageData(imageData) {
    return {
        red: imageData.data[0],
        green: imageData.data[1],
        blue: imageData.data[2],
        alpha: imageData.data[3],
        colorSpace: imageData.colorSpace,
        width: imageData.width,
        height: imageData.height,
        hex: (0, colors_1.ConvertByteArrayToHex)([imageData.data[0], imageData.data[1], imageData.data[2]])
    };
}
exports.SimplifyImageData = SimplifyImageData;
