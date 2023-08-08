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
function render(event) {
    if (event.deltaTime < 0)
        return;
    renderer.ClearScene();
    renderer.PaintScene(__1.ColorCodes.WHITE);
    renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;
    updateDomElements();
}
function createObamna(amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const obama = yield (0, __1.LoadImageSync)("https://www.europa-nu.nl/9353000/1/j4nvh0qavhjkdqd_j9vvj9idsj04xr6/vlbjj03d1wny?sizew=933&sizeh=1200&crop=778:58:1081:1390&lm=qfo8io");
        for (let i = 0; i < amount; i++) {
            const x = (0, __1.RandomIntBetween)(0, scene.width);
            const y = (0, __1.RandomIntBetween)(0, scene.height);
            const speed = (0, __1.RandomIntBetween)(1, 50) / 10;
            const randomColor = (0, __1.RandomColor)();
            const rect1 = new __1.Rectangle(x, y, 50, 80, {
                backgroundColor: randomColor,
            });
            rect1.SetTransform(1, (0, __1.RandomIntBetween)(1, 20) / 10, (0, __1.RandomIntBetween)(1, 20) / 10, 1, 0, 0);
            rect1.AddEventListener("render", function () {
                if (rect1.x >= scene.width - (rect1.width * 2))
                    renderer.Destroy(rect1);
                rect1.x += speed * looper.deltaTime;
            });
            renderer.Add(rect1);
        }
    });
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createObamna(221);
        looper.Trigger();
    });
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
