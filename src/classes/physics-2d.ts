import { Vec2 } from "../functions/math";
import { UniqueID } from "../functions/uid";
import { RigidBody2DConstructor } from "../typings";
import { RenderObject } from "./renderobject";

export class RigidBody2D implements RigidBody2DConstructor {

	public id: string = UniqueID(18).id;
	public timestamp: number = Date.now();

	declare public renderObject: RenderObject;

	declare public position: Vec2;
	declare public velocity: Vec2;
	declare public acceleration: Vec2;

	declare public mass: number;

	constructor(renderObject: RenderObject, mass: number) {

		this.renderObject = renderObject;

		this.mass = mass;

		this.position = new Vec2(renderObject.x, renderObject.y);
		this.velocity = new Vec2(0, 0);
		this.acceleration = new Vec2(0, 0);
	}
}