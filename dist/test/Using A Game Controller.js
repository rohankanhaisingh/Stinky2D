"use strict";
/**
 * Controller Test
 * by Rohan Kanhaisingh
 *
 * -----------------------
 *
 * This example demonstrates how you can use gamepad controllers
 * and handle their data.
 *
 * This is really cool because it gives non keyboard users
 * the ability to play games using this library as well.
 *
 * This example uses the most important classes which are:
 * - GamepadHandler
 * - GamepadController
 *
 * The GamepadHandler handles every gamepad that gets
 * connected or disconnected. Each GamepadHandler stores
 * GamepadController instances.
 *
 * When a gamepad controller gets connected, the .AddEventListener("connect")
 * method gets triggered passing a new fresh created GamepadController
 * class instance.
 *
 * This instance can be used to read data for example the pressed buttons
 * and other input data.
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
const __1 = require("..");
const scene = new __1.Scene(innerWidth, innerHeight, document.querySelector(".app .container"), ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer = new __1.Renderer(scene, { willReadFrequently: true });
const camera = new __1.Camera(renderer, scene);
const looper = new __1.Looper();
// Create a new GamepadHandler.
const gamepadListener = new __1.GamepadHandler();
const direction = new __1.Vec2(0, 0);
const speed = 6;
const entities = new __1.Collection();
const playerTexture = new Image();
playerTexture.src = "https://media.dumpert.nl/foto/b4034f29_wtf_patrick.jpg";
const player = new __1.Rectangle(scene.Center().x, scene.Center().y, 80, 80, {
    backgroundImage: playerTexture
});
renderer.Add(player);
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
// Function to start handling gamepad controllers.
function handleGamepadControls() {
    /*
     * Sets an event listener on when any gamepad gets connected.
     * The 'event' parameters is an object containg data such
     * as the gamepad itself, but also the timestamp and the id.
     */
    gamepadListener.AddEventListener("connect", function (event) {
        /**
         * Declaring a new variable which is a reference to the
         * gamepad in the event object making it more readable.
         */
        const controller = event.gamepad;
        /*
         * Setting the update speed might improve the performance
         * and gives both the user and the game time to handle things.
         *
         * The value goes as milliseconds. So in this example, each
         * 10 milliseconds the controller gets updated. With updated,
         * you can think of reading the data each 10 milliseconds.
         */
        controller.updateSpeed = 10;
        // Sets an event listener on each update.
        controller.AddEventListener("update", function () {
            /*
             * Since each controller has their own unique key mapping,
             * the universal way to read data is by setting two objects
             * storing the joystick axes and all the buttons.
             *
             * For example the values for the joystick axes are stored
             * in an array as property named `controller.axes`. This array
             * contains 4 values including the x and y values for two or more
             * joysticks.
             *
             * The buttons are all stored in one array named `controller.buttons`
             * which makes it really hard to get specific buttons. Luckily, there are
             * resolvers method that makes the input more readable.
            */
            // I tested this with a ps4 dual shock controller.
            const ps4ResolvedMap = controller.ResolveControllerTypeValues("ps4-dual-shock");
            if (ps4ResolvedMap === null)
                return;
            const leftJoystick = ps4ResolvedMap.leftHandedJoystick;
            direction.x = parseFloat(leftJoystick.x.toFixed(2));
            direction.y = parseFloat(leftJoystick.y.toFixed(2));
        });
    });
}
// The rest of the code is not relevant.
function render(event) {
    if (event.deltaTime < 0)
        return;
    renderer.ClearScene();
    renderer.PaintScene(__1.ColorCodes.WHITE);
    renderer.RenderObjectsInCamera(event.deltaTime).duration;
    updateDomElements();
    // Update the entire gamepad listener.
    gamepadListener.Update(looper.deltaTime);
    const rectangles = entities.AllElements();
    for (let i = 0; i < rectangles.length; i++) {
        const rect = entities.GetElement(i);
        const entityMoveDirection = (0, __1.CalculateAtan)(rect.x, rect.y, player.x, player.y).multiply(speed / 2);
        const distance = (0, __1.CalculateDistance)(rect.x, rect.y, player.x, player.y);
        const angle = (0, __1.CalculateAngle)(rect.x, rect.y, player.x, player.y);
        if (distance < 300) {
            rect.x -= (entityMoveDirection.x) * looper.deltaTime;
            rect.y -= (entityMoveDirection.y) * looper.deltaTime;
            rect.rotation = angle - 90;
        }
        if (distance <= rect.width) {
            renderer.Destroy(rect);
            entities.Delete(rect);
        }
    }
    player.x += (direction.x * speed) * event.deltaTime;
    player.y += (direction.y * speed) * event.deltaTime;
    camera.x = -(player.x - (scene.width / 2));
    camera.y = -(player.y - (scene.height / 2));
}
function createEntities(amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const texture = yield (0, __1.LoadImageSync)("https://i.kym-cdn.com/photos/images/newsfeed/002/213/963/293.jpg");
        for (let i = 0; i < amount; i++) {
            const x = (0, __1.RandomIntBetween)(0, scene.width);
            const y = (0, __1.RandomIntBetween)(0, scene.height);
            const size = 40;
            const color = (0, __1.RandomColor)();
            const entity = new __1.Rectangle(x, y, size, size, {
                backgroundImage: texture,
            });
            renderer.Add(entity);
            entities.Add(entity);
        }
    });
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createEntities(320);
        looper.Trigger();
        handleGamepadControls();
    });
}
looper.AddEventListener("update", render);
window.addEventListener("load", setup);
