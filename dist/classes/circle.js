"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const easings_1 = require("../functions/easings");
const renderobject_1 = require("./renderobject");
function isMouseInCircle(mouseX, mouseY, circleX, circleY, circleRadius) {
    const dx = mouseX - circleX, dy = mouseY - circleY, distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= circleRadius;
}
class Circle extends renderobject_1.RenderObject {
    constructor(x, y, radius, startRadian, endRadian, counterClockwise, styles) {
        super();
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.dragConfig = {
            isEnabled: false,
            offsetType: null,
            scene: null,
            button: "left"
        };
        this._mouseOffset = {
            active: false,
            x: 0,
            y: 0
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startRadian = startRadian;
        this.endRadian = endRadian;
        this.counterClockwise = counterClockwise;
        this.styles = Object.assign({}, styles);
    }
    Draw(ctx) {
        if (this.radius < 0)
            return 0;
        ctx.save();
        ctx.beginPath();
        renderobject_1.RenderObject.ApplyRenderStyles(ctx, this.styles);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.arc(0, 0, this.radius, this.startRadian * Math.PI / 180, this.endRadian * Math.PI / 180, this.counterClockwise);
        if (typeof this.styles.backgroundColor === "string")
            ctx.fill();
        if (typeof this.styles.borderColor === "string")
            ctx.stroke();
        ctx.closePath();
        ctx.restore();
        return 0;
    }
    Update(ctx, deltaTime) {
        if (this.dragConfig.isEnabled) {
            const scene = this.dragConfig.scene;
            const isPressed = scene.mouse.buttons[this.dragConfig.button];
            const isInCircle = isMouseInCircle(scene.mouse.x, scene.mouse.y, this.x, this.y, this.radius);
            if (isPressed && isInCircle) {
                if (!this._mouseOffset.active) {
                    const offsetX = this.x - scene.mouse.x;
                    const offsetY = this.y - scene.mouse.y;
                    this._mouseOffset.x = offsetX;
                    this._mouseOffset.y = offsetY;
                    this._mouseOffset.active = true;
                    scene.mouse.isDragging = true;
                }
                if (this.dragConfig.offsetType === "center") {
                    this.x = scene.mouse.x;
                    this.y = scene.mouse.y;
                }
                if (this.dragConfig.offsetType === "offset") {
                    this.x = scene.mouse.x + this._mouseOffset.x;
                    this.y = scene.mouse.y + this._mouseOffset.y;
                }
            }
            else {
                this._mouseOffset.active = false;
            }
        }
        this.UpdateEvents();
        return 0;
    }
    AnimateCurrentStartAngle(to, easing, duration) {
        if (typeof this.rotation !== "number")
            throw new Error("Cannot animate rotation of object as it does not exist or is not a number.");
        const now = Date.now();
        const startRadian = this.startRadian;
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const easingValue = easings_1.Easings[easing](elapsedTime, 0, to - startRadian, duration);
            this.startRadian = startRadian + easingValue;
            if (elapsedTime < duration) {
                window.requestAnimationFrame(updateTick);
            }
            else {
                this.endRadian = to;
            }
        };
        updateTick();
        return this;
    }
    AnimateCurrentEndAngle(to, easing, duration) {
        if (typeof this.rotation !== "number")
            throw new Error("Cannot animate rotation of object as it does not exist or is not a number.");
        const now = Date.now();
        const endRadian = this.endRadian;
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const easingValue = easings_1.Easings[easing](elapsedTime, 0, to - endRadian, duration);
            this.endRadian = endRadian + easingValue;
            if (elapsedTime < duration) {
                window.requestAnimationFrame(updateTick);
            }
            else {
                this.endRadian = to;
            }
        };
        updateTick();
        return this;
    }
    AnimateCurrentRadius(to, easing, duration) {
        if (typeof this.radius !== "number")
            throw new Error("Cannot animate radius of object as it does not exist or is not a number.");
        const now = Date.now(), currentRadius = this.radius;
        const updateTick = () => {
            const elapsedTime = Date.now() - now, easedValue = easings_1.Easings[easing](elapsedTime, 0, to - currentRadius, duration);
            this.radius = currentRadius + easedValue;
            if (elapsedTime < duration)
                window.requestAnimationFrame(updateTick);
            else
                this.radius = to;
        };
        updateTick();
    }
    /**
     * Configures the 'drag' function.
     * @param scene The scene used to access the mouse object.
     * @param offsetType Offset type
     */
    ConfigureDragging(scene, offsetType, button) {
        scene.mouse.isDragging = false;
        this.dragConfig.scene = scene;
        this.dragConfig.offsetType = offsetType;
        this.dragConfig.button = button;
        return this;
    }
    /**
     * Enables dragging on this render component based on the set dragging configuration.
     *
     * Will return an error if this component has not been configurated.
     */
    EnableDragging() {
        if (this.dragConfig.offsetType === null || this.dragConfig.scene === null)
            throw new Error("Cannot enable the 'drag' function because the render component is not properly configured. If you did configure the component, make sure the 'EnableDragging' function is called after you have configured the component.");
        return this.dragConfig.isEnabled = true;
    }
    /** Disables dragging on this render component. */
    DisableDragging() {
        return this.dragConfig.isEnabled = false;
    }
}
exports.Circle = Circle;
