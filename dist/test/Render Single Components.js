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
const obj1 = new __1.Rectangle(140, 140, 40, 40, {
    backgroundColor: "red"
});
const obj2 = new __1.Rectangle(340, 340, 40, 40, {
    backgroundColor: "green"
});
function render() {
    renderer.Render(obj2, looper.deltaTime);
    updateDomElements();
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        looper.Trigger();
    });
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
