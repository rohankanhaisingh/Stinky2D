"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const scene = new index_1.Scene(innerWidth, innerHeight, document.body);
const renderer = new index_1.Renderer(scene);
const camera = new index_1.Camera(renderer, scene);
const looper = new index_1.Looper();
scene.SetAttribute("keepSizeToWindow");
scene.SetAttribute("disableContextMenu");
const sceneWidth = 1430;
const sceneHeight = 820;
function createPlayers() {
    const playerWidth = 15;
    const player1 = new index_1.Rectangle(playerWidth, sceneHeight / 2, playerWidth, 120, {
        backgroundColor: index_1.ColorCodes.BLACK
    });
    const player2 = new index_1.Rectangle(sceneWidth - (playerWidth * 2), sceneHeight / 2, playerWidth, 120, {
        backgroundColor: index_1.ColorCodes.BLACK
    });
    renderer.Add(player1).Add(player2);
}
function createScene() {
    const sceneBorder = new index_1.Rectangle(0, 0, sceneWidth, sceneHeight, {
        borderColor: index_1.ColorCodes.BLACK,
        borderWidth: 1
    });
    sceneBorder.forceRendering = true;
    renderer.Add(sceneBorder);
}
function resetCameraToCenter() {
    const screenCenterX = innerWidth / 2;
    const screenCenterY = innerHeight / 2;
    const sceneCenterX = (sceneWidth / 2) * camera.scaleX;
    const sceneCenterY = (sceneHeight / 2) * camera.scaleX;
    console.log(-(screenCenterY - sceneCenterY));
    camera.x = (screenCenterX - sceneCenterX);
    camera.y = (screenCenterY - sceneCenterY);
    //RenderObject.AnimateNumber(.1, 1, "easeInOutExpo", 1000, function (val: number) {
    //	camera.scaleX = val;
    //	camera.scaleY = val;
    //});
    //setTimeout(function () {
    //	camera.AnimateCurrentPosition({ x: (screenCenterX - sceneCenterX), y: (screenCenterY - sceneCenterY) }, "easeInOutExpo", 1000);
    //}, 1000);
}
function main() {
    createScene();
    createPlayers();
    resetCameraToCenter();
    looper.AddEventListener("update", function (state) {
        renderer.ClearScene();
        renderer.PaintScene(index_1.ColorCodes.ICE_COLD);
        renderer.RenderObjectsInCamera(state.deltaTime);
    });
    looper.Trigger();
}
main();
