import {
	Renderer, Scene, Looper, Camera, LooperTickState, ColorCodes, Rectangle, RandomColor, WaitFor, AnimateInteger, AnimateHeximalColor, ConvertByteArrayToHex
} from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

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
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup);