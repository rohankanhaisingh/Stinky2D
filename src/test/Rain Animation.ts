/*
 * 2D raining scene.
 */

import { Camera, ColorCodes, Looper, LooperOnUpdateEvent, MouseMoveObject, Renderer, Scene, Vec2, LineSystem2D, RenderObjectStyles, Line2D, RandomIntBetween, AnimateInteger, MouseDownObject, Vector2, WaitFor, RandomColor, Rectangle, Circle, LoadImageSync, OffscreenRenderer } from "../index";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene);
const camera = new Camera(renderer, scene);
const looper = new Looper();
const offscreenRenderer = new OffscreenRenderer();

//@ts-expect-error
window["renderer"] = renderer;

scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");

let renderDuration: number = 0;

const rainDroplets: Circle[] = [];
const smokeParticles: Rectangle[] = [];

const textures = {
	smoke: new Image(),
	orb: new Image()
};



function updateDomElements() {

	const guiFramerate = document.querySelector("#game-framerate") as HTMLDivElement;
	const guiDeltatime = document.querySelector("#game-deltatime") as HTMLDivElement;
	const guiRenderObjects = document.querySelector("#game-renderobjects") as HTMLDivElement;
	const guiVisibleRenderObjects = document.querySelector("#game-visible_renderobjects") as HTMLDivElement;
	const guiRenderDuration =document.querySelector("#game-render_duration") as HTMLDivElement;

	guiFramerate.innerText = "Framerate: " + looper.frameRate.toString() + "fps";
	guiDeltatime.innerText = "Delta time: " + looper.deltaTime.toFixed(2) + "ms";
	guiRenderObjects.innerText = "Render objects: " + renderer.renderObjects.length.toString();
	guiVisibleRenderObjects.innerText = "Visible render objects: " + renderer.visibleRenderObjects.length.toString();
	guiRenderDuration.innerText = "Render time: " + renderDuration.toString() + " ms";
}


async function createLightning(x: number) {

	const startPosition = new Vec2(x, 10);
	const endPosition = new Vec2(x, scene.height - 10);

	const roughness = RandomIntBetween(5, 40);
	const duration = RandomIntBetween(300, 2000);

	const segmentLength = 20;
	const segmentDistance = (endPosition.y - startPosition.y) / segmentLength;

	const lineWidth = RandomIntBetween(5, 15);

	let lastPosition = new Vec2(startPosition.x + RandomIntBetween(-roughness, roughness), 0);
	let newPosition = new Vec2(startPosition.x + RandomIntBetween(-roughness, roughness), segmentDistance);

	const lineSystem = new LineSystem2D(0, 0);
	const lineStyles: RenderObjectStyles = {
		strokeColor: ColorCodes.WHITE,
		lineWidth: lineWidth,
		lineCap: "round"
	};

	renderer.Add(lineSystem);

	for (let i = 0; i < segmentLength; i++) {

		const line = new Line2D(lastPosition, newPosition, lineStyles);

		lineSystem.AddLine2D(line);

		lastPosition = newPosition;
		newPosition = new Vec2(startPosition.x + RandomIntBetween(-roughness, roughness), lastPosition.y + segmentDistance);

		await WaitFor(1);
	}

	AnimateInteger(lineWidth, 0, "easeOutExpo", duration, width => lineSystem.SetStyleOnLines("lineWidth", width));

	setTimeout(function () {

		lineSystem.DestroyAllLines();
		renderer.Destroy(lineSystem);

	}, duration);
}

function resetDroplet(droplet: Circle) {

	droplet.x = RandomIntBetween(0, scene.width);
	droplet.y = RandomIntBetween(-10, scene.height / 2);
}

function updateRainDroplets(deltaTime: number) {

	for (let i = 0; i < rainDroplets.length; i++) {

		const droplet: Circle = rainDroplets[i];

		droplet.x += 1 * deltaTime;
		droplet.y += 40 * deltaTime;


		if (droplet.y > scene.height) resetDroplet(droplet);
		if (droplet.x > scene.width) resetDroplet(droplet);
	}

}

function createRainFall(amount: number) {

	for (let i = 0; i < amount; i++) {

		const x = RandomIntBetween(0, scene.width);
		const y = RandomIntBetween(0, scene.height);

		const dropletRadius = 1;

		const droplet = new Circle(x, y, dropletRadius, 0, 360, false, {
			backgroundColor: "#5499f2"
		});

		rainDroplets.push(droplet);

		renderer.Add(droplet);
	}
}

async function createLightningLoop() {

	createLightning(RandomIntBetween(0, scene.width));

	await WaitFor(RandomIntBetween(1, 3) * 1000);

	createLightningLoop();
}

async function main() {

	offscreenRenderer.SetDynamicScalingFactor(renderer, 1);
	offscreenRenderer.UseGlowEffect(10, 4);


	createLightningLoop();
	createRainFall(350);

	scene.AddEventListener("mouseDown", async function () {
		for (let i = 0; i < 5; i++) {

			createLightning(scene.mouse.x);

			await WaitFor(50);
		}
	});


	looper.AddEventListener("update", function (event: LooperOnUpdateEvent) {

		if (event.deltaTime < 0) return;

		renderer.ClearScene();
		renderer.PaintScene(ColorCodes.BLACK);

		renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;

		updateRainDroplets(event.deltaTime);
		updateDomElements();

		offscreenRenderer.CreateTexture(renderer);
		renderer.RenderCopiedTexture(offscreenRenderer, { opacity: 1 });

	});

	looper.Trigger();
}

window.addEventListener("load", main);