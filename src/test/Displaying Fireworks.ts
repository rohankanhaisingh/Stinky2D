/**
 * Fireworks
 * by Rohan Kanhaisingh
 * 
 * ----------------------------
 * 
 * Just some fireworks
 */
import { Renderer, Scene, Looper, Camera, LooperOnUpdateEvent, ColorCodes, Rectangle, Collection, RandomColor, RandomIntBetween, Vec2, CalculateAtan, WaitFor, Circle, AnimateInteger } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();

const rockets: Collection<FireworkRocket> = new Collection<FireworkRocket>();
const particles: Collection<Particle> = new Collection<Particle>();

class Particle {

	declare public x: number;
	declare public y: number;

	declare public velocityX: number;
	declare public velocityY: number;

	declare public size: number;

	declare public timeOfEmit: number;
	declare public duration: number;

	declare public geometry: Rectangle;

	
	constructor(position: Vec2, velocity: Vec2, color: string, size: number, duration: number) {

		this.x = position.x;
		this.y = position.y;

		this.velocityX = velocity.x;
		this.velocityY = velocity.y;

		this.size = size;

		this.timeOfEmit = Date.now();
		this.duration = duration;

		this.geometry = new Rectangle(position.x, position.y, size, size, {
			backgroundColor: color,
		});

		this.geometry.velocityX = velocity.x;
		this.geometry.velocityY = velocity.y;

		renderer.Add(this.geometry);
		particles.Add(this);
	}

	public Update(deltaTime: number) {

		const geometry: Rectangle = this.geometry;
		const now: number = Date.now();

		if (now <= this.timeOfEmit + this.duration) {

			const opacity: number = 1 / this.duration * (now - this.timeOfEmit);

			geometry.velocityY += 0.01 * deltaTime;

			geometry.styles.opacity = parseFloat((1 - opacity).toFixed(2));

			geometry.x += geometry.velocityX;
			geometry.y += geometry.velocityY;
		} else {

	
			this.Destroy();
		}
 	}

	public Destroy() {

		renderer.Destroy(this.geometry);
		particles.Delete(this);
	}
}

class FireworkRocket {

	declare public x: number;
	declare public y: number;

	declare public velocityX: number;
	declare public velocityY: number;

	declare public geometry: Circle;

	declare public timeOfLaunch: number;
	declare public launchDuration: number;

	constructor(x: number, y: number) {

		this.x = x;
		this.y = y;

		this.velocityX = RandomIntBetween(-5, 5);
		this.velocityY = RandomIntBetween(-15, -10);

		this.geometry = new Circle(x, y, 1, 0, 360, false, {
			backgroundColor: ColorCodes.BRONZE
		});

		this.geometry.velocityX = this.velocityX;
		this.geometry.velocityY = this.velocityY;

		this.timeOfLaunch = Date.now();
		this.launchDuration = RandomIntBetween(10, 20) * 100;

		AnimateInteger(1, 3, "easeOutQuad", this.launchDuration, size => this.geometry.radius = size);

		renderer.Add(this.geometry);
		rockets.Add(this);
	}

	public Update(deltaTime: number) {

		const now: number = Date.now();
		const geometry: Circle = this.geometry;

		if (now <= this.timeOfLaunch + this.launchDuration) {

			new Particle(new Vec2(this.geometry.x, this.geometry.y), new Vec2(RandomIntBetween(-10, 10) / 100, .1), ColorCodes.BRONZE, 2, 1000);

			this.velocityY += .1 * deltaTime;

			this.geometry.x += this.velocityX * deltaTime;
			this.geometry.y += this.velocityY * deltaTime;
		} else {

			//for (let i = 0; i < 40; i++) {

			//	const velocity: Vec2 = new Vec2(RandomIntBetween(-10, 10), RandomIntBetween(-10, 10));
				
			//	const direction = CalculateAtan(this.geometry.x, this.geometry.y, geometry.x + velocity.x, geometry.y + velocity.y).multiply(RandomIntBetween(1, 100) / 50);

			//	new Particle(new Vec2(this.geometry.x, this.geometry.y), new Vec2(direction.x, direction.y), ColorCodes.BLUE, 1, 700);
			//	new Particle(new Vec2(this.geometry.x, this.geometry.y), new Vec2(direction.x, direction.y), ColorCodes.BRONZE, 1, 1000);
			//}

			this.Destroy();
		}

	}

	public Destroy() {

		renderer.Destroy(this.geometry);
		rockets.Delete(this);
	}
}

function render(event: LooperOnUpdateEvent) {

	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.BLACK);
	renderer.RenderObjectsInCamera(event.deltaTime);

	rockets.ForEach(function (rocket: FireworkRocket) {

		rocket.Update(event.deltaTime);
	});

	particles.ForEach(function (particle: Particle) {

		particle.Update(event.deltaTime);
	});
}

async function setup() {

	looper.Trigger();
	 
	for (let i = 0; i < 200; i++) {

		new FireworkRocket(innerWidth / 2, innerHeight - 10);

		await WaitFor(10);
	}
}

looper.AddEventListener("update", render);
window.addEventListener("load", setup);