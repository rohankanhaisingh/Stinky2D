"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Fireworks
 * by Rohan Kanhaisingh
 *
 * ----------------------------
 *
 * Just some fireworks
 */
const __1 = require("..");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"), ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer = new __1.Renderer(scene, { willReadFrequently: true });
const camera = new __1.Camera(renderer, scene);
const looper = new __1.Looper();
const rockets = new __1.Collection();
const particles = new __1.Collection();
class Particle {
    constructor(position, velocity, color, size, duration) {
        this.x = position.x;
        this.y = position.y;
        this.velocityX = velocity.x;
        this.velocityY = velocity.y;
        this.size = size;
        this.timeOfEmit = Date.now();
        this.duration = duration;
        this.geometry = new __1.Rectangle(position.x, position.y, size, size, {
            backgroundColor: color,
        });
        this.geometry.velocityX = velocity.x;
        this.geometry.velocityY = velocity.y;
        renderer.Add(this.geometry);
        particles.Add(this);
    }
    Update(deltaTime) {
        const geometry = this.geometry;
        const now = Date.now();
        if (now <= this.timeOfEmit + this.duration) {
            const opacity = 1 / this.duration * (now - this.timeOfEmit);
            geometry.velocityY += 0.01 * deltaTime;
            geometry.styles.opacity = parseFloat((1 - opacity).toFixed(2));
            geometry.x += geometry.velocityX;
            geometry.y += geometry.velocityY;
        }
        else {
            this.Destroy();
        }
    }
    Destroy() {
        renderer.Destroy(this.geometry);
        particles.Delete(this);
    }
}
class FireworkRocket {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = (0, __1.RandomIntBetween)(-5, 5);
        this.velocityY = (0, __1.RandomIntBetween)(-15, -10);
        this.geometry = new __1.Circle(x, y, 1, 0, 360, false, {
            backgroundColor: __1.ColorCodes.BRONZE
        });
        this.geometry.velocityX = this.velocityX;
        this.geometry.velocityY = this.velocityY;
        this.timeOfLaunch = Date.now();
        this.launchDuration = (0, __1.RandomIntBetween)(10, 20) * 100;
        (0, __1.AnimateInteger)(1, 3, "easeOutQuad", this.launchDuration, size => this.geometry.radius = size);
        renderer.Add(this.geometry);
        rockets.Add(this);
    }
    Update(deltaTime) {
        const now = Date.now();
        const geometry = this.geometry;
        if (now <= this.timeOfLaunch + this.launchDuration) {
            new Particle(new __1.Vec2(this.geometry.x, this.geometry.y), new __1.Vec2((0, __1.RandomIntBetween)(-10, 10) / 100, .1), __1.ColorCodes.BRONZE, 2, 1000);
            this.velocityY += .1 * deltaTime;
            this.geometry.x += this.velocityX * deltaTime;
            this.geometry.y += this.velocityY * deltaTime;
        }
        else {
            //for (let i = 0; i < 40; i++) {
            //	const velocity: Vec2 = new Vec2(RandomIntBetween(-10, 10), RandomIntBetween(-10, 10));
            //	const direction = CalculateAtan(this.geometry.x, this.geometry.y, geometry.x + velocity.x, geometry.y + velocity.y).multiply(RandomIntBetween(1, 100) / 50);
            //	new Particle(new Vec2(this.geometry.x, this.geometry.y), new Vec2(direction.x, direction.y), ColorCodes.BLUE, 1, 700);
            //	new Particle(new Vec2(this.geometry.x, this.geometry.y), new Vec2(direction.x, direction.y), ColorCodes.BRONZE, 1, 1000);
            //}
            this.Destroy();
        }
    }
    Destroy() {
        renderer.Destroy(this.geometry);
        rockets.Delete(this);
    }
}
function render(event) {
    renderer.ClearScene();
    renderer.PaintScene(__1.ColorCodes.BLACK);
    renderer.RenderObjectsInCamera(event.deltaTime);
    rockets.ForEach(function (rocket) {
        rocket.Update(event.deltaTime);
    });
    particles.ForEach(function (particle) {
        particle.Update(event.deltaTime);
    });
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        looper.Trigger();
        for (let i = 0; i < 200; i++) {
            new FireworkRocket(innerWidth / 2, innerHeight - 10);
            yield (0, __1.WaitFor)(10);
        }
    });
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
