import { Renderer, Scene, Looper, Camera, ColorCodes, LoadImageSync, OffscreenRenderer, Circle, RandomIntBetween, RandomColor, CopyRenderingOptions } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();
const offscreenRenderer: OffscreenRenderer = new OffscreenRenderer();

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
	guiRenderDuration.innerText = "Render time:  ?ms";
}

function render(event: any) {

	const renderingOptions: CopyRenderingOptions = {
		opacity: 1,
		imageSmoothingEnabled: true
	};

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.BLACK);
	renderer.RenderObjectsInCamera(event.deltaTime).duration;

	updateDomElements();

	offscreenRenderer.CreateTexture(renderer);
	renderer.RenderCopiedTexture(offscreenRenderer, renderingOptions);
}

async function setup() {

	offscreenRenderer.SetDynamicScalingFactor(renderer, .5);

	for (let i = 0; i < 100; i++) {

		const x = RandomIntBetween(0, scene.width);
		const y = RandomIntBetween(0, scene.height);

		const circle = new Circle(x, y, 10, 0, 360, false, {
			backgroundColor: RandomColor()
		});

		renderer.Add(circle);
	}

	looper.Trigger();
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup);