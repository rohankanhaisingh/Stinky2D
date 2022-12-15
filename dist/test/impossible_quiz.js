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
const renderer = new index_1.Renderer(scene, { alpha: true, willReadFrequently: true });
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
function createQuestion() {
    const text = new index_1.TextNode("Is obama zwart??????", innerWidth / 2, 126, 10, 10, {
        textAlign: "center",
        textColor: "#000",
        font: "40px Montserrat"
    });
    renderer.Add(text);
}
function createButton(x, y, answer) {
    return __awaiter(this, void 0, void 0, function* () {
        const texture = yield (0, index_1.LoadImageSync)("../res/textures/knop_achtergrond.png");
        const texture_hover = yield (0, index_1.LoadImageSync)("../res/textures/knop_achtergrond_nig.png");
        const button = new index_1.Rectangle(x, y, 360, 170, {
            backgroundImage: texture
        });
        button.AddEventListener("mouseEnter", function () {
            button.styles.backgroundImage = texture_hover;
        });
        button.AddEventListener("mouseOut", function () {
            button.styles.backgroundImage = texture;
        });
        button.AddEventListener("mouseDown", function () {
            button.AnimateCurrentPosition({
                x: (0, index_1.RandomIntBetween)(0, scene.width),
                y: (0, index_1.RandomIntBetween)(0, scene.height)
            }, "easeInOutExpo", 1000);
        });
        const answerTextNode = new index_1.TextNode(answer, x + (360 / 2), y + (170 / 2), 10, 10, {
            textAlign: "center",
            textColor: index_1.ColorCodes.BLACK,
            font: "70px 'Cabin Sketch'"
        });
        renderer.Add(button);
        renderer.Add(answerTextNode);
    });
}
looper.AddEventListener("update", function (state) {
    renderer.ClearScene();
    updateDomElements();
    renderer.RenderObjectsInCamera(state.deltaTime);
});
window.addEventListener("load", function () {
    createQuestion();
    for (let i = 0; i < 5; i++) {
        const x = (0, index_1.RandomIntBetween)(0, scene.width);
        const y = (0, index_1.RandomIntBetween)(0, scene.height);
        createButton(x, y, "yes");
    }
    looper.Trigger();
});
