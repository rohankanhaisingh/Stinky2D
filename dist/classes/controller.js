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
exports.GamepadHandler = exports.GamepadController = void 0;
const uid_1 = require("../functions/uid");
const collection_1 = require("./collection");
class GamepadController {
    constructor(gamepad) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.updateSpeed = 100;
        this.start = Date.now();
        this.axes = [];
        this.buttons = [];
        this.events = {};
        this.gamepad = gamepad;
        this.gamepadId = gamepad.id;
        this.axes = [...this.gamepad.axes];
        this.buttons = [...this.gamepad.buttons];
    }
    AddEventListener(event, cb) {
        this.events[event] = cb;
    }
    Update(index) {
        const now = Date.now();
        if (now <= this.start + this.updateSpeed)
            return;
        const gamepad = navigator.getGamepads()[index - 1];
        if (gamepad === null)
            return;
        this.gamepad = gamepad;
        this.axes = [...this.gamepad.axes];
        this.buttons = [...this.gamepad.buttons];
        this.start = Date.now();
        if (typeof this.events["update"] === "function")
            this.events["update"]({
                timestamp: Date.now()
            });
        return;
    }
    ResolveControllerTypeValues(type) {
        switch (type) {
            case "ps4-dual-shock":
                return {
                    leftHandedButtons: {
                        top: this.buttons[12].touched,
                        right: this.buttons[15].touched,
                        bottom: this.buttons[13].touched,
                        left: this.buttons[14].touched
                    },
                    rightHandedButtons: {
                        triangle: this.buttons[3].touched,
                        circle: this.buttons[1].touched,
                        cross: this.buttons[0].touched,
                        square: this.buttons[2].touched
                    },
                    leftHandedJoystick: {
                        x: this.axes[0],
                        y: this.axes[1]
                    },
                    rightHandedJoystick: {
                        x: this.axes[2],
                        y: this.axes[3]
                    },
                    leftHandedJoystickButton: this.buttons[10].touched,
                    rightHandedJoystickButton: this.buttons[11].touched,
                    playStationButton: this.buttons[16].touched,
                    shareButton: this.buttons[8].touched,
                    optionsButton: this.buttons[9].touched,
                    touchPadButton: this.buttons[17].touched,
                    leftHandedBacksideDigitalButton: this.buttons[6].value,
                    leftHandedBacksideButton: this.buttons[4].touched,
                    rightHandedBacksideDigitalButton: this.buttons[7].value,
                    rightHandedBacksideButton: this.buttons[5].touched
                };
                break;
        }
        return null;
    }
}
exports.GamepadController = GamepadController;
class GamepadHandler {
    constructor(maxControllers) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.controllers = new collection_1.Collection();
        this.events = {};
        this.foundFirstController = false;
        this.controllers.maxSize = maxControllers ? maxControllers : null;
        window.addEventListener("gamepadconnected", event => {
            const controller = new GamepadController(event.gamepad);
            this.controllers.Add(controller);
            if (typeof this.events["connect"] === "function")
                this.events["connect"]({
                    gamepad: controller,
                    id: controller.id,
                    timestamp: controller.timestamp
                });
        });
    }
    AddEventListener(event, cb) {
        this.events[event] = cb;
    }
    Update(deltaTime) {
        const l = this.controllers.Count;
        for (let i = 0; i < l; i++) {
            const controller = this.controllers.GetElement(i);
            controller.Update(l);
        }
    }
    WaitForController() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.foundFirstController)
                return null;
            return new Promise((resolve, reject) => {
                window.addEventListener("gamepadconnected", event => {
                    const controller = new GamepadController(event.gamepad);
                    this.controllers.Add(controller);
                    resolve(controller);
                });
            });
        });
    }
}
exports.GamepadHandler = GamepadHandler;
