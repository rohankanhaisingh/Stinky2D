"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const uid_1 = require("../functions/uid");
const renderobject_1 = require("./renderobject");
class Rectangle extends renderobject_1.RenderObject {
    /**
     * Creates a grapical render component representing a rectangle, allowing you to customize it manually.
     *
     * The positions always points at the top-left of the component. You might want to use the 'Center' method to adjust the component's positions at the center, based it's width and height.
     * @param x x-axis of the rectangle.
     * @param y
     * @param width
     * @param height
     * @param styles
    */
    constructor(x, y, width, height, styles) {
        super();
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.styles = {};
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
        this.width = width;
        this.height = height;
        this.initialPosition = { x: x, y: y };
        this.initialDimension = { width: width, height: height };
        this.styles = Object.assign({}, styles);
    }
    Draw(ctx) {
        ctx.save();
        ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
        if (this.scaling !== null)
            ctx.scale(this.scaling.x, this.scaling.y);
        if (this.transform !== null) {
            if (this.transform.length !== 6)
                throw new Error("Failed to set transformation on object since property does not contain valid values.");
            ctx.transform(this.transform[0], this.transform[1], this.transform[2], this.transform[3], this.transform[4], this.transform[5]);
        }
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.beginPath();
        renderobject_1.RenderObject.ApplyRenderStyles(ctx, this.styles);
        if (this.styles.backgroundImage) {
            ctx.drawImage(this.styles.backgroundImage, 0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height);
        }
        else {
            if (typeof this.styles.backgroundColor === "string")
                ctx.fillRect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height);
        }
        if (typeof this.styles.borderColor === "string")
            ctx.strokeRect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height);
        ctx.closePath();
        ctx.restore();
        return 0;
    }
    Update(ctx, deltaTime) {
        if (this.dragConfig.isEnabled) {
            const scene = this.dragConfig.scene;
            const isPressed = scene.mouse.buttons[this.dragConfig.button];
            const isInXPosition = scene.mouse.x >= this.x && scene.mouse.x <= this.x + this.width;
            const isInYPosition = scene.mouse.y >= this.y && scene.mouse.y <= this.y + this.height;
            if (isPressed && (isInXPosition && isInYPosition)) {
                if (!this._mouseOffset.active) {
                    const offsetX = this.x - scene.mouse.x;
                    const offsetY = this.y - scene.mouse.y;
                    this._mouseOffset.x = offsetX;
                    this._mouseOffset.y = offsetY;
                    this._mouseOffset.active = true;
                    scene.mouse.isDragging = true;
                }
                if (this.dragConfig.offsetType === "center") {
                    this.x = scene.mouse.x - this.width / 2;
                    this.y = scene.mouse.y - this.height / 2;
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
        return Date.now();
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
        this.dragConfig.isEnabled = true;
        return this;
    }
    /** Disables dragging on this render component. */
    DisableDragging() {
        this.dragConfig.isEnabled = false;
    }
}
exports.Rectangle = Rectangle;
