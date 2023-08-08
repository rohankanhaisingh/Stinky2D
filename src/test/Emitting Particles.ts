import { Renderer, Looper, Camera, Scene, Circle, Vec2, RandomIntBetween, RandomColor, LooperOnUpdateEvent, RenderObjectMouseWheelEvent, Collection, WaitFor, CalculateAngle, CalculateAtan, OffscreenRenderer, ColorCodes, LineSystem2D, Line2D, RenderObjectStyles } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

const worms = new Collection<LineSystem2D>();


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

	const now: number = Date.now();

	worms.ForEach(function (worm: LineSystem2D) {

		worm.velocityX += RandomIntBetween(-10, 10) / 10;
		worm.velocityY += RandomIntBetween(-10, 10) / 10;

		worm.x += worm.velocityX * event.deltaTime;
		worm.y += worm.velocityY * event.deltaTime;
	});
}

function setup() {

	let angle: number = 0;

	async function spawnParticles() {

		angle += .1 * looper.deltaTime;

		const xVelocity: number = Math.cos(angle) * 1;
		const yVelocity: number = Math.sin(angle) * 1;

		const worm = new LineSystem2D(0, 0);

		const styles: RenderObjectStyles = {
			lineCap: "round",
			lineWidth: 10,
			strokeColor: RandomColor()
		};

		for (let i = 0; i < 10; i++) {

			const lineX = worm.x - (i * 10);
			const lineY = worm.y - (i * 10);

			worm.AddLine2D(new Line2D({ x: worm.x, y: worm.y }, { x: lineX, y: lineY }, { ...styles }));
		}

		worm.velocityX = xVelocity;
		worm.velocityY = yVelocity;

		worm.SetPosition(scene.Center());

		renderer.Add(worm);
		worms.Add(worm);

		await WaitFor(50);

		if (angle < 3) spawnParticles();
	}

	spawnParticles();
	looper.Trigger();
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup)