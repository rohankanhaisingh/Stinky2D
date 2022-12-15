"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpritesheetController = void 0;
const uid_1 = require("../functions/uid");
class SpritesheetController {
    constructor(frames, renderObject) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.events = {};
        this.frame = 0;
        this.frames = frames;
        this.duration = 1000;
        this.frameDimension = { width: 100, height: 100 };
        this.paused = false;
        this.loop = false;
        this.start = Date.now();
        this.attachedRenderObject = renderObject;
        renderObject.spritesheetController = this;
    }
    Reset() {
        this.start = Date.now();
        if (typeof this.events.reset === "function")
            this.events.reset(Date.now());
        return this;
    }
    /**Updates the controller by a renderer. */
    Update(deltaTime) {
        if (!this.attachedRenderObject)
            return;
        const now = Date.now();
        const frameDuration = Math.floor(this.duration / (this.frames.length - 1));
        const elapsedTime = now - this.start;
        const frame = Math.round(elapsedTime / frameDuration);
        this.frameDuration = frameDuration;
        if (elapsedTime < this.duration) {
            if (!this.paused) {
                if (typeof this.events.update === "function")
                    this.events.update(Date.now());
                this.frame = frame;
                this.attachedRenderObject.styles.backgroundImage = this.frames[frame];
            }
        }
        else {
            if (this.loop)
                this.Reset();
        }
    }
    /** Pauses the controller */
    Pause() {
        if (!this.paused)
            this.paused = true;
        if (typeof this.events.pause === "function")
            this.events.pause(Date.now());
        return this;
    }
    /** Continues playing the controller */
    Play() {
        if (this.paused)
            this.paused = false;
        if (typeof this.events.play === "function")
            this.events.play(Date.now());
        return this;
    }
    /** Detaches the controller from the attached render object. */
    Detach() {
        if (!this.attachedRenderObject)
            throw new Error("Cannot detach spritesheet controller since there is none attached.");
        if (typeof this.events.detach === "function")
            this.events.detach(Date.now());
        this.attachedRenderObject.spritesheetController;
        this.attachedRenderObject = undefined;
        return this;
    }
    /** Attaches the controller to a render object. */
    Attach(renderObject) {
        if (this.attachedRenderObject)
            throw new Error("Cannot attach spritesheet controller with given render object because it already has one.");
        this.attachedRenderObject = renderObject;
        renderObject.spritesheetController = this;
        return this;
    }
    /**
     * Adds an event listener on this controller, where the callback method will be fired when any of the events gets triggered.
     *
     * @param event Event name
     * @param callback Callback function when the event triggers.
     */
    AddEventListener(event, callback) {
        this.events[event] = callback;
        return this;
    }
}
exports.SpritesheetController = SpritesheetController;
