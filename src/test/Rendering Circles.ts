import { Renderer, Looper, Camera, Scene, Circle, Vec2, RandomIntBetween, RandomColor, LooperOnUpdateEvent, RenderObjectMouseWheelEvent } from "..";

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
	renderer.RenderObjectsInCamera(event.deltaTime);
	
	updateDomElements();
}

function setup() {

	for (let i = 0; i < 100; i++) {

		const randomPosition: Vec2 = new Vec2(RandomIntBetween(0, scene.width), RandomIntBetween(0, scene.height)),
			randomSize: number = RandomIntBetween(1, 40),
			randomAnimationDuration: number = RandomIntBetween(1000, 10000),
			randomColor: string = RandomColor();

		const circle = new Circle(randomPosition.x, randomPosition.y, 0, 0, 360, false, { backgroundColor: randomColor });

		circle.ConfigureDragging(scene, "offset", "left");
		circle.EnableDragging();

		circle.AddEventListener("mouseWheel", function (ev: RenderObjectMouseWheelEvent) {

			if (ev.mouse.wheelDirection === "up") {

				circle.radius += 10;
			} else {

				circle.radius -= 10;
			}
		});

		circle.AnimateCurrentRadius(randomSize, "easeOutExpo", randomAnimationDuration);

		renderer.Add(circle);

	}

	looper.Trigger();
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup)