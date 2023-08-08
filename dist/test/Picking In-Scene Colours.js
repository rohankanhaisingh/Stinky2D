"use strict";
/*
 * Color Picker
 * by Rohan Kanhaisingh
 *
 * ---------------------
 *
 * This example demonstrates how you can pick colors on a specific
 * pixel or pixels using the renderer.GetImageData() method.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"));
const renderer = new __1.Renderer(scene, { willReadFrequently: true });
const camera = new __1.Camera(renderer, scene);
const looper = new __1.Looper();
scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");
function render(event) {
    if (event.deltaTime < 0)
        return;
    renderer.ClearScene();
    renderer.PaintScene(__1.ColorCodes.WHITE);
    renderer.RenderObjectsInCamera(event.deltaTime).duration;
}
function setup() {
    for (let i = 0; i < 42; i++) {
        const rect = new __1.Rectangle(0, 0, 0, 0, { backgroundColor: (0, __1.RandomColor)() });
        rect.SetSize(new __1.Vec2((0, __1.RandomIntBetween)(0, 132), (0, __1.RandomIntBetween)(0, 132)));
        rect.SetPosition(scene.GetRandomPosition());
        renderer.Add(rect);
        rect.AddEventListener("mouseEnter", function (event) {
            console.log(rect.arrayIndex);
        });
    }
    const tracker = new __1.Rectangle(0, 0, 40, 40, {
        shadowBlur: 10,
        shadowColor: "rgb(0, 0, 0, .3)"
    });
    renderer.Add(tracker);
    // Sets an event listener when the user moves their mouse on the scene.
    scene.AddEventListener("mouseMove", function (event) {
        // Simplifying collected image data from the renderer.
        const imageData = (0, __1.SimplifyImageData)(renderer.GetImageData(event.x, event.y, 1, 1));
        tracker.SetPosition(event.x + 20, event.y);
        tracker.styles.backgroundColor = imageData.hex;
    });
    looper.AddEventListener("update", render).Trigger();
}
window.addEventListener("load", setup);
