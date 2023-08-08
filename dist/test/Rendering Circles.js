"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"), ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer = new __1.Renderer(scene, { willReadFrequently: true });
const camera = new __1.Camera(renderer, scene);
const looper = new __1.Looper();
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
    renderer.RenderObjectsInCamera(event.deltaTime);
    updateDomElements();
}
function setup() {
    for (let i = 0; i < 100; i++) {
        const randomPosition = new __1.Vec2((0, __1.RandomIntBetween)(0, scene.width), (0, __1.RandomIntBetween)(0, scene.height)), randomSize = (0, __1.RandomIntBetween)(1, 40), randomAnimationDuration = (0, __1.RandomIntBetween)(1000, 10000), randomColor = (0, __1.RandomColor)();
        const circle = new __1.Circle(randomPosition.x, randomPosition.y, 0, 0, 360, false, { backgroundColor: randomColor });
        circle.ConfigureDragging(scene, "offset", "left");
        circle.EnableDragging();
        circle.AddEventListener("mouseWheel", function (ev) {
            if (ev.mouse.wheelDirection === "up") {
                circle.radius += 10;
            }
            else {
                circle.radius -= 10;
            }
        });
        circle.AnimateCurrentRadius(randomSize, "easeOutExpo", randomAnimationDuration);
        renderer.Add(circle);
    }
    looper.Trigger();
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
