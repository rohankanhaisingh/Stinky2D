"use strict";
// Testing
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const scene = new index_1.Scene(innerWidth, innerHeight, document.body);
        const renderer = new index_1.Renderer(scene);
        const camera = new index_1.Camera(renderer, scene);
        const looper = new index_1.Looper();
        scene.SetAttribute("keepSizeToWindow");
        scene.SetAttribute("disableContextMenu");
        let backgroundColor = index_1.ColorCodes.BLACK;
        looper.AddEventListener("update", function (event) {
            if (event.deltaTime < 0)
                return;
            renderer.ClearScene();
            renderer.PaintScene(backgroundColor);
            renderer.RenderObjectsInCamera(event.deltaTime);
        });
        looper.Trigger();
        for (var i = 0; i < 1; i++) {
            const xPos = (0, index_1.RandomIntBeween)(0, innerWidth);
            const yPos = (0, index_1.RandomIntBeween)(0, innerHeight);
            const color = (0, index_1.RandomColor)();
            const size = (0, index_1.RandomIntBeween)(50, 50);
            const rect = new index_1.Rectangle(xPos, yPos, size, size, {
                backgroundColor: color,
            });
            rect.AddEventListener("mouseEnter", function () {
            });
            rect.ConfigureDragging(scene, "offset", "left");
            rect.EnableDragging();
            renderer.Add(rect);
            index_1.RenderObject.AnimateNumber(0, (0, index_1.RandomIntBeween)(0, 360), "easeInOutExpo", 2000, val => rect.rotation = val);
            yield (0, index_1.WaitFor)(10);
        }
        return;
    });
}
window.addEventListener("load", main);
