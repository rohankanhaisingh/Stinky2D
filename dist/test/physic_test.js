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
const __1 = require("..");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"), ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer = new __1.Renderer(scene, { willReadFrequently: true });
const camera = new __1.Camera(renderer, scene);
const looper = new __1.Looper();
const world = new __1.PhysicsWorld2D();
const ground = new __1.Rectangle((innerWidth / 2) - 200, innerHeight - 300, 400, 40, { backgroundColor: __1.ColorCodes.BLACKBERRY });
const fallingObject = new __1.Rectangle(innerWidth / 2, 120, 50, 50, { backgroundColor: __1.ColorCodes.GABLE_GREEN });
const groundRigidBody = new __1.RigidBody2D(ground, 0, true);
const fallingObjectRigidBody = new __1.RigidBody2D(fallingObject, 5, false);
world.AddRigidBody(groundRigidBody).AddRigidBody(fallingObjectRigidBody);
renderer.Add(ground);
renderer.Add(fallingObject);
function updateDomElements() {
    const guiFramerate = document.querySelector("#game-framerate");
    const guiDeltatime = document.querySelector("#game-deltatime");
    const guiRenderObjects = document.querySelector("#game-renderobjects");
    const guiVisibleRenderObjects = document.querySelector("#game-visible_renderobjects");
    const guiRenderDuration = document.querySelector("#game-render_duration");
    guiFramerate.innerText = "Framerate: " + looper.frameRate.toString() + "fps";
    guiDeltatime.innerText = "Delta time: " + looper.deltaTime.toFixed(2) + "ms";
    guiRenderObjects.innerText = "Render objects: " + renderer.renderObjects.length.toString();
    guiVisibleRenderObjects.innerText = "Visible render objects: " + renderer.visibleRenderObjects.length.toString();
    guiRenderDuration.innerText = "Render time: 0ms";
}
function render(event) {
    if (event.deltaTime < 0)
        return;
    renderer.ClearScene();
    renderer.PaintScene(__1.ColorCodes.WHITE);
    renderer.RenderObjectsInCamera(event.deltaTime);
    world.Update(event.deltaTime);
    updateDomElements();
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        looper.Trigger();
    });
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
