import { Renderer, Scene, Looper, Camera, ColorCodes, LooperOnUpdateEvent, PhysicsWorld2D, Rectangle, RigidBody2D } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

const world: PhysicsWorld2D = new PhysicsWorld2D();

world.SetGravity(0, -50);

const ground = new Rectangle((innerWidth / 2) - 200, innerHeight - 300, 400, 40, { backgroundColor: ColorCodes.BLACKBERRY });
const box = new Rectangle(scene.Center().x, scene.Center().y, 50, 50, { backgroundColor: "red" });

const groundRigidBody: RigidBody2D = new RigidBody2D(world, ground, { density: 1 })
	.ApplyCenterForce(0, 10);

const boxRigidBody: RigidBody2D = new RigidBody2D(world, box, {density: 1})
	.SetDynamic()
	.ApplyCenterForce(0, 10);

renderer.Add(box);
renderer.Add(ground);

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
	renderer.PaintScene(ColorCodes.WHITE);

	renderer.RenderObjectsInCamera(event.deltaTime);
	world.Update(event.deltaTime);

	updateDomElements();
}
function setup() {

	looper.Trigger();
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup);