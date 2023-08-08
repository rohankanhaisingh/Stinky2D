import { Renderer, Looper, Camera, Scene,LooperOnUpdateEvent, ColorCodes, Vec2, Rectangle, RandomColor, LineSystem2D, Line2D, RandomIntBetween } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

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
	guiRenderDuration.innerText = "Render time: 0ms";
}

function render(event: LooperOnUpdateEvent) {

	if (event.deltaTime < 0) return;

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.BLACK);
	renderer.RenderObjectsInCamera(event.deltaTime);

	updateDomElements();
}

function createCenterGrid() {

	const horizontalLine = document.createElement("div"),
		verticalLine = document.createElement("div");

	horizontalLine.style.setProperty("width", "100vw");
	horizontalLine.style.setProperty("height", "1px");
	horizontalLine.style.setProperty("inset", "0");
	horizontalLine.style.setProperty("margin", "auto");
	horizontalLine.style.setProperty("position", "fixed");
	horizontalLine.style.setProperty("z-index", "99999");
	horizontalLine.style.setProperty("background", "red");

	verticalLine.style.setProperty("width", "1px");
	verticalLine.style.setProperty("height", "100vh");
	verticalLine.style.setProperty("inset", "0");
	verticalLine.style.setProperty("margin", "auto");
	verticalLine.style.setProperty("position", "fixed");
	verticalLine.style.setProperty("z-index", "99999");
	verticalLine.style.setProperty("background", "red");

	document.body.appendChild(horizontalLine);
	document.body.appendChild(verticalLine);
}

function setup() {

	// Generate random squares

	const amountOfSquares: number = 200;

	for (let i = 0; i < amountOfSquares; i++) {

		const randomPosition: Vec2 = scene.GetRandomPosition();
		const square: Rectangle = new Rectangle(randomPosition.x, randomPosition.y, 20, 20, { backgroundColor: RandomColor() });

		square.CreateStyleGroup("hover", {
			shadowBlur: 20,
			shadowColor: square.styles.backgroundColor
		});

		square.CreateStyleGroup("not-hover", {
			shadowBlur: undefined,
			shadowColor: undefined
		});

		square.AddEventListener("mouseEnter", ev => square.UseStyleGroup("hover"));
		square.AddEventListener("mouseOut", ev => square.UseStyleGroup("not-hover"));

		square.AddEventListener("mouseDown", function () {

			camera.Focus(square, RandomIntBetween(1, 20) / 10, null, {
				animationName: "easeOutExpo",
				animationDuration: 1000
			});
		});

		renderer.Add(square);
	}

	createCenterGrid();

	looper.Trigger();
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup)