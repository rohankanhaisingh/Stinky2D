import { Camera, Looper, Renderer, Scene, LooperOnUpdateEvent, RandomIntBetween, Rectangle, RandomColor, GetKeyDown } from "../";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]),
	renderer: Renderer = new Renderer(scene, { willReadFrequently: true }),
	camera: Camera = new Camera(renderer, scene),
	looper: Looper = new Looper();

let player: Rectangle | null;

function render(event: LooperOnUpdateEvent) {

	renderer.ClearScene();
	renderer.RenderObjectsInCamera(0).duration;

	if (player === null) return;

	if (GetKeyDown("w")) player.y -= 10;
	if (GetKeyDown("s")) player.y += 10;
	if (GetKeyDown("d")) player.x += 10;
	if (GetKeyDown("a")) player.x -= 10;

	camera.Focus(player, 0, 0);
}

function setup() {

	// Generate random tiles across the scene
	const amountOfTiles: number = 2000;

	for (let i = 0; i < amountOfTiles; i++) {

		const randomPosition = scene.GetRandomPosition().MultiplyScalar(10);

		const rectangle = new Rectangle(0, 0, 20, 20, {
			backgroundColor: RandomColor()
		});

		rectangle.SetPosition(randomPosition.x, randomPosition.y);

		renderer.Add(rectangle);
	}

	// Create player
	player = new Rectangle(scene.Center().x, scene.Center().y, 20, 20, {
		backgroundColor: "#000",
		borderWidth: 5,
		borderColor: "gray",
		shadowColor: "rgba(0, 0, 0, .4)",
		shadowOffsetX: -3,
		shadowOffsetY: 3,
		shadowBlur: 5
	});

	renderer.Add(player);

	looper.AddEventListener("update", render).Trigger();

}

window.addEventListener("load", setup);