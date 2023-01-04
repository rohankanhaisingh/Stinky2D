"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"));
const renderer = new __1.Renderer(scene, { willReadFrequently: true });
const camera = new __1.Camera(renderer, scene);
const looper = new __1.Looper();
scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");
let renderDuration = 0;
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
    guiRenderDuration.innerText = "Render time: " + renderDuration.toString() + " ms";
}
for (let i = 0; i < 42; i++) {
    const x = (0, __1.RandomIntBetween)(0, scene.width);
    const y = (0, __1.RandomIntBetween)(0, scene.width);
    const width = (0, __1.RandomIntBetween)(0, 132);
    const height = (0, __1.RandomIntBetween)(0, 132);
    const rect = new __1.Rectangle(x, y, width, height, {
        backgroundColor: (0, __1.RandomColor)()
    });
    renderer.Add(rect);
}
scene.AddEventListener("mouseMove", function (event) {
    const imageData = (0, __1.SimplifyImageData)(renderer.GetImageData(event.x, event.y, 1, 1));
    console.log(imageData.hex);
    //if (colors[0] !== 235 && colors[1] !== 74 && colors[2] !== 98) {
    //	console.log("Is in white");
    //}
});
looper.AddEventListener("update", function (event) {
    if (event.deltaTime < 0)
        return;
    renderer.ClearScene();
    renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;
    updateDomElements();
});
looper.Trigger();
