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
const audioSystem = new __1.AudioSystem2D();
const circles = new __1.Collection();
audioSystem.UseCompressorPreset("master-no-clip");
const audioSources = [
    "../res/audio/alarm.ogg",
    "../res/audio/bonk.ogg",
    "../res/audio/click.ogg"
];
const mousePointer = new __1.Circle(0, 0, 10, 0, 360, false, {
    backgroundColor: "red"
});
scene.AddEventListener("mouseMove", function (ev) {
    mousePointer.SetPosition(ev.x, ev.y);
});
audioSystem.AttachRenderObject(mousePointer);
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
function createAudioNodes() {
    const x = (0, __1.RandomIntBetween)(0, scene.width);
    const y = (0, __1.RandomIntBetween)(0, scene.height);
    const range = 50;
    const circle = new __1.Circle(x, y, 10, 0, 360, false, {
        backgroundColor: (0, __1.RandomColor)()
    });
    const audioNode = new __1.AudioNode2D(audioSystem, new Audio(audioSources[(0, __1.RandomIntBetween)(0, audioSources.length)]), x, y, range);
    audioNode.playWhenAudible = false;
    audioNode.loop = true;
    audioNode.Play();
    audioNode.AttachRenderObject(circle);
    circles.Add(circle);
    renderer.Add(circle);
}
function render(event) {
    renderer.ClearScene();
    renderer.PaintScene("#ffffff");
    renderer.RenderObjectsInCamera(event.deltaTime).duration;
    audioSystem.Update(event.deltaTime);
    circles.ForEach(function (circle) {
        circle.x += 1 * event.deltaTime;
        if (circle.x >= scene.width - circle.radius)
            circle.x = -circle.radius;
        circle.audioNodes.forEach(function (audioNode) {
            if (!audioNode.isAudible) {
                circle.radius = 10;
                return;
            }
            const byteData = audioNode.GetAnalyserByteFrequencyData();
            const arr = [...byteData];
            const avg = (0, __1.GetAverageArrayValue)(arr);
            circle.radius = 10 + avg;
        });
    });
    updateDomElements();
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        looper.Trigger();
        for (var i = 0; i < 50; i++)
            createAudioNodes();
        renderer.Add(mousePointer);
    });
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
