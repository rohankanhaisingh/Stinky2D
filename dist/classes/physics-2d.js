"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigidBody2D = exports.PhysicsWorld2D = void 0;
const math_1 = require("../functions/math");
const uid_1 = require("../functions/uid");
const planck_js_1 = require("planck-js");
const rectangle_1 = require("./rectangle");
class PhysicsWorld2D {
    constructor() {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.gravity = 10;
        this.rigidBodies = [];
        this.world = new planck_js_1.World();
    }
    Update(deltaTime) {
        for (let i = 0; i < this.rigidBodies.length; i++) {
            const rigidBody = this.rigidBodies[i];
            rigidBody.Update();
        }
        this.world.step(1 / 60);
    }
    SetGravity(horizontalGravityForce, verticalGravityForce) {
        this.world.setGravity(new planck_js_1.Vec2(horizontalGravityForce, verticalGravityForce));
    }
}
exports.PhysicsWorld2D = PhysicsWorld2D;
class RigidBody2D {
    constructor(physicsWorld2D, renderObject, fixtureOptions) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        const renderObjectPosition = renderObject.GetPosition().SaveConvertPixelsToMeters();
        this.physicsWorld2D = physicsWorld2D;
        this.body = new planck_js_1.Body(physicsWorld2D.world);
        this.renderObject = renderObject;
        this.body.setPosition(new planck_js_1.Vec2(renderObjectPosition.x, renderObjectPosition.y));
        if (renderObject instanceof rectangle_1.Rectangle) {
            const rectangleCenter = new planck_js_1.Vec2(renderObject.x + (renderObject.width / 2), renderObject.y + (renderObject.height / 2));
            this.shape = new planck_js_1.Box(renderObject.width, renderObject.height, rectangleCenter, 0);
        }
        this.fixture = new planck_js_1.Fixture(this.body, this.shape, Object.assign({}, fixtureOptions));
        physicsWorld2D.rigidBodies.push(this);
    }
    SetDynamic() {
        this.body.setDynamic();
        return this;
    }
    SetFixture(fixtureDef) {
        this.fixture = new planck_js_1.Fixture(this.body, this.shape, fixtureDef);
        return this;
    }
    ApplyCenterForce(x, y) {
        this.body.applyForceToCenter(new planck_js_1.Vec2(x, y));
        return this;
    }
    Update() {
        const position = this.body.getPosition(), angle = this.body.getAngle(), convertedPosition = new math_1.Vec2(position.x, position.y).SaveConvertMetersToPixels();
        this.renderObject.x = convertedPosition.x;
        this.renderObject.y = convertedPosition.y;
    }
}
exports.RigidBody2D = RigidBody2D;
