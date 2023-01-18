"use strict";
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
audioNode.AddEventListener("update", function () {
    const frequencyData = audioNode.GetAnalyserByteFrequencyData();
    console.log(frequencyData);
});
