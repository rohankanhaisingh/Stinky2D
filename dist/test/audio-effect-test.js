"use strict";
/**
 * Audio Effect Test
 * by Rohan Kanhaisingh
 *
 * ---------------------------------
 *
 * This example demonstrates how you can change the audio
 * post processing effects in a custom order which can take
 * audible effect on the user.
 *
 * Both the AudioSystem2D and AudioNode2D classes are being used
 * in this example.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const audioSystem = new __1.AudioSystem2D();
const audioSource = new Audio("../res/audio/bonk.ogg");
const audioNode = new __1.AudioNode2D(audioSystem, audioSource, 0, 0, 0);
// It goes like this
// BiquadFilter > StereoPanner > GainNode > AnalyserNode > Output
audioNode.Reconnect([
    "BiquadFilter",
    "StereoPanner",
    "GainNode",
    "AnalyserNode",
]).Play();
