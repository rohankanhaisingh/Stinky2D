"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const easings_1 = require("../functions/easings");
class Camera {
    /**
     * This camera class allows you to render graphical components located at off-screen coordinates.
     * @param renderer Renderer class used to project the view
     * @param scene Scene classes used to determine the dimensions of the screen
     */
    constructor(renderer, scene) {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.width = innerWidth;
        this.height = innerHeight;
        this.offScreenRendering = false;
        this.lastOffset = {
            x: 0,
            y: 0
        };
        this.renderer = renderer;
        this.scene = scene;
        this.ctx = renderer.context;
        renderer.camera = this;
        scene.camera = this;
    }
    /**
     * Sets the camera offset, no idea why you need this but it's there :).
     * @param x
     * @param y
     */
    SetOffset(x, y) {
        if (typeof x === "number") {
            this.lastOffset.x = this.x;
            this.x = -x;
        }
        if (typeof y === "number") {
            this.lastOffset.y = this.y;
            this.x = -y;
        }
        return this;
    }
    /**
     * Animates the camera position from one position to another
     * @param from Starting position
     * @param to Ending position
     * @param easing Animation type
     * @param duration Duration of animation
     */
    AnimatePosition(from, to, easing, duration) {
        if (typeof this.y !== "number")
            throw new Error("Cannot animate y-axis of object as it does not exist or is not a number.");
        if (typeof this.x !== "number")
            throw new Error("Cannot animate x-axis of object as it does not exist or is not a number.");
        const now = Date.now();
        const startX = from.x;
        const startY = from.y;
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const animatedX = easings_1.Easings[easing](elapsedTime, 0, to.x - startX, duration);
            const animatedY = easings_1.Easings[easing](elapsedTime, 0, to.y - startY, duration);
            this.x = startX + animatedX;
            this.y = startY + animatedY;
            if (elapsedTime < duration)
                window.requestAnimationFrame(updateTick);
        };
        updateTick();
        return this;
    }
    /**
     * Animates the position of this object to another specific y position.
     * @param to Positions where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentPosition(to, easing, duration) {
        if (typeof this.y !== "number")
            throw new Error("Cannot animate y-axis of object as it does not exist or is not a number.");
        if (typeof this.x !== "number")
            throw new Error("Cannot animate x-axis of object as it does not exist or is not a number.");
        const now = Date.now();
        const startX = this.x;
        const startY = this.y;
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const animatedX = easings_1.Easings[easing](elapsedTime, 0, to.x - startX, duration);
            const animatedY = easings_1.Easings[easing](elapsedTime, 0, to.y - startY, duration);
            this.x = startX + animatedX;
            this.y = startY + animatedY;
            if (elapsedTime < duration)
                window.requestAnimationFrame(updateTick);
        };
        updateTick();
        return this;
    }
    /**
     * Animates the scaling of this object to another specific y position.
     * @param to Scaleing where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentScaling(to, easing, duration) {
        if (typeof this.y !== "number")
            throw new Error("Cannot animate y-axis of object as it does not exist or is not a number.");
        if (typeof this.x !== "number")
            throw new Error("Cannot animate x-axis of object as it does not exist or is not a number.");
        const now = Date.now();
        const startX = this.scaleX;
        const startY = this.scaleY;
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const animatedX = easings_1.Easings[easing](elapsedTime, 0, to.x - startX, duration);
            const animatedY = easings_1.Easings[easing](elapsedTime, 0, to.y - startY, duration);
            this.scaleX = startX + animatedX;
            this.scaleY = startY + animatedY;
            if (elapsedTime < duration)
                window.requestAnimationFrame(updateTick);
        };
        updateTick();
        return this;
    }
}
exports.Camera = Camera;
