/**
 * Events 
 * by Rohan Kanhaisingh
 * 
 * -----------------------------------------------
 * 
 * This example demonstrates event listeners on
 * graphical elements, for example a rectangle.
 * 
 * Each event listener has their own event object map
 * including data about the event itself.
 **/

import { Renderer, Scene, Camera, Looper, Rectangle, RandomIntBetween, RandomColor } from "../index";
import { RenderObjectMouseDownEvent, SceneResizeEventFunction } from "../typings";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene);
const camera = new Camera(renderer, scene);
const looper = new Looper();

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

async function createSquares() {

	for (let i = 0; i < 322; i++) {

		const x: number = RandomIntBetween(0, scene.width);
		const y: number = RandomIntBetween(0, scene.height);

		const square = renderer.Add(new Rectangle(x, y, 30, 30, { backgroundColor: RandomColor(), borderWidth: 3 })) as Rectangle;

		square.Center(x, y);

		// Sets an event listener on the rectangle which gets triggered when the user enters the mouse in the object.
		square.AddEventListener("mouseEnter", function (event) {

			event.target.styles.shadowBlur = 10;
			event.target.styles.shadowColor = event.target.styles.backgroundColor;
		});

		// Same happening, but when the user is leaving the mouse.
		square.AddEventListener("mouseOut", function (event) {

			event.target.styles.shadowBlur = 0;
			event.target.styles.shadowColor = undefined;
		});

		// Yeah... It speaks for itself.
		square.AddEventListener("mouseDown", function (event: RenderObjectMouseDownEvent) {

			event.target.AnimateCurrentPosition({
				x: RandomIntBetween(0, scene.width),
				y: RandomIntBetween(0, scene.height)
			}, "easeOutElastic", 2000);
		});


		// And also this.
		square.AddEventListener("mouseWheel", function (event) {

			switch (event.mouse.wheelDirection) {
				case "up":
					square.SetFixedSize(square.width + 20, square.width + 20, square.initialPosition);
					break;
				case "down":
					square.SetFixedSize(square.width - 20, square.width - 20, square.initialPosition);
					break;
			}

		});
	}
}

looper.AddEventListener("update", function (event) {
	
	renderer.ClearScene();
	renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;

	updateDomElements();

	return;
});

window.addEventListener("load", function () {

	createSquares();

	looper.Trigger();
	return;
});