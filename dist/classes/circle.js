"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const easings_1 = require("../functions/easings");
const renderobject_1 = require("./renderobject");
class Circle extends renderobject_1.RenderObject {
    constructor(x, y, radius, startRadian, endRadian, counterClockwise, styles) {
        super();
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startRadian = startRadian;
        this.endRadian = endRadian;
        this.counterClockwise = counterClockwise;
        this.styles = Object.assign({}, styles);
    }
    Draw(ctx) {
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
}
exports.Circle = Circle;
