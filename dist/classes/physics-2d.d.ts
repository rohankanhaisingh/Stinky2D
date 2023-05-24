import { Vec2 } from "../functions/math";
import { PhysicsWorld2DConstructor, RigidBody2DConstructor } from "../typings";
import { RenderObject } from "./renderobject";
export declare class PhysicsWorld2D implements PhysicsWorld2DConstructor {
    id: string;
    timestamp: number;
    gravity: number;
    rigidBodies: RigidBody2D[];
    constructor();
    Update(deltaTime: number): void;
    AddRigidBody(rigidBody: RigidBody2D): PhysicsWorld2D;
}
export declare class RigidBody2D implements RigidBody2DConstructor {
    id: string;
    timestamp: number;
    renderObject: RenderObject;
    position: Vec2;
    velocity: Vec2;
    acceleration: Vec2;
    mass: number;
    isStatic: boolean;
    constructor(renderObject: RenderObject, mass: number, isStatic: boolean);
}
