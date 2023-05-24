import { Vec2 } from "../functions/math";
import { UniqueID } from "../functions/uid";
import { PhysicsWorld2DConstructor, RigidBody2DConstructor } from "../typings";
import { RenderObject } from "./renderobject";

export class PhysicsWorld2D implements PhysicsWorld2DConstructor {

	public id: string = UniqueID(18).id;
	public timestamp: number = Date.now();

	public gravity: number = 10;

	public rigidBodies: RigidBody2D[] = [];

	constructor() {

	}

	public Update(deltaTime: number): void {

		const rigidBodies: RigidBody2D[] = this.rigidBodies;

		for (let i = 0; i < rigidBodies.length; i++) {

			const rigidBody: RigidBody2D = rigidBodies[i];

			if (!rigidBody.isStatic) return;

			const rigidBodyObject: RenderObject = rigidBody.renderObject;

			rigidBodyObject.y += this.gravity * deltaTime;
		}
	}

	public AddRigidBody(rigidBody: RigidBody2D): PhysicsWorld2D {

		for (let i = 0; i < this.rigidBodies.length; i += 1) {

			const _rigidBody: RigidBody2D = this.rigidBodies[i];

			if (_rigidBody.id === rigidBody.id) {

				throw new Error("Failed to add rigidBody to physics world since it already has been added.");
			}
		}

		this.rigidBodies.push(rigidBody);

		return this;
	}
}

export class RigidBody2D implements RigidBody2DConstructor {

	public id: string = UniqueID(18).id;
	public timestamp: number = Date.now();

	declare public renderObject: RenderObject;

	declare public position: Vec2;
	declare public velocity: Vec2;
	declare public acceleration: Vec2;

	declare public mass: number;
	declare public isStatic: boolean;

	constructor(renderObject: RenderObject, mass: number, isStatic: boolean) {

		this.renderObject = renderObject;

		this.mass = mass;

		this.isStatic = true;

		this.position = new Vec2(renderObject.x, renderObject.y);
		this.velocity = new Vec2(0, 0);
		this.acceleration = new Vec2(0, 0);
	}
}