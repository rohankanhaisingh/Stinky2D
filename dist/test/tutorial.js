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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const scene = new index_1.Scene(innerWidth, innerHeight, document.body, ["keepSizeToWindow", "disableContextMenu"]);
        const renderer = new index_1.Renderer(scene, {
            alpha: true,
            willReadFrequently: true
        });
        const camera = new index_1.Camera(renderer, scene);
        const looper = new index_1.Looper();
        const myEpicRectangle = new index_1.Rectangle(200, 200, 200, 200, {
            backgroundColor: index_1.ColorCodes.SEA_PINK
        });
        renderer.Add(myEpicRectangle);
        myEpicRectangle.ConfigureDragging(scene, "offset", "left");
        myEpicRectangle.EnableDragging();
        myEpicRectangle.AnimateCurrentXPosition(1200, "easeInOutExpo", 1000);
        looper.AddEventListener("update", function (state) {
            renderer.ClearScene();
            renderer.RenderObjectsInCamera(state.deltaTime);
        });
        looper.Trigger();
    });
}
main();
