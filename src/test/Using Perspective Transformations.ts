import { Scene, Renderer, Camera, Looper, ColorCodes, LooperOnUpdateEvent, Rectangle, AnimateInteger, LoadImageSync, RandomIntBetween, RandomColor, ConvertHexToByteArray, ConvertByteArrayToHex, FixedHexToRgbArray, RenderObject } from "..";

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

function render(event: LooperOnUpdateEvent) {

	if (event.deltaTime < 0) return;

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.WHITE);
	renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;

	updateDomElements();

}

async function createObamna(amount: number) {

	const obama = await LoadImageSync("https://www.europa-nu.nl/9353000/1/j4nvh0qavhjkdqd_j9vvj9idsj04xr6/vlbjj03d1wny?sizew=933&sizeh=1200&crop=778:58:1081:1390&lm=qfo8io");

	for (let i = 0; i < amount; i++) {

		const x: number = RandomIntBetween(0, scene.width);
		const y: number = RandomIntBetween(0, scene.height);

		const speed: number = RandomIntBetween(1, 50) / 10;

		const randomColor: string = RandomColor();
		
		const rect1: Rectangle = new Rectangle(x, y, 50, 80, {
			backgroundColor: randomColor,
		});

		rect1.SetTransform(1, RandomIntBetween(1, 20) / 10, RandomIntBetween(1, 20) / 10, 1, 0, 0);

		rect1.AddEventListener("render", function () {

			if (rect1.x >= scene.width - (rect1.width * 2))
				renderer.Destroy(rect1);

			rect1.x += speed * looper.deltaTime;

		});

		renderer.Add(rect1);
	}

}

async function setup() {

	await createObamna(221);

	looper.Trigger();
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup);