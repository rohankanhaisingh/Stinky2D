import { Vec2 } from "../functions/math";
import { RigidBody2DConstructor } from "../typings";
import { RenderObject } from "./renderobject";
export declare class RigidBody2D implements RigidBody2DConstructor {
    id: string;
    timestamp: number;
    renderObject: RenderObject;
    position: Vec2;
    velocity: Vec2;
    acceleration: Vec2;
    mass: number;
    constructor(renderObject: RenderObject, mass: number);
}
