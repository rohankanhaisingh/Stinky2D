// Testing

import { Camera, ColorCodes, EasingName, Looper, LooperTickState, RandomColor, RandomIntBeween, Rectangle, Renderer, RenderObject, Scene, WaitFor } from "../index";

async function main(): Promise<void> {

	const scene = new Scene(innerWidth, innerHeight, document.body);
	const renderer = new Renderer(scene);
	const camera = new Camera(renderer, scene);
	const looper = new Looper();

	scene.SetAttribute("keepSizeToWindow");
	scene.SetAttribute("disableContextMenu");

	let backgroundColor = ColorCodes.BLACK;


	looper.AddEventListener("update", function (event: LooperTickState) {

		if (event.deltaTime < 0) return;

		renderer.ClearScene();
		renderer.PaintScene(backgroundColor);

		renderer.RenderObjectsInCamera(event.deltaTime);
	});

	looper.Trigger();

	for (var i = 0; i < 1; i++) {

		const xPos: number = RandomIntBeween(0, innerWidth);
		const yPos: number = RandomIntBeween(0, innerHeight);

		
		const color: string = RandomColor();
		const size: number = RandomIntBeween(50, 50);

		const rect = new Rectangle(xPos, yPos, size, size, {
			backgroundColor: color,
		});

		rect.AddEventListener("mouseEnter", function () {

		});

		rect.ConfigureDragging(scene, "offset", "left");
		rect.EnableDragging();

		renderer.Add(rect);

		RenderObject.AnimateNumber(0, RandomIntBeween(0, 360), "easeInOutExpo", 2000, val => rect.rotation = val);


		await WaitFor(10);
	}

	return;
}

window.addEventListener("load", main);