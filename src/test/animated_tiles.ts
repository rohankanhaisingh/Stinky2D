/**
 * Animated Tiles
 * by Rohan Kanhaisingh
 * 
 * ----------------------
 * 
 * This example demonstrates a collection tiles that gets 
 * animated when appearing. 
 * 
 * The position and the color of those styles are generated
 * using a simple algorithm.
 * 
 * */

import {
	Renderer, Scene, Looper, Camera, LooperTickState, ColorCodes, Rectangle, RandomColor, WaitFor, AnimateInteger, AnimateHeximalColor, ConvertByteArrayToHex
} from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

/**
 * Function that generates tile 
 * */
async function createTiles(widthInPixels: number, heightInPixels: number, tileSize: number, gap: number, delay: number) {

	// Calculates the amount of horizontal tiles and vertical tiles.
	// And rounding it up, cuz yeah fuck not rounded number.
	const tileWidth: number = Math.round(widthInPixels / tileSize) + 1;
	const tileHeight: number = Math.round(heightInPixels / tileSize) + 1;

	// Do the loopy loop loop.
	for (let x: number = 0; x < tileWidth; x += 1) {

		// Calculated the horizontal color shade.
		const shadeX: number = 255 / tileWidth * x;

		// Some other loops.
		for (let y: number = 0; y < tileHeight; y++) {

			// Calculated the vertical color shade.
			const shadeY: number = 145 / tileHeight * y;

			// Converting an array containing byte values to a heximal string value.
			const calculatedHexColor: string = "#" + ConvertByteArrayToHex([shadeX, 142, shadeY]);
			const hoverColor: string = "#ffffff";

			// Yeah the rest speaks for itself.

			const tile: Rectangle = new Rectangle(x * (tileSize + gap), y * (tileSize + gap), tileSize, tileSize, {
				backgroundColor: calculatedHexColor,
				shadowBlur: 60,
				shadowColor: calculatedHexColor
			});

			tile.AddEventListener("mouseDown", function () {

				AnimateHeximalColor(hoverColor, calculatedHexColor, "easeOutCirc", 1000, color => tile.SetStyle("backgroundColor", color));
				AnimateHeximalColor(hoverColor, calculatedHexColor, "easeOutCirc", 1000, color => tile.SetStyle("shadowColor", color));
			});
				
			renderer.Add(tile);

			AnimateInteger(0, 1, "easeOutExpo", 1000, opacity => tile.SetStyle("opacity", opacity));

			if (delay !== 0) await WaitFor(delay);
		}
	}
}

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

function render(event: LooperTickState) {

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.BLACK);
	renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;

	updateDomElements();
}

async function setup() {

	looper.Trigger();

	createTiles(600, 600, 50, 20, 0);
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup);