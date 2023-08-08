import { Scene, Renderer, Camera, Looper, SpritesheetController, Rectangle, LooperOnUpdateEvent, ColorCodes, LoadImageSync, RandomIntBetween, AnimateInteger } from "../index";

const scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement);
const renderer = new Renderer(scene);
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

async function render(event: LooperOnUpdateEvent) {

	renderer.ClearScene();
	
	renderer.RenderObjectsInCamera(event.deltaTime);
	updateDomElements();
}

function createQuestionButton(x: number, y: number, textures: HTMLImageElement[]) {

	const buttonWidth = 365;
	const buttonHeight = 145;

	const rect = renderer.Add(new Rectangle(x - (buttonWidth / 2), y, buttonWidth, buttonHeight, {
		backgroundImage: textures[0],
		imageSmoothingEnabled: false,
		shadowColor: "#1d1d1d",
	})) as Rectangle;

	rect.AddEventListener("mouseEnter", function (event) {

		event.target.styles.shadowBlur = 2;
		event.target.styles.shadowOffsetX = -10;
		event.target.styles.shadowOffsetY = 10;
	});

	rect.AddEventListener("mouseOut", function (event) {

		event.target.styles.shadowBlur = 0;
		event.target.styles.shadowOffsetX = 0;
		event.target.styles.shadowOffsetY = 0;
	});

	const spritesheetController = new SpritesheetController(textures, rect);

	spritesheetController.duration = 800;
	spritesheetController.loop = true;

}

async function main() {	

	const textures: HTMLImageElement[] = [
		await LoadImageSync("../res/textures/button_frame_01.png"),
		await LoadImageSync("../res/textures/button_frame_02.png"),
		await LoadImageSync("../res/textures/button_frame_03.png"),
		await LoadImageSync("../res/textures/button_frame_04.png"),
	];

	const questionTextures: HTMLImageElement[] = [
		await LoadImageSync("../res/textures/question_1_frame_01.png"),
		await LoadImageSync("../res/textures/question_1_frame_02.png"),
	];

	const question = new Rectangle(innerWidth / 2 - (540 / 2), 100, 540, 240, {
		backgroundImage: questionTextures[0]
	});

	const questionSpritesheetController = new SpritesheetController(questionTextures, question);
	questionSpritesheetController.duration = 500;
	questionSpritesheetController.loop = true;

	renderer.Add(question);

	const button1 = createQuestionButton(innerWidth / 2, 400, textures);

	scene.domElement.style.backgroundImage = "url(https://i.pinimg.com/originals/0b/41/25/0b41253a4041ddb57004d633e4979430.jpg)";
	scene.domElement.style.backgroundSize = "100% 100%";

	looper.AddEventListener("update", render).Trigger();
}

window.addEventListener("load", main);