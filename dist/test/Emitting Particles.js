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
const worms = new __1.Collection();
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
    renderer.PaintScene(__1.ColorCodes.BLACK);
    renderer.RenderObjectsInCamera(event.deltaTime);
    updateDomElements();
    const now = Date.now();
    worms.ForEach(function (worm) {
        worm.velocityX += (0, __1.RandomIntBetween)(-10, 10) / 10;
        worm.velocityY += (0, __1.RandomIntBetween)(-10, 10) / 10;
        worm.x += worm.velocityX * event.deltaTime;
        worm.y += worm.velocityY * event.deltaTime;
    });
}
function setup() {
    let angle = 0;
    function spawnParticles() {
        return __awaiter(this, void 0, void 0, function* () {
            angle += .1 * looper.deltaTime;
            const xVelocity = Math.cos(angle) * 1;
            const yVelocity = Math.sin(angle) * 1;
            const worm = new __1.LineSystem2D(0, 0);
            const styles = {
                lineCap: "round",
                lineWidth: 10,
                strokeColor: (0, __1.RandomColor)()
            };
            for (let i = 0; i < 10; i++) {
                const lineX = worm.x - (i * 10);
                const lineY = worm.y - (i * 10);
                worm.AddLine2D(new __1.Line2D({ x: worm.x, y: worm.y }, { x: lineX, y: lineY }, Object.assign({}, styles)));
            }
            worm.velocityX = xVelocity;
            worm.velocityY = yVelocity;
            worm.SetPosition(scene.Center());
            renderer.Add(worm);
            worms.Add(worm);
            yield (0, __1.WaitFor)(50);
            if (angle < 3)
                spawnParticles();
        });
    }
    spawnParticles();
    looper.Trigger();
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
