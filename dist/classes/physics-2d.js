"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigidBody2D = exports.PhysicsWorld2D = void 0;
const math_1 = require("../functions/math");
const uid_1 = require("../functions/uid");
class PhysicsWorld2D {
    constructor() {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.gravity = 10;
        this.rigidBodies = [];
    }
    Update(deltaTime) {
        const rigidBodies = this.rigidBodies;
        for (let i = 0; i < rigidBodies.length; i++) {
            const rigidBody = rigidBodies[i];
            if (!rigidBody.isStatic)
                return;
            const rigidBodyObject = rigidBody.renderObject;
            rigidBodyObject.y += this.gravity * deltaTime;
        }
    }
    AddRigidBody(rigidBody) {
        for (let i = 0; i < this.rigidBodies.length; i += 1) {
            const _rigidBody = this.rigidBodies[i];
            if (_rigidBody.id === rigidBody.id) {
                throw new Error("Failed to add rigidBody to physics world since it already has been added.");
            }
        }
        this.rigidBodies.push(rigidBody);
        return this;
    }
}
exports.PhysicsWorld2D = PhysicsWorld2D;
class RigidBody2D {
    constructor(renderObject, mass, isStatic) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.renderObject = renderObject;
        this.mass = mass;
        this.isStatic = true;
        this.position = new math_1.Vec2(renderObject.x, renderObject.y);
        this.velocity = new math_1.Vec2(0, 0);
        this.acceleration = new math_1.Vec2(0, 0);
    }
}
exports.RigidBody2D = RigidBody2D;
