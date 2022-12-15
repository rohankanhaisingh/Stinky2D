import { Easings } from "../functions/easings";
import { CircleConstructor, EasingName, RenderObjectStyles } from "../typings";
import { RenderObject } from "./renderobject";

export class Circle extends RenderObject implements CircleConstructor {

	public x = 0;
	public y = 0;
	public rotation = 0;

	declare public radius: number;
	declare public startRadian: number;
	declare public endRadian: number;
	declare public counterClockwise: boolean;

	constructor(x: number, y: number, radius: number, startRadian: number, endRadian: number, counterClockwise: boolean, styles?: RenderObjectStyles ) {
		super();

		this.x = x;
		this.y = y;
		this.radius = radius;
		this.startRadian = startRadian;
		this.endRadian = endRadian;
		this.counterClockwise = counterClockwise;

		this.styles = { ...styles };
	}
	public override Draw(ctx: CanvasRenderingContext2D): number {

		ctx.save();
		ctx.beginPath();

		RenderObject.ApplyRenderStyles(ctx, this.styles);

		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation * Math.PI / 180);

		ctx.arc(0, 0, this.radius, this.startRadian * Math.PI / 180, this.endRadian * Math.PI / 180, this.counterClockwise);

		if (typeof this.styles.backgroundColor === "string") ctx.fill();
		if (typeof this.styles.borderColor === "string") ctx.stroke();

		ctx.closePath();
		ctx.restore();
		return 0;
	}

	public AnimateCurrentStartAngle(to: number, easing: EasingName, duration: number) {

		if (typeof this.rotation !== "number") throw new Error("Cannot animate rotation of object as it does not exist or is not a number.");

		const now: number = Date.now();
		const startRadian = this.startRadian;

		const updateTick = () => {

			const elapsedTime = Date.now() - now;
			
			const easingValue: number = Easings[easing](elapsedTime, 0, to - startRadian, duration);


			this.startRadian = startRadian + easingValue;

			if (elapsedTime < duration) {
				window.requestAnimationFrame(updateTick);
			} else {
				this.endRadian = to;
			}
		}

		updateTick();

		return this;
	}

	public AnimateCurrentEndAngle(to: number, easing: EasingName, duration: number) {

		if (typeof this.rotation !== "number") throw new Error("Cannot animate rotation of object as it does not exist or is not a number.");

		const now: number = Date.now();
		const endRadian = this.endRadian;

		const updateTick = () => {

			const elapsedTime = Date.now() - now;

			const easingValue: number = Easings[easing](elapsedTime, 0, to - endRadian, duration);


			this.endRadian = endRadian + easingValue;

			if (elapsedTime < duration) {
				window.requestAnimationFrame(updateTick);
			} else {
				this.endRadian = to;
			}
		}

		updateTick();

		return this;
	}
}