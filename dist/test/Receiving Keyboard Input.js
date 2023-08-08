"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"), ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]), renderer = new __1.Renderer(scene, { willReadFrequently: true }), camera = new __1.Camera(renderer, scene), looper = new __1.Looper();
let player;
function render(event) {
    renderer.ClearScene();
    renderer.RenderObjectsInCamera(0).duration;
    if (player === null)
        return;
    if ((0, __1.GetKeyDown)("w"))
        player.y -= 10;
    if ((0, __1.GetKeyDown)("s"))
        player.y += 10;
    if ((0, __1.GetKeyDown)("d"))
        player.x += 10;
    if ((0, __1.GetKeyDown)("a"))
        player.x -= 10;
    camera.Focus(player, 0, 0);
}
function setup() {
    // Generate random tiles across the scene
    const amountOfTiles = 2000;
    for (let i = 0; i < amountOfTiles; i++) {
        const randomPosition = scene.GetRandomPosition().MultiplyScalar(10);
        const rectangle = new __1.Rectangle(0, 0, 20, 20, {
            backgroundColor: (0, __1.RandomColor)()
        });
        rectangle.SetPosition(randomPosition.x, randomPosition.y);
        renderer.Add(rectangle);
    }
    // Create player
    player = new __1.Rectangle(scene.Center().x, scene.Center().y, 20, 20, {
        backgroundColor: "#000",
        borderWidth: 5,
        borderColor: "gray",
        shadowColor: "rgba(0, 0, 0, .4)",
        shadowOffsetX: -3,
        shadowOffsetY: 3,
        shadowBlur: 5
    });
    renderer.Add(player);
    looper.AddEventListener("update", render).Trigger();
}
window.addEventListener("load", setup);
