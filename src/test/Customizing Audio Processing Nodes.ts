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

import { AudioSystem2D, AudioNode2D } from "..";

const audioSystem = new AudioSystem2D();
const audioSource = new Audio("../res/audio/bonk.ogg");
const audioNode = new AudioNode2D(audioSystem, audioSource, 0, 0, 0);

// It goes like this
// BiquadFilter > StereoPanner > GainNode > AnalyserNode > Output
audioNode.Reconnect([
	"BiquadFilter",
	"StereoPanner",
	"GainNode",
	"AnalyserNode",
]).Play();

