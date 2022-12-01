import { Scene, Camera, Renderer, Looper, ColorCodes, LooperTickState, Rectangle, MouseMoveObject, RenderObject } from "../index";

const scene = new Scene(innerWidth, innerHeight, document.body);
const renderer = new Renderer(scene);
const camera = new Camera(renderer, scene);
const looper = new Looper();

scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");

const sceneWidth = 1430;
const sceneHeight = 820;

function createPlayers() {

	const playerWidth: number = 15;
	

	const player1 = new Rectangle(playerWidth, sceneHeight / 2, playerWidth, 120, {
		backgroundColor: ColorCodes.BLACK
	});

	const player2 = new Rectangle(sceneWidth - (playerWidth * 2), sceneHeight / 2, playerWidth, 120, {
		backgroundColor: ColorCodes.BLACK
	});


	renderer.Add(player1).Add(player2);
}

function createScene() {

	const sceneBorder = new Rectangle(0, 0, sceneWidth, sceneHeight, {
		borderColor: ColorCodes.BLACK,
		borderWidth: 1
	});

	sceneBorder.forceRendering = true;

	renderer.Add(sceneBorder);
}

function resetCameraToCenter() {

	const screenCenterX = innerWidth / 2;
	const screenCenterY = innerHeight / 2;

	const sceneCenterX = (sceneWidth / 2) * camera.scaleX;
	const sceneCenterY = (sceneHeight / 2) * camera.scaleX;

	console.log(-(screenCenterY - sceneCenterY));
	
	camera.x = (screenCenterX - sceneCenterX);
	camera.y = (screenCenterY - sceneCenterY);

	//RenderObject.AnimateNumber(.1, 1, "easeInOutExpo", 1000, function (val: number) {

	//	camera.scaleX = val;
	//	camera.scaleY = val;
	//});

	//setTimeout(function () {

	//	camera.AnimateCurrentPosition({ x: (screenCenterX - sceneCenterX), y: (screenCenterY - sceneCenterY) }, "easeInOutExpo", 1000);

	//}, 1000);
}

function main() {

	createScene();
	createPlayers();
	resetCameraToCenter();


	looper.AddEventListener("update", function (state: LooperTickState) {

		renderer.ClearScene();
		renderer.PaintScene(ColorCodes.ICE_COLD);

		renderer.RenderObjectsInCamera(state.deltaTime);
	});

	looper.Trigger();
}

main();