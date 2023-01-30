"use strict";
/**
 * Dynamic Audio Test
 * by Rohan Kanhaisingh
 *
 * -----------------------------
 *
 * This example demonstrates a 2 dimensional audio
 * environment using the AudioSystem2D and AudioNode2d classes.
 *
 * The playing audio are represented using graphical elements such as
 * a 2D circle and a 2D rectangle.
*/
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
const index_1 = require("../index");
const scene = new index_1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"));
const renderer = new index_1.Renderer(scene);
const camera = new index_1.Camera(renderer, scene);
const looper = new index_1.Looper();
const audioSystem2D = new index_1.AudioSystem2D();
// Declaring audio sources in an array.
const audioSources = [
    "../res/audio/alarm.ogg",
    "../res/audio/bonk.ogg",
    "../res/audio/click.ogg"
];
// Function that generates random audio nodes.
function generateRandomAudioNodes() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 52; i++) {
            // You know, this speaks for itself.
            const x = (0, index_1.RandomIntBetween)(0, scene.width);
            const y = (0, index_1.RandomIntBetween)(0, scene.height);
            // And also this.
            const range = (0, index_1.RandomIntBetween)(1, 223);
            // Annnndd this...
            const circle = new index_1.Circle(x, y, range, 0, 360, false, {
                backgroundColor: (0, index_1.RandomColor)()
            });
            // Creating a new 2 dimensional audio node, linked to the created audio system, and attaching a random HTMLAudioElement to it.
            // The position and the range also gets set so it can dynamically be played.
            const audioNode = new index_1.AudioNode2D(audioSystem2D, new Audio(audioSources[(0, index_1.RandomIntBetween)(0, audioSources.length)]), x, y, range);
            // Sets the gain volume to 1, do not confuse with the normal volume.
            // The normal volume can only be set between 0 and 1,
            // although the gain value can be set from 0 to whatever you want.
            audioNode.gainValue = 1;
            // Sets an event listener when the audio nodes end.
            // When it does, it calls the function.
            audioNode.AddEventListener("end", function () {
                // Not really relevant.
                renderer.Destroy(circle);
            });
            // Plays the audio node when it's ready.
            audioNode.Play();
            // Also not relevant.
            renderer.Add(circle);
            yield (0, index_1.WaitFor)(100);
        }
    });
}
// Sets the compression values for the following things:
// - Threshold
// - Knee
// - Ratio
// - Attack
// - Release
// The compressor can be used to prevent audio clipping, which
// can make the main output audio sound not like a earraped airsiren.
// For more information, check https://en.wikipedia.org/wiki/Dynamic_range_compression
audioSystem2D.SetCompressorThresholdValue(-50);
audioSystem2D.SetCompressorKneeValue(40);
audioSystem2D.SetCompressorRatioValue(12);
audioSystem2D.SetCompressorAttackValue(0);
audioSystem2D.SetCompressorReleaseValue(0.25);
const mousePointer = new index_1.Circle(0, 0, 20, 0, 360, false, { backgroundColor: index_1.ColorCodes.GREEN_CYAN });
audioSystem2D.AttachRenderObject(mousePointer);
renderer.Add(mousePointer);
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        audioSystem2D.masterVolume = 0;
    }
    else {
        audioSystem2D.masterVolume = 1;
    }
});
scene.AddEventListener("mouseMove", function (event) {
    mousePointer.x = event.x;
    mousePointer.y = event.y;
});
looper.AddEventListener("update", function (event) {
    renderer.ClearScene();
    renderer.RenderObjectsInCamera(event.deltaTime);
    audioSystem2D.Update(event.deltaTime);
    return;
});
window.addEventListener("load", function () {
    generateRandomAudioNodes();
    looper.Trigger();
});
