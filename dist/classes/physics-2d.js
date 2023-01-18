"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigidBody2D = void 0;
const math_1 = require("../functions/math");
const uid_1 = require("../functions/uid");
class RigidBody2D {
    constructor(renderObject, mass) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.renderObject = renderObject;
        this.mass = mass;
        this.position = new math_1.Vec2(renderObject.x, renderObject.y);
        this.velocity = new math_1.Vec2(0, 0);
        this.acceleration = new math_1.Vec2(0, 0);
    }
}
exports.RigidBody2D = RigidBody2D;
