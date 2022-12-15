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
const index_1 = require("../index");
const scene = new index_1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"));
const renderer = new index_1.Renderer(scene);
const camera = new index_1.Camera(renderer, scene);
const looper = new index_1.Looper();
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
function createSquares() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 322; i++) {
            const x = (0, index_1.RandomIntBetween)(0, scene.width);
            const y = (0, index_1.RandomIntBetween)(0, scene.height);
            const square = renderer.Add(new index_1.Rectangle(x, y, 30, 30, { backgroundColor: (0, index_1.RandomColor)(), borderWidth: 3 }));
            square.Center(x, y);
            square.AddEventListener("mouseEnter", function (event) {
                event.target.styles.shadowBlur = 10;
                event.target.styles.shadowColor = event.target.styles.backgroundColor;
            });
            square.AddEventListener("mouseOut", function (event) {
                event.target.styles.shadowBlur = 0;
                event.target.styles.shadowColor = undefined;
            });
            square.AddEventListener("mouseDown", function (event) {
                event.target.AnimateCurrentPosition({
                    x: (0, index_1.RandomIntBetween)(0, scene.width),
                    y: (0, index_1.RandomIntBetween)(0, scene.height)
                }, "easeOutElastic", 2000);
            });
            square.AddEventListener("mouseWheel", function (event) {
                switch (event.mouse.wheelDirection) {
                    case "up":
                        square.SetFixedSize(square.width + 20, square.width + 20, square.initialPosition);
                        break;
                    case "down":
                        square.SetFixedSize(square.width - 20, square.width - 20, square.initialPosition);
                        break;
                }
            });
        }
    });
}
looper.AddEventListener("update", function (event) {
    renderer.ClearScene();
    renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;
    updateDomElements();
    return;
});
window.addEventListener("load", function () {
    createSquares();
    looper.Trigger();
    return;
});
