"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Looper = void 0;
const uid_1 = require("../functions/uid");
const renderer_1 = require("./renderer");
class Looper {
    /**
     * Creates an looper instance, which will update itself every possible requested frame
     * using the ``window.requestAnimationFrame`` function.
     * @param renderer
     */
    constructor(renderer) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.animationFrame = 0;
        this.frameRate = 0;
        this.deltaTime = 0;
        this.lastTimestamp = Date.now();
        this.perfectFrameRate = 60;
        this.times = [];
        this.events = {
            update: []
        };
        if (renderer)
            this.renderer = renderer;
    }
    _tick(timestamp) {
        this.animationFrame = window.requestAnimationFrame((d) => this._tick(d));
        const now = performance.now();
        this.deltaTime = (now - this.lastTimestamp) / (1000 / this.perfectFrameRate);
        this.lastTimestamp = now;
        while (this.times.length > 0 && this.times[0] <= now - 1000)
            this.times.shift();
        this.times.push(now);
        this.frameRate = this.times.length;
        const state = {
            now: now,
            deltaTime: this.deltaTime,
            frameRate: this.frameRate,
            lastTimestamp: this.lastTimestamp,
            perfectFrameRate: this.perfectFrameRate
        };
        if (this.renderer instanceof renderer_1.Renderer) {
            this.renderer.ClearScene();
            this.renderer.RenderObjectsInCamera(this.deltaTime);
        }
        for (let i = 0; i < this.events.update.length; i++) {
            let updateEvent = this.events.update[i];
            if (typeof updateEvent === "function")
                updateEvent(state);
        }
        return state;
    }
    /**This will manually trigger the loop of this instance. */
    Trigger() {
        this._tick(performance.now());
        return this;
    }
    /**
     * Appends an event listener for events whose type attribute value is type.
     * The callback argument sets the callback that will be evoked when any of these events gets triggered.
     * @param event Event name
     * @param cb Callback function
     */
    AddEventListener(event, cb) {
        switch (event) {
            case "update":
                this.events.update.push(cb);
                break;
        }
        return this;
    }
}
exports.Looper = Looper;
