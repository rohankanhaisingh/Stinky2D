/*
 * 2D raining scene.
 */

import { Camera, ColorCodes, Looper, LooperTickState, MouseMoveObject, Renderer, Scene, Vec2, LineSystem2D, RenderObjectStyles, Line2D, RandomIntBetween, AnimateInterger, MouseDownObject, Vector2, WaitFor, RandomColor, Rectangle, Circle, LoadImageSync } from "../index";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene);
const camera = new Camera(renderer, scene);
const looper = new Looper();

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
		shadowBlur: 10,
		shadowColor: ColorCodes.WHITE,
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

	AnimateInterger(lineWidth, 0, "easeOutExpo", duration, width => lineSystem.SetStyleOnLines("lineWidth", width));

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

async function main<T, BruhSauce>() {

	textures.smoke = await LoadImageSync("../res/textures/smoke.png");
	textures.orb = await LoadImageSync("../res/textures/glow_orb.png");

	createLightningLoop();
	createRainFall(350);

	scene.AddEventListener("mouseDown", async function () {
		for (let i = 0; i < 5; i++) {

			createLightning(scene.mouse.x);

			await WaitFor(50);
		}
	});


	looper.AddEventListener("update", function (event: LooperTickState) {

		if (event.deltaTime < 0) return;

		renderer.ClearScene();
		renderer.PaintScene(ColorCodes.BLACK);

		renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;

		updateRainDroplets(event.deltaTime);
		updateDomElements();
	});

	looper.Trigger();
}

window.addEventListener("load", main);