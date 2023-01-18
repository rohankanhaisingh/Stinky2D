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
function render(event) {
    return __awaiter(this, void 0, void 0, function* () {
        renderer.ClearScene();
        renderer.RenderObjectsInCamera(event.deltaTime);
        updateDomElements();
    });
}
function createQuestionButton(x, y, textures) {
    const buttonWidth = 365;
    const buttonHeight = 145;
    const rect = renderer.Add(new index_1.Rectangle(x - (buttonWidth / 2), y, buttonWidth, buttonHeight, {
        backgroundImage: textures[0],
        imageSmoothingEnabled: false,
        shadowColor: "#1d1d1d",
    }));
    rect.AddEventListener("mouseEnter", function (event) {
        event.target.styles.shadowBlur = 2;
        event.target.styles.shadowOffsetX = -10;
        event.target.styles.shadowOffsetY = 10;
    });
    rect.AddEventListener("mouseOut", function (event) {
        event.target.styles.shadowBlur = 0;
        event.target.styles.shadowOffsetX = 0;
        event.target.styles.shadowOffsetY = 0;
    });
    rect.AddEventListener("mouseDown", function (event) {
        (0, index_1.AnimateInteger)(0, 360, "easeOutElastic", 3000, rotation => event.target.rotation = rotation);
    });
    const spritesheetController = new index_1.SpritesheetController(textures, rect);
    spritesheetController.duration = 800;
    spritesheetController.loop = true;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const textures = [
            yield (0, index_1.LoadImageSync)("../res/textures/button_frame_01.png"),
            yield (0, index_1.LoadImageSync)("../res/textures/button_frame_02.png"),
            yield (0, index_1.LoadImageSync)("../res/textures/button_frame_03.png"),
            yield (0, index_1.LoadImageSync)("../res/textures/button_frame_04.png"),
        ];
        const questionTextures = [
            yield (0, index_1.LoadImageSync)("../res/textures/question_1_frame_01.png"),
            yield (0, index_1.LoadImageSync)("../res/textures/question_1_frame_02.png"),
        ];
        const question = new index_1.Rectangle(innerWidth / 2 - (540 / 2), 100, 540, 240, {
            backgroundImage: questionTextures[0]
        });
        const questionSpritesheetController = new index_1.SpritesheetController(questionTextures, question);
        questionSpritesheetController.duration = 500;
        questionSpritesheetController.loop = true;
        renderer.Add(question);
        const button1 = createQuestionButton(innerWidth / 2, 400, textures);
        scene.domElement.style.backgroundImage = "url(https://i.pinimg.com/originals/0b/41/25/0b41253a4041ddb57004d633e4979430.jpg)";
        scene.domElement.style.backgroundSize = "100% 100%";
        looper.AddEventListener("update", render).Trigger();
    });
}
window.addEventListener("load", main);
