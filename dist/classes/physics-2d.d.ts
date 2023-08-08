import { PhysicsWorld2DConstructor, RigidBody2DConstructor } from "../typings";
import { RenderObject } from "./renderobject";
import { Body, World, Circle, Box, Fixture, FixtureOpt } from "planck-js";
export declare class PhysicsWorld2D implements PhysicsWorld2DConstructor {
    id: string;
    timestamp: number;
    gravity: number;
    rigidBodies: RigidBody2D[];
    world: World;
    constructor();
    Update(deltaTime: number): void;
    SetGravity(horizontalGravityForce: number, verticalGravityForce: number): void;
}
export declare class RigidBody2D implements RigidBody2DConstructor {
    id: string;
    timestamp: number;
    renderObject: RenderObject;
    physicsWorld2D: PhysicsWorld2D;
    body: Body;
    shape: Box | Circle;
    fixture: Fixture;
    constructor(physicsWorld2D: PhysicsWorld2D, renderObject: RenderObject, fixtureOptions?: FixtureOpt);
    SetDynamic(): RigidBody2D;
    SetFixture(fixtureDef: FixtureOpt): RigidBody2D;
    ApplyCenterForce(x: number, y: number): this;
    Update(): void;
}
