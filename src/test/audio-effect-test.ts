import { AudioSystem2D, AudioNode2D } from "../";

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

audioNode.AddEventListener("update", function () {

	const frequencyData = audioNode.GetAnalyserByteFrequencyData();

	console.log(frequencyData);
});
