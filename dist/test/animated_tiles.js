"use strict";
/**
 * Animated Tiles
 * by Rohan Kanhaisingh
 *
 * ----------------------
 *
 * This example demonstrates a collection tiles that gets
 * animated when appearing.
 *
 * The position and the color of those styles are generated
 * using a simple algorithm.
 *
 * */
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
const postProcessor = new __1.OffscreenRenderer();
/**
 * Function that generates tile
 * */
function createTiles(widthInPixels, heightInPixels, tileSize, gap, delay) {
    return __awaiter(this, void 0, void 0, function* () {
        // Calculates the amount of horizontal tiles and vertical tiles.
        // And rounding it up, cuz yeah fuck not rounded number.
        const tileWidth = Math.round(widthInPixels / tileSize) + 1;
        const tileHeight = Math.round(heightInPixels / tileSize) + 1;
        const baseXShade = (0, __1.RandomIntBetween)(0, 255);
        const baseYShade = (0, __1.RandomIntBetween)(0, 255);
        // Do the loopy loop loop.
        for (let x = 0; x < tileWidth; x += 1) {
            // Calculated the horizontal color shade.
            const shadeX = baseXShade / tileWidth * x;
            // Some other loops.
            for (let y = 0; y < tileHeight; y++) {
                // Calculated the vertical color shade.
                const shadeY = baseYShade / tileHeight * y;
                // Converting an array containing byte values to a heximal string value.
                const calculatedHexColor = "#" + (0, __1.ConvertByteArrayToHex)([shadeX, 142, shadeY]);
                const hoverColor = "#ffffff";
                // Yeah the rest speaks for itself.
                const tile = new __1.Rectangle(x * (tileSize + gap), y * (tileSize + gap), tileSize, tileSize, {
                    backgroundColor: calculatedHexColor
                });
                tile.AddEventListener("mouseDown", function () {
                    (0, __1.AnimateHeximalColor)(hoverColor, calculatedHexColor, "easeOutCirc", 1000, color => tile.SetStyle("backgroundColor", color));
                    (0, __1.AnimateHeximalColor)(hoverColor, calculatedHexColor, "easeOutCirc", 1000, color => tile.SetStyle("shadowColor", color));
                });
                renderer.Add(tile);
                // AnimateInteger(0, 1, "easeOutExpo", 1000, opacity => tile.SetStyle("opacity", opacity));
                if (delay !== 0)
                    yield (0, __1.WaitFor)(delay);
            }
        }
    });
}
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
    renderer.ClearScene();
    renderer.PaintScene(__1.ColorCodes.BLACK);
    renderDuration = renderer.RenderObjectsInCamera(0).duration;
    postProcessor.CreateTexture(renderer);
    renderer.RenderCopiedTexture(postProcessor, { opacity: 0.5 });
    updateDomElements();
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        postProcessor.SetDynamicScalingFactor(renderer, .2);
        postProcessor.UseGlowEffect(5, 2);
        looper.Trigger();
        createTiles(600, 600, 50, 20, 0);
        render(null);
    });
}
window.addEventListener("load", setup);
