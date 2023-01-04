import {Renderer, Scene, Camera, Looper, AudioSystem2D, AudioNode2D, LooperTickState, Rectangle, ColorCodes, MouseMoveObject, RandomIntBetween, Circle, RandomColor, WaitFor } from "../index";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene);
const camera = new Camera(renderer, scene);
const looper = new Looper();
const audioSystem2D = new AudioSystem2D();

const audioSources: string[] = [
	"../res/audio/alarm.ogg",
	"../res/audio/bonk.ogg",
	"../res/audio/click.ogg"
];

async function generateRandomAudioNodes() {

	for (let i = 0; i < 52; i++) {
		const x: number = RandomIntBetween(0, scene.width);
		const y: number = RandomIntBetween(0, scene.height);

		const range: number = RandomIntBetween(1, 223);

		const circle = new Circle(x, y, range, 0, 360, false, {
			backgroundColor: RandomColor()
		});

		const audioNode = new AudioNode2D(audioSystem2D, new Audio(audioSources[RandomIntBetween(0, audioSources.length)]), x, y, range);

		audioNode.gainValue = 1;

		audioNode.AddEventListener("end", function () {

			renderer.Destroy(circle);
		});

		audioNode.Play();
		renderer.Add(circle);

		await WaitFor(100);
	}
}

audioSystem2D.SetCompressorThresholdValue(-50);
audioSystem2D.SetCompressorKneeValue(40);
audioSystem2D.SetCompressorRatioValue(12);
audioSystem2D.SetCompressorAttackValue(0);
audioSystem2D.SetCompressorReleaseValue(0.25);

const mousePointer = new Circle(0, 0, 20, 0, 360, false, { backgroundColor: ColorCodes.GREEN_CYAN });

audioSystem2D.AttachRenderObject(mousePointer);
renderer.Add(mousePointer);

document.addEventListener("visibilitychange", function () {

	if (document.hidden) {
		audioSystem2D.masterVolume = 0;
	} else {
		audioSystem2D.masterVolume = 1;
	}

});

scene.AddEventListener("mouseMove", function (event: MouseMoveObject) {

	mousePointer.x = event.x;
	mousePointer.y = event.y;
});

looper.AddEventListener("update", function (event: LooperTickState) {

	renderer.ClearScene();
	renderer.RenderObjectsInCamera(event.deltaTime);

	audioSystem2D.Update();

	return;
});

window.addEventListener("mousedown", function () {

	let audioNode: AudioNode2D | null  = new AudioNode2D(audioSystem2D, new Audio("../res/audio/trigger.ogg"), 10, 10, 10);

	audioNode.Play();
});

window.addEventListener("load", function () {

	generateRandomAudioNodes();

	looper.Trigger();
});