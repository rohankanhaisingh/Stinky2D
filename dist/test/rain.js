"use strict";
/*
 * 2D raining scene.
 */
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
//@ts-expect-error
window["renderer"] = renderer;
scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");
let renderDuration = 0;
const rainDroplets = [];
const smokeParticles = [];
const textures = {
    smoke: new Image(),
    orb: new Image()
};
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
function createLightning(x) {
    return __awaiter(this, void 0, void 0, function* () {
        const startPosition = new index_1.Vec2(x, 10);
        const endPosition = new index_1.Vec2(x, scene.height - 10);
        const roughness = (0, index_1.RandomIntBetween)(5, 40);
        const duration = (0, index_1.RandomIntBetween)(300, 2000);
        const segmentLength = 20;
        const segmentDistance = (endPosition.y - startPosition.y) / segmentLength;
        const lineWidth = (0, index_1.RandomIntBetween)(5, 15);
        let lastPosition = new index_1.Vec2(startPosition.x + (0, index_1.RandomIntBetween)(-roughness, roughness), 0);
        let newPosition = new index_1.Vec2(startPosition.x + (0, index_1.RandomIntBetween)(-roughness, roughness), segmentDistance);
        const lineSystem = new index_1.LineSystem2D(0, 0);
        const lineStyles = {
            strokeColor: index_1.ColorCodes.WHITE,
            shadowBlur: 10,
            shadowColor: index_1.ColorCodes.WHITE,
            lineWidth: lineWidth,
            lineCap: "round"
        };
        renderer.Add(lineSystem);
        for (let i = 0; i < segmentLength; i++) {
            const line = new index_1.Line2D(lastPosition, newPosition, lineStyles);
            lineSystem.AddLine2D(line);
            lastPosition = newPosition;
            newPosition = new index_1.Vec2(startPosition.x + (0, index_1.RandomIntBetween)(-roughness, roughness), lastPosition.y + segmentDistance);
            yield (0, index_1.WaitFor)(1);
        }
        (0, index_1.AnimateInterger)(lineWidth, 0, "easeOutExpo", duration, width => lineSystem.SetStyleOnLines("lineWidth", width));
        setTimeout(function () {
            lineSystem.DestroyAllLines();
            renderer.Destroy(lineSystem);
        }, duration);
    });
}
function resetDroplet(droplet) {
    droplet.x = (0, index_1.RandomIntBetween)(0, scene.width);
    droplet.y = (0, index_1.RandomIntBetween)(-10, scene.height / 2);
}
function updateRainDroplets(deltaTime) {
    for (let i = 0; i < rainDroplets.length; i++) {
        const droplet = rainDroplets[i];
        droplet.x += 1 * deltaTime;
        droplet.y += 40 * deltaTime;
        if (droplet.y > scene.height)
            resetDroplet(droplet);
        if (droplet.x > scene.width)
            resetDroplet(droplet);
    }
}
function createRainFall(amount) {
    for (let i = 0; i < amount; i++) {
        const x = (0, index_1.RandomIntBetween)(0, scene.width);
        const y = (0, index_1.RandomIntBetween)(0, scene.height);
        const dropletRadius = 1;
        const droplet = new index_1.Circle(x, y, dropletRadius, 0, 360, false, {
            backgroundColor: "#5499f2"
        });
        rainDroplets.push(droplet);
        renderer.Add(droplet);
    }
}
function createLightningLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        createLightning((0, index_1.RandomIntBetween)(0, scene.width));
        yield (0, index_1.WaitFor)((0, index_1.RandomIntBetween)(1, 3) * 1000);
        createLightningLoop();
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        createLightningLoop();
        createRainFall(350);
        scene.AddEventListener("mouseDown", function () {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < 5; i++) {
                    createLightning(scene.mouse.x);
                    yield (0, index_1.WaitFor)(50);
                }
            });
        });
        looper.AddEventListener("update", function (event) {
            if (event.deltaTime < 0)
                return;
            renderer.ClearScene();
            renderer.PaintScene(index_1.ColorCodes.BLACK);
            renderDuration = renderer.RenderObjectsInCamera(event.deltaTime).duration;
            updateRainDroplets(event.deltaTime);
            updateDomElements();
        });
        looper.Trigger();
    });
}
window.addEventListener("load", main);
