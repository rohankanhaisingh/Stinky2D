import { Renderer, Scene, Looper, Camera, LooperTickState, ColorCodes, LoadImageSync, Rectangle, TextNode, RandomIntBetween, RandomColor } from "../index";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene, { alpha: true, willReadFrequently: true });
const camera = new Camera(renderer, scene);
const looper = new Looper();

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

function createQuestion() {

	const text = new TextNode("Is obama zwart??????", innerWidth / 2, 126, 10, 10, {
		textAlign: "center",
		textColor: "#000",
		font: "40px Montserrat"
	});

	renderer.Add(text);
}

async function createButton(x: number, y: number, answer: string) {

	const texture = await LoadImageSync("../res/textures/knop_achtergrond.png");
	const texture_hover = await LoadImageSync("../res/textures/knop_achtergrond_nig.png");

	const button = new Rectangle(x, y, 360, 170, {
		backgroundImage: texture
	});

	button.AddEventListener("mouseEnter", function () {
		button.styles.backgroundImage = texture_hover;
	});

	button.AddEventListener("mouseOut", function () {
		button.styles.backgroundImage = texture;
	});

	button.AddEventListener("mouseDown", function () {
		button.AnimateCurrentPosition({
			x: RandomIntBetween(0, scene.width),
			y: RandomIntBetween(0, scene.height)
		}, "easeInOutExpo", 1000);
	});

	const answerTextNode = new TextNode(answer, x + (360 / 2), y + (170 / 2), 10, 10, {
		textAlign: "center",
		textColor: ColorCodes.BLACK,
		font: "70px 'Cabin Sketch'"
	});

	renderer.Add(button);
	renderer.Add(answerTextNode);
}


looper.AddEventListener("update", function (state: LooperTickState) {

	renderer.ClearScene();
	updateDomElements();

	renderer.RenderObjectsInCamera(state.deltaTime);
});

window.addEventListener("load", function () {

	createQuestion();


	for (let i = 0; i < 5; i++) {

		const x = RandomIntBetween(0, scene.width);
		const y = RandomIntBetween(0, scene.height);

		createButton(x, y, "yes");

	}

	looper.Trigger();

});