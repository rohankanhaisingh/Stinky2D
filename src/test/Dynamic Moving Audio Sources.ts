import { Renderer, Scene, Looper, Camera, LooperOnUpdateEvent, RandomIntBetween, Circle, RandomColor, AudioSystem2D, AudioNode2D, Collection, GetAverageArrayValue } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

const audioSystem: AudioSystem2D = new AudioSystem2D();
const circles: Collection<Circle> = new Collection<Circle>();

audioSystem.UseCompressorPreset("master-no-clip");

const audioSources: string[] = [
	"../res/audio/alarm.ogg",
	"../res/audio/bonk.ogg",
	"../res/audio/click.ogg"
];

const mousePointer: Circle = new Circle(0, 0, 10, 0, 360, false, {
	backgroundColor: "red"
});

scene.AddEventListener("mouseMove", function (ev) {

	mousePointer.SetPosition(ev.x, ev.y);
});

audioSystem.AttachRenderObject(mousePointer);

function updateDomElements() {

	const guiFramerate = <HTMLDivElement>document.querySelector("#game-framerate");
	const guiDeltatime = <HTMLDivElement>document.querySelector("#game-deltatime");
	const guiRenderObjects = <HTMLDivElement>document.querySelector("#game-renderobjects");
	const guiVisibleRenderObjects = <HTMLDivElement>document.querySelector("#game-visible_renderobjects");
	const guiRenderDuration = <HTMLDivElement>document.querySelector("#game-render_duration");

	guiFramerate.innerText = "Framerate: " + looper.frameRate.toString() + "fps";
	guiDeltatime.innerText = "Delta time: " + looper.deltaTime.toFixed(2) + "ms";
	guiRenderObjects.innerText = "Render objects: " + renderer.renderObjects.length.toString();
	guiVisibleRenderObjects.innerText = "Visible render objects: " + renderer.visibleRenderObjects.length.toString();
	guiRenderDuration.innerText = "Render time: 0ms";
}

function createAudioNodes() {

	const x: number = RandomIntBetween(0, scene.width);
	const y: number = RandomIntBetween(0, scene.height);

	const range: number = 50;

	const circle: Circle = new Circle(x, y, 10, 0, 360, false, {
		backgroundColor: RandomColor()
	});

	const audioNode: AudioNode2D = new AudioNode2D(audioSystem, new Audio(audioSources[RandomIntBetween(0, audioSources.length)]), x, y, range);

	audioNode.playWhenAudible = false;
	audioNode.loop = true;
	audioNode.Play();

	audioNode.AttachRenderObject(circle);

	circles.Add(circle);
	renderer.Add(circle);
}

function render(event: LooperOnUpdateEvent) {

	renderer.ClearScene();
	renderer.PaintScene("#ffffff");
	renderer.RenderObjectsInCamera(event.deltaTime).duration;

	audioSystem.Update(event.deltaTime);

	circles.ForEach(function (circle: Circle) {

		circle.x += 1 * event.deltaTime;

		if (circle.x >= scene.width - circle.radius) circle.x = -circle.radius;

		circle.audioNodes.forEach(function (audioNode: AudioNode2D) {

			if (!audioNode.isAudible) {

				circle.radius = 10;

				return;
			}

			const byteData = audioNode.GetAnalyserByteFrequencyData();

			const arr: number[] = [...byteData];

			const avg = GetAverageArrayValue(arr);

			circle.radius = 10 + avg;
		});
	});

	updateDomElements();
}

async function setup() {

	looper.Trigger();

	for (var i = 0; i < 50; i++) createAudioNodes();

	renderer.Add(mousePointer);
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup)