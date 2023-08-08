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
	Renderer, Scene, Looper, Camera, LooperOnUpdateEvent, ColorCodes, Rectangle, RandomColor, WaitFor, AnimateInteger, AnimateHeximalColor, ConvertByteArrayToHex, OffscreenRenderer, RandomIntBetween
} from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();
const postProcessor = new OffscreenRenderer();

/**
 * Function that generates tile 
 * */
async function createTiles(widthInPixels: number, heightInPixels: number, tileSize: number, gap: number, delay: number) {

	// Calculates the amount of horizontal tiles and vertical tiles.
	// And rounding it up, cuz yeah fuck not rounded number.
	const tileWidth: number = Math.round(widthInPixels / tileSize) + 1;
	const tileHeight: number = Math.round(heightInPixels / tileSize) + 1;

	const baseXShade: number = RandomIntBetween(0, 255);
	const baseYShade: number = RandomIntBetween(0, 255);

	// Do the loopy loop loop.
	for (let x: number = 0; x < tileWidth; x += 1) {

		// Calculated the horizontal color shade.
		const shadeX: number = baseXShade / tileWidth * x;

		// Some other loops.
		for (let y: number = 0; y < tileHeight; y++) {

			// Calculated the vertical color shade.
			const shadeY: number = baseYShade / tileHeight * y;

			// Converting an array containing byte values to a heximal string value.
			const calculatedHexColor: string = "#" + ConvertByteArrayToHex([shadeX, 142, shadeY]);
			const hoverColor: string = "#ffffff";

			// Yeah the rest speaks for itself.

			const tile: Rectangle = new Rectangle(x * (tileSize + gap), y * (tileSize + gap), tileSize, tileSize, {
				backgroundColor: calculatedHexColor
			});

			tile.AddEventListener("mouseDown", function () {

				AnimateHeximalColor(hoverColor, calculatedHexColor, "easeOutCirc", 1000, color => tile.SetStyle("backgroundColor", color));
				AnimateHeximalColor(hoverColor, calculatedHexColor, "easeOutCirc", 1000, color => tile.SetStyle("shadowColor", color));
			});
				
			renderer.Add(tile);

			// AnimateInteger(0, 1, "easeOutExpo", 1000, opacity => tile.SetStyle("opacity", opacity));

			if (delay !== 0) await WaitFor(delay);
		}
	}
}

let renderDuration: number = 0;

function updateDomElements() {

	const guiFramerate = document.querySelector("#game-framerate") as HTMLDivElement;
	const guiDeltatime = document.querySelector("#game-deltatime") as HTMLDivElement;
	const guiRenderObjects = document.querySelector("#game-renderobjects") as HTMLDivElement;
	const guiVisibleRenderObjects = document.querySelector("#game-visible_renderobjects") as HTMLDivElement;
	const guiRenderDuration = document.querySelector("#game-render_duration") as HTMLDivElement;

	guiFramerate.innerText = "Framerate: " + looper.frameRate.toString() + "fps";
	guiDeltatime.innerText = "Delta time: " + looper.deltaTime.toFixed(2) + "ms";
	guiRenderObjects.innerText = "Render objects: " + renderer.renderObjects.length.toString();
	guiVisibleRenderObjects.innerText = "Visible render objects: " + renderer.visibleRenderObjects.length.toString();
	guiRenderDuration.innerText = "Render time: " + renderDuration.toString() + " ms";
}

function render(event: LooperOnUpdateEvent | null) {

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.BLACK);
	renderDuration = renderer.RenderObjectsInCamera(0).duration;

	postProcessor.CreateTexture(renderer);
	renderer.RenderCopiedTexture(postProcessor, { opacity: 0.5 });

	updateDomElements();
}

async function setup() {

	postProcessor.SetDynamicScalingFactor(renderer, .2);
	postProcessor.UseGlowEffect(5, 2);

	looper.Trigger();

	createTiles(600, 600, 50, 20, 0);

	render(null);
}

window.addEventListener("load", setup);