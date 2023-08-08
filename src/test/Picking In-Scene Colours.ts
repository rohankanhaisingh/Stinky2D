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

import { Scene, Renderer, Camera, Looper, LooperOnUpdateEvent, RandomIntBetween, Rectangle, RandomColor, MouseMoveObject, ColorCodes, SimplifiedImageData, SimplifyImageData, Vec2 } from "..";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene, {willReadFrequently: true});
const camera = new Camera(renderer, scene);
const looper = new Looper();

scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");

function render(event: LooperOnUpdateEvent) {

	if (event.deltaTime < 0) return;

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.WHITE);
	renderer.RenderObjectsInCamera(event.deltaTime).duration;
}

function setup() {

	for (let i = 0; i < 42; i++) {

		const rect = new Rectangle(0, 0, 0, 0, {backgroundColor: RandomColor() });

		rect.SetSize(new Vec2(RandomIntBetween(0, 132), RandomIntBetween(0, 132)));
		rect.SetPosition(scene.GetRandomPosition());

		renderer.Add(rect);

		rect.AddEventListener("mouseEnter", function (event) {

			console.log(rect.arrayIndex);
		});
	}

	const tracker = new Rectangle(0, 0, 40, 40, {
		shadowBlur: 10,
		shadowColor: "rgb(0, 0, 0, .3)"
	});

	renderer.Add(tracker);
	

	// Sets an event listener when the user moves their mouse on the scene.
	scene.AddEventListener("mouseMove", function (event: MouseMoveObject) {

		// Simplifying collected image data from the renderer.
		const imageData: SimplifiedImageData = SimplifyImageData(renderer.GetImageData(event.x, event.y, 1, 1));

		tracker.SetPosition(event.x + 20, event.y);
		tracker.styles.backgroundColor = imageData.hex;

	});

	looper.AddEventListener("update", render).Trigger();
}

window.addEventListener("load", setup);