/*
 * Color Picker
 * by Rohan Kanhaisingh
 * 
 * ---------------------
 * 
 * This example demonstrates how you can pick colors on a specific 
 * pixel or pixels using the renderer.GetImageData() method.
 * 
 */

import { Scene, Renderer, Camera, Looper, LooperTickState, RandomIntBetween, Rectangle, RandomColor, MouseMoveObject, ColorCodes, SimplifiedImageData, SimplifyImageData } from "..";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene, {willReadFrequently: true});
const camera = new Camera(renderer, scene);
const looper = new Looper();

scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");

let renderDuration: number = 0;

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
	guiRenderDuration.innerText = "Render time: " + renderDuration.toString() + " ms";
}

for (let i = 0; i < 42; i++) {

	const x: number = RandomIntBetween(0, scene.width);
	const y: number = RandomIntBetween(0, scene.width);

	const width: number = RandomIntBetween(0, 132);
	const height: number = RandomIntBetween(0, 132);

	const rect = new Rectangle(x, y, width, height, {
		backgroundColor: RandomColor()
	});

	renderer.Add(rect);
}

// Sets an event listener when the user moves their mouse on the scene.
scene.AddEventListener("mouseMove", function (event: MouseMoveObject) {

	// Simplifying collected image data from the renderer.
	const imageData: SimplifiedImageData = SimplifyImageData(renderer.GetImageData(event.x, event.y, 1, 1));

	console.log(imageData.hex);

	//if (colors[0] !== 235 && colors[1] !== 74 && colors[2] !== 98) {
	//	console.log("Is in white");
	//}
});

looper.AddEventListener("update", function (event: LooperTickState) {

	if (event.deltaTime < 0) return;

	renderer.ClearScene();
	renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;

	updateDomElements();
});

looper.Trigger();