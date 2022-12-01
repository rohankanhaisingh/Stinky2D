import { Renderer, Scene, Camera, Looper, Rectangle, ColorCodes, LooperTickState } from "../index";

async function main(): Promise<void> {

	const scene = new Scene(innerWidth, innerHeight, document.body, ["keepSizeToWindow", "disableContextMenu"]);
	const renderer = new Renderer(scene, {
		alpha: true,
		willReadFrequently: true
	});
	const camera = new Camera(renderer, scene);
	const looper = new Looper();

	const myEpicRectangle = new Rectangle(200, 200, 200, 200, {
		backgroundColor: ColorCodes.SEA_PINK
	});

	renderer.Add(myEpicRectangle);

	myEpicRectangle.ConfigureDragging(scene, "offset", "left");
	myEpicRectangle.EnableDragging();

	myEpicRectangle.AnimateCurrentXPosition(1200, "easeInOutExpo", 1000);

	looper.AddEventListener("update", function (state: LooperTickState) {

		renderer.ClearScene();



		renderer.RenderObjectsInCamera(state.deltaTime);
	});

	looper.Trigger();
}

main();