"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"), ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer = new __1.Renderer(scene, { willReadFrequently: true });
const camera = new __1.Camera(renderer, scene);
const looper = new __1.Looper();
const world = new __1.PhysicsWorld2D();
world.SetGravity(0, -50);
const ground = new __1.Rectangle((innerWidth / 2) - 200, innerHeight - 300, 400, 40, { backgroundColor: __1.ColorCodes.BLACKBERRY });
const box = new __1.Rectangle(scene.Center().x, scene.Center().y, 50, 50, { backgroundColor: "red" });
const groundRigidBody = new __1.RigidBody2D(world, ground, { density: 1 })
    .ApplyCenterForce(0, 10);
const boxRigidBody = new __1.RigidBody2D(world, box, { density: 1 })
    .SetDynamic()
    .ApplyCenterForce(0, 10);
renderer.Add(box);
renderer.Add(ground);
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
    looper.Trigger();
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
