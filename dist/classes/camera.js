"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const easings_1 = require("../functions/easings");
const math_1 = require("../functions/math");
const rectangle_1 = require("./rectangle");
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
     * The `Focus` function takes a renderObject as input and adjusts the camera or context position to center it on the object within a given scene.
     * It calculates the new x and y coordinates based on the scene dimensions and the renderObject's center.
     * This ensures that the object remains centered in the scene, allowing the user or viewer to focus on it while other elements may be moving.
     *
     * @param renderObject The object the camera should focus on.
     * @param scaling Sets the scaling level when focusing. This can be either a 'Vec2' class or a number. Null can be used to skip this paramater.
     * @param offset Sets the offset level when focusing. This can be either a 'Vec2' class or a number. Null can be used to skip this paramater.
     * @param animation Uses an animation to focus on the given render object.
     */
    Focus(renderObject, scaling, offset, animation) {
        const sceneWidth = this.scene.width, sceneHeight = this.scene.height;
        if (scaling !== null) {
            if (animation) {
                (0, math_1.AnimateInteger)(this.scaleX, scaling instanceof math_1.Vec2 ? scaling.x : scaling, animation.animationName, animation.animationDuration, scale => this.scaleX = scale);
                (0, math_1.AnimateInteger)(this.scaleY, scaling instanceof math_1.Vec2 ? scaling.y : scaling, animation.animationName, animation.animationDuration, scale => this.scaleY = scale);
            }
            else {
                this.scaleX = scaling instanceof math_1.Vec2 ? scaling.x : scaling;
                this.scaleY = scaling instanceof math_1.Vec2 ? scaling.y : scaling;
            }
        }
        // Calculate the offset based on the scaling level.
        let offsetX = 0;
        let offsetY = 0;
        if (offset !== null) {
            offsetX = offset instanceof math_1.Vec2 ? offset.x : offset;
            offsetY = offset instanceof math_1.Vec2 ? offset.y : offset;
        }
        const scaleX = scaling !== null ? (scaling instanceof math_1.Vec2 ? scaling.x : scaling) : this.scaleX;
        const scaleY = scaling !== null ? (scaling instanceof math_1.Vec2 ? scaling.y : scaling) : this.scaleY;
        // Calculate the scaled renderObject center position.
        const scaledCenterX = renderObject instanceof rectangle_1.Rectangle ? (renderObject.x + renderObject.width / 2) * scaleX : (renderObject.x + renderObject.radius) * scaleX;
        const scaledCenterY = renderObject instanceof rectangle_1.Rectangle ? (renderObject.y + renderObject.height / 2) * scaleY : (renderObject.y + renderObject.radius) * scaleY;
        // Calculate the position to center the camera on the scaled renderObject.
        const calculatedHorizontalPosition = -(scaledCenterX - sceneWidth / 2);
        const calculatedVerticalPosition = -(scaledCenterY - sceneHeight / 2);
        if (animation) {
            (0, math_1.AnimateInteger)(this.x, calculatedHorizontalPosition + offsetX, animation.animationName, animation.animationDuration, pos => this.x = pos);
            (0, math_1.AnimateInteger)(this.y, calculatedVerticalPosition + offsetY, animation.animationName, animation.animationDuration, pos => this.y = pos);
        }
        else {
            this.x = calculatedHorizontalPosition + offsetX;
            this.y = calculatedVerticalPosition + offsetY;
        }
        return this;
    }
    Scale(scaling) {
        if (scaling instanceof math_1.Vec2) {
            this.scaleX = scaling.x;
            this.scaleY = scaling.y;
            return this;
        }
        this.scaleX = scaling;
        this.scaleY = scaling;
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
