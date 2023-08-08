import { Plugins, Renderer, Scene, Looper, Camera, LooperOnUpdateEvent, ColorCodes, Rectangle, RenderObjectStyles, RandomIntBetween, AnimateInteger } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

function createToggles(amount: number) {

	const bodyStyles: RenderObjectStyles = {
		backgroundColor: ColorCodes.CHARCOAL,
		shadowBlur: 5,
		shadowColor: "rgba(0, 0, 0, .4)",
		shadowOffsetX: -5,
		shadowOffsetY: 5
	};

	const thumbStyles: RenderObjectStyles = {
		backgroundColor: ColorCodes.WHITE
	};

	const x: number = scene.Center().x;
	const y: number = scene.Center().y;

	const toggle: Plugins.Toggle = new Plugins.Toggle(x, y, 120, 30, bodyStyles, thumbStyles);

	setTimeout(function () {

		toggle.SetPosition(x, y + 50);

	}, 1000);

	renderer.Add(toggle);
}


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

function render(event: LooperOnUpdateEvent) {

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.WHITE);
	renderer.RenderObjectsInCamera(event.deltaTime).duration;

	updateDomElements();
}

async function setup() {

	createToggles(1);

	looper.Trigger();

}

looper.AddEventListener("update", render);
window.addEventListener("load", setup)