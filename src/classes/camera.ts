import { Easings } from "../functions/easings";
import { CameraConstructor, EasingName, RendererConstructor, SceneConstructor, Vector2 } from "../typings";
import { Renderer } from "./renderer";
import { Scene } from "./scene";

export class Camera implements CameraConstructor {

	public x = 0;
	public y = 0;
	public scaleX = 1;
	public scaleY = 1;
	public width = innerWidth;
	public height = innerHeight;
	public offScreenRendering = false;

	public lastOffset = {
		x: 0,
		y: 0
	}

	declare public renderer: Renderer | RendererConstructor;
	declare public scene: Scene | SceneConstructor;
	declare public ctx: CanvasRenderingContext2D;

	/**
	 * This camera class allows you to render graphical components located at off-screen coordinates.
	 * @param renderer Renderer class used to project the view
	 * @param scene Scene classes used to determine the dimensions of the screen
	 */
	constructor(renderer: Renderer | RendererConstructor, scene: Scene | SceneConstructor) {

		this.renderer = renderer;
		this.scene = scene;
		this.ctx = renderer.context;

		renderer.camera = this;
	}

	/**
	 * Sets the camera offset, no idea why you need this but it's there :).
	 * @param x
	 * @param y
	 */
	public SetOffset(x: number | null, y: number | null): Camera {

		if (typeof x === "number") {

			this.lastOffset.x = this.x;

			this.x = -x;
		}

		if (typeof y === "number") {

			this.lastOffset.y = this.y;

			this.x = -y;
		}

		return this;
	}

	/**
	 * Animates the camera position from one position to another 
	 * @param from Starting position
	 * @param to Ending position
	 * @param easing Animation type
	 * @param duration Duration of animation
	 */
	public AnimatePosition(from: Vector2, to: Vector2, easing: EasingName, duration: number): Camera {

		if (typeof this.y !== "number") throw new Error("Cannot animate y-axis of object as it does not exist or is not a number.");
		if (typeof this.x !== "number") throw new Error("Cannot animate x-axis of object as it does not exist or is not a number.");

		const now: number = Date.now();

		const startX = from.x;
		const startY = from.y;

		const updateTick = () => {
			const elapsedTime: number = Date.now() - now;

			const animatedX: number = Easings[easing](elapsedTime, 0, to.x - startX, duration);
			const animatedY: number = Easings[easing](elapsedTime, 0, to.y - startY, duration);

			this.x = startX + animatedX;
			this.y = startY + animatedY;

			if (elapsedTime < duration) window.requestAnimationFrame(updateTick);
		}

		updateTick();

		return this;
	}

	/**
	 * Animates the position of this object to another specific y position.
	 * @param to Positions where the animation ends.
	 * @param easing Easing type.
	 * @param duration Duration of the animation.
	 */
	public AnimateCurrentPosition(to: Vector2, easing: EasingName, duration: number): Camera {

		if (typeof this.y !== "number") throw new Error("Cannot animate y-axis of object as it does not exist or is not a number.");
		if (typeof this.x !== "number") throw new Error("Cannot animate x-axis of object as it does not exist or is not a number.");

		const now: number = Date.now();

		const startX = this.x;
		const startY = this.y;

		const updateTick = () => {
			const elapsedTime: number = Date.now() - now;

			const animatedX: number = Easings[easing](elapsedTime, 0, to.x - startX, duration);
			const animatedY: number = Easings[easing](elapsedTime, 0, to.y - startY, duration);

			this.x = startX + animatedX;
			this.y = startY + animatedY;

			if (elapsedTime < duration) window.requestAnimationFrame(updateTick);
		}

		updateTick();
		return this;
	}

	/**
	 * Animates the scaling of this object to another specific y position.
	 * @param to Scaleing where the animation ends.
	 * @param easing Easing type.
	 * @param duration Duration of the animation.
	 */
	public AnimateCurrentScaling(to: Vector2, easing: EasingName, duration: number): Camera {

		if (typeof this.y !== "number") throw new Error("Cannot animate y-axis of object as it does not exist or is not a number.");
		if (typeof this.x !== "number") throw new Error("Cannot animate x-axis of object as it does not exist or is not a number.");

		const now: number = Date.now();

		const startX = this.scaleX;
		const startY = this.scaleY;

		const updateTick = () => {
			const elapsedTime: number = Date.now() - now;

			const animatedX: number = Easings[easing](elapsedTime, 0, to.x - startX, duration);
			const animatedY: number = Easings[easing](elapsedTime, 0, to.y - startY, duration);

			this.scaleX = startX + animatedX;
			this.scaleY = startY + animatedY;

			if (elapsedTime < duration) window.requestAnimationFrame(updateTick);
		}

		updateTick();
		return this;
	}

}