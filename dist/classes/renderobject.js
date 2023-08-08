"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderObject = exports.AllExistingRenderObjects = void 0;
const colors_1 = require("../constants/colors");
const easings_1 = require("../functions/easings");
const math_1 = require("../functions/math");
const uid_1 = require("../functions/uid");
function checkSquareProperties(obj) {
    if (typeof obj.x === "number" && typeof obj.y === "number" &&
        typeof obj.width === "number" && typeof obj.height === "number")
        return true;
    return false;
}
function isMouseInCircle(mouseX, mouseY, circleX, circleY, circleRadius) {
    const dx = mouseX - circleX, dy = mouseY - circleY, distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= circleRadius;
}
exports.AllExistingRenderObjects = [];
class RenderObject {
    constructor() {
        /** Unique generated id for each render object. */
        this.id = (0, uid_1.UniqueID)(18).id;
        /** Counts the amount of render objects created in general. */
        this.exisitingObjectCount = exports.AllExistingRenderObjects.length + 1;
        /** Timestamp of when the render object has been made. */
        this.timestamp = Date.now();
        /** Array index of renderer instance. */
        this.arrayIndex = 0;
        /** Boolean which determines whether the object is visible or not. */
        this.visible = true;
        /** Forces rendering outside the camera view/ */
        this.forceRendering = false;
        /** Render object attributes. */
        this.attributes = {};
        /** All events stored in this object. */
        this.events = {};
        /** All events that will be emitted once. */
        this.eventsOnce = {};
        /** Event states.*/
        this.eventStates = { hasEntered: false, hasLeft: false, hasClicked: false, isDown: false, isUp: false };
        /** Render object children applied to this instance. */
        this.children = [];
        /** Audio node applied to this instance. */
        this.audioNodes = [];
        this.styleGroups = {};
        this.transform = null;
        this.scaling = null;
        exports.AllExistingRenderObjects.push(this);
    }
    Draw(ctx) { return 0; }
    Update(ctx, deltaTime) { return 0; }
    OnAdd(renderer) { return; }
    _handleEventProperties(isInObject, fixedMousePosition) {
        if (isInObject) {
            if (!this.eventStates.hasEntered) {
                if (typeof this.events["mouseEnter"] === "function")
                    this.events["mouseEnter"]({
                        target: this,
                        mousePosition: fixedMousePosition,
                        mouse: this.scene.mouse
                    });
                this.eventStates.hasLeft = false;
                this.eventStates.hasEntered = true;
            }
            if (this.scene.mouse.buttons.left || this.scene.mouse.buttons.middle || this.scene.mouse.buttons.right) {
                if (!this.eventStates.isDown) {
                    if (typeof this.events["mouseDown"] === "function")
                        this.events["mouseDown"]({
                            target: this,
                            mousePosition: fixedMousePosition,
                            mouse: this.scene.mouse
                        });
                    this.eventStates.isDown = true;
                }
                this.eventStates.isDown = false;
                if (typeof this.events["mouseDown"] === "function")
                    this.scene.mouse.buttons.resetState();
            }
            if (this.scene.mouse.wheelDirection !== null) {
                if (typeof this.events["mouseWheel"] === "function")
                    this.events["mouseWheel"]({
                        target: this,
                        mousePosition: fixedMousePosition,
                        mouse: this.scene.mouse
                    });
                this.scene.mouse.wheelDirection = null;
            }
        }
        else {
            if (this.eventStates.hasClicked)
                this.eventStates.hasClicked = false;
            if (this.eventStates.hasEntered) {
                if (typeof this.events["mouseOut"] === "function")
                    this.events["mouseOut"]({
                        target: this,
                        mousePosition: fixedMousePosition,
                        mouse: this.scene.mouse
                    });
                this.eventStates.hasLeft = true;
                this.eventStates.hasEntered = false;
            }
        }
    }
    _updateOnMouseOverEvent() {
        const fixedMousePosition = this.scene.GetFixedMousePosition();
        if (typeof this.width === "number" && typeof this.height === "number") {
            const isInObject = fixedMousePosition.x >= this.x && fixedMousePosition.x <= this.x + this.width && fixedMousePosition.y >= this.y && fixedMousePosition.y <= this.y + this.height;
            this._handleEventProperties(isInObject, fixedMousePosition);
        }
        if (typeof this.radius === "number")
            this._handleEventProperties(isMouseInCircle(fixedMousePosition.x, fixedMousePosition.y, this.x, this.y, this.radius), fixedMousePosition);
    }
    // =============== Public shit ===============
    UpdateEvents() {
        if (typeof this.scene === "undefined" && typeof this.renderer === "undefined")
            return this;
        if (typeof this.renderer.camera === "undefined")
            return;
        this._updateOnMouseOverEvent();
        if (this.visible) {
            if (typeof this.events["render"] === "function")
                this.events["render"]({
                    target: this,
                    timestamp: Date.now()
                });
        }
    }
    /**
     * Centers the render object based on the object's dimensions and position.
     * @param x x-axis.
     * @param y y-axis.
     */
    Center(x, y) {
        if (!checkSquareProperties(this))
            throw new Error("Cannot center render object since properties 'x', 'y', 'width' and 'height' does not exist.");
        this.x = x - (this.width / 2);
        this.y = y - (this.height / 2);
        return this;
    }
    /** Sets the position of this object using a method. */
    SetPosition(x, y) {
        if (x instanceof math_1.Vec2) {
            this.x = x.x;
            this.y = x.y;
            return this;
        }
        if (typeof this.x !== "number")
            throw new Error("Cannot set x-axis of object, as it does not exist or is not a number.");
        if (typeof this.y !== "number")
            throw new Error("Cannot set y-axis of object, as it does not exist or is not a number.");
        if (typeof x === "undefined" || typeof y === "undefined")
            throw new Error();
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Returns a new Vec2 class provided with the position of this renderobject.
     * @returns
     */
    GetPosition() {
        return new math_1.Vec2(this.x, this.y);
    }
    SetFixedSize(width, height, position) {
        if (typeof this.x !== "number")
            throw new Error("Cannot set x-axis of object, as it does not exist or is not a number.");
        if (typeof this.y !== "number")
            throw new Error("Cannot set y-axis of object, as it does not exist or is not a number.");
        if (typeof this.width !== "number")
            throw new Error("Cannot set width of object, as it does not exist or is not a number.");
        if (typeof this.height !== "number")
            throw new Error("Cannot set height of object, as it does not exist or is not a number.");
        this.width = width;
        this.height = height;
        this.x = position.x - (this.width / 2);
        this.y = position.y - (this.height / 2);
    }
    /**
     * Changes the size using a method
     * @param width Width of this component.
     * @param height Height of this component.
     */
    ChangeSize(width, height) {
        if (typeof this.width !== "number" || typeof this.height !== "number")
            return this;
        this.width = width !== null ? width : this.width;
        this.height = height !== null ? height : this.height;
        return this;
    }
    SetSize(vector) {
        if (typeof this.width !== "number" || typeof this.height !== "number")
            return this;
        this.width = vector.x;
        this.height = vector.y;
    }
    /**
     * Animates the x position of this object to another specific x position.
     * @param endX Position where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentXPosition(to, easing, duration) {
        if (typeof this.x !== "number")
            throw new Error("Cannot animate x-axis of object as it does not exist or is not a number.");
        let time = Date.now();
        let tick = 0;
        let startX = this.x;
        const updateTick = () => {
            const elapsedTime = Date.now() - time;
            const easingValue = easings_1.Easings[easing](elapsedTime, 0, to - startX, duration);
            this.x = startX + easingValue;
            if (elapsedTime < duration)
                window.requestAnimationFrame(updateTick);
        };
        updateTick();
        return this;
    }
    /**
     * Animates the y position of this object to another specific y position.
     * @param endY Position where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentYPosition(to, easing, duration) {
        if (typeof this.y !== "number")
            throw new Error("Cannot animate y-axis of object as it does not exist or is not a number.");
        let time = Date.now();
        let startY = this.y;
        const updateTick = () => {
            const elapsedTime = Date.now() - time;
            const easingValue = easings_1.Easings[easing](elapsedTime, 0, to - startY, duration);
            this.y = startY + easingValue;
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
     * Animates this render component from one position to another
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
     * Animates the background color to a desired color
     * @param to Color
     * @param easing Animation type
     * @param duration Duration of the animation
     */
    AnimateCurrentBackgroundColor(to, easing, duration) {
        if (typeof this.styles === "undefined")
            throw new Error("Cannot reanimate background color as object 'styles' does not exist in this class instance.");
        if (typeof this.styles.backgroundColor !== "string")
            throw new Error("Cannot animate background color as it contains an invalid value.");
        const now = Date.now();
        const currentColor = (0, colors_1.FixedHexToRgbArray)(this.styles.backgroundColor);
        const endColor = (0, colors_1.FixedHexToRgbArray)(to);
        if (endColor === null || currentColor === null)
            throw new Error("Cannot animate background color as it contains an invalid value.");
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const r = easings_1.Easings[easing](elapsedTime, 0, endColor[0] - currentColor[0], duration);
            const g = easings_1.Easings[easing](elapsedTime, 0, endColor[1] - currentColor[1], duration);
            const b = easings_1.Easings[easing](elapsedTime, 0, endColor[2] - currentColor[2], duration);
            const byteArray = [currentColor[0] + r, currentColor[1] + g, currentColor[2] + b];
            const convertedHeximalString = (0, colors_1.ConvertByteArrayToHex)(byteArray);
            this.styles.backgroundColor = `#${convertedHeximalString}`;
            if (elapsedTime < duration) {
                window.requestAnimationFrame(updateTick);
            }
            else {
                this.styles.backgroundColor = to;
            }
        };
        updateTick();
        return this;
    }
    /**
     * Animates the border color to a desired color
     * @param to Color
     * @param easing Animation type
     * @param duration Duration of the animation
     */
    AnimateCurrentBorderColor(to, easing, duration) {
        if (typeof this.styles === "undefined")
            throw new Error("Cannot reanimate border color as object 'styles' does not exist in this class instance.");
        if (typeof this.styles.borderColor !== "string")
            throw new Error("Cannot border background color as it contains an invalid value.");
        const now = Date.now();
        const currentColor = (0, colors_1.FixedHexToRgbArray)(this.styles.borderColor);
        const endColor = (0, colors_1.FixedHexToRgbArray)(to);
        if (endColor === null || currentColor === null)
            throw new Error("Cannot border background color as it contains an invalid value.");
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const r = easings_1.Easings[easing](elapsedTime, 0, endColor[0] - currentColor[0], duration);
            const g = easings_1.Easings[easing](elapsedTime, 0, endColor[1] - currentColor[1], duration);
            const b = easings_1.Easings[easing](elapsedTime, 0, endColor[2] - currentColor[2], duration);
            const byteArray = [currentColor[0] + r, currentColor[1] + g, currentColor[2] + b];
            const convertedHeximalString = (0, colors_1.ConvertByteArrayToHex)(byteArray);
            this.styles.borderColor = `#${convertedHeximalString}`;
            if (elapsedTime < duration) {
                window.requestAnimationFrame(updateTick);
            }
            else {
                this.styles.borderColor = to;
            }
        };
        updateTick();
        return this;
    }
    /**
     * Animates the border color to a desired color
     * @param to Color
     * @param easing Animation type
     * @param duration Duration of the animation
     */
    AnimateCurrentShadowColor(to, easing, duration) {
        if (typeof this.styles === "undefined")
            throw new Error("Cannot reanimate shadow color as object 'styles' does not exist in this class instance.");
        if (typeof this.styles.shadowColor !== "string")
            throw new Error("Cannot shadow background color as it contains an invalid value.");
        const now = Date.now();
        const currentColor = (0, colors_1.FixedHexToRgbArray)(this.styles.shadowColor);
        const endColor = (0, colors_1.FixedHexToRgbArray)(to);
        if (endColor === null || currentColor === null)
            throw new Error("Cannot shadow background color as it contains an invalid value.");
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const r = easings_1.Easings[easing](elapsedTime, 0, endColor[0] - currentColor[0], duration);
            const g = easings_1.Easings[easing](elapsedTime, 0, endColor[1] - currentColor[1], duration);
            const b = easings_1.Easings[easing](elapsedTime, 0, endColor[2] - currentColor[2], duration);
            const byteArray = [currentColor[0] + r, currentColor[1] + g, currentColor[2] + b];
            const convertedHeximalString = (0, colors_1.ConvertByteArrayToHex)(byteArray);
            this.styles.shadowColor = `#${convertedHeximalString}`;
            if (elapsedTime < duration) {
                window.requestAnimationFrame(updateTick);
            }
            else {
                this.styles.shadowColor = to;
            }
        };
        updateTick();
        return this;
    }
    /**
     * Animates the current rotation value.
     * @param to Rotation where the animation will end.
     * @param easing Name of the animation.
     * @param duration Duration of the animation.
     */
    AnimateCurrentRotation(to, easing, duration) {
        if (typeof this.rotation !== "number")
            throw new Error("Cannot animate rotation of object as it does not exist or is not a number.");
        const now = Date.now();
        const startRotation = this.rotation;
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const easingValue = easings_1.Easings[easing](elapsedTime, 0, to - startRotation, duration);
            this.rotation = startRotation + easingValue;
            if (elapsedTime < duration)
                window.requestAnimationFrame(updateTick);
        };
        updateTick();
        return this;
    }
    /**
     * Appends an event listener which will be evoked when any of these event gets triggered.
     *
     * When an event listener already exists, an error will be returned.
     * @param event
     * @param cb
     */
    AddEventListener(event, cb) {
        if (typeof event !== "string")
            throw new Error("Cannot add event since event argument is not a string type.");
        if (typeof cb !== "function")
            throw new Error("Cannot add event since callback argument is not a function type.");
        this.events[event] = cb;
        if (event === "mouseUp" || event === "mouseClick") {
            throw new Error(`Failed to set ${event} event listener on object id ${this.id}.`);
        }
        return this;
    }
    /**
     * Sets a data attribute to this instance, allowing every
     * instance to be unique.
     *
     * @param attributeName Name of attribute.
     * @param value Value of attribute, which has to be a string.
     */
    SetDataAttribute(attributeName, value) {
        this.attributes[attributeName] = value;
        return this;
    }
    /**
     * Returns a set attribute with its value. The value can be either
     * a string or null if no attribute is set.
     *
     * @param attributeName Name of attribute.
     * */
    GetDataAttribute(attributeName) {
        const foundAttribute = this.attributes[attributeName];
        return typeof foundAttribute === "undefined" ? null : foundAttribute;
    }
    /**
     * Sets a style property on this render object instance.
     *
     * @param style Key of the RenderObjectStyles interface.
     * @param value Value of the style.
    */
    SetStyle(style, value) {
        return this.styles[style] = value;
    }
    // =============== Static methods ===============
    /**
     * Animates just a number from a start value, to an ending value.
     * @param from The value where you want to start animating.
     * @param to The value where you want the animation to end.
     * @param easing Animation type.
     * @param duration Duration of the animation.
     * @param callback A function that will be called while animating, passing the animated value as argument.
    */
    static AnimateNumber(from, to, easing, duration, callback) {
        const now = Date.now();
        const updateTick = () => {
            const elapsedTime = Date.now() - now;
            const easingValue = easings_1.Easings[easing](elapsedTime, 0, to - from, duration);
            callback(from + easingValue);
            if (elapsedTime < duration)
                window.requestAnimationFrame(updateTick);
        };
        updateTick();
    }
    /**
     * Set the scaling on this render object using a
     * Vector2 represented number object.
     **/
    SetScaling(scale) {
        this.scaling = scale;
        return this;
    }
    /**
     * Set the scale x property on this render object.
     * Or return the current set x scaling value of this object
     * as a number.
     * */
    ScaleX(number) {
        if (typeof number === "number") {
            if (this.scaling === null)
                this.scaling = {
                    x: 1,
                    y: 1
                };
            this.scaling.x = number;
            return this.scaling.x;
        }
        return this.scaling === null ? null : this.scaling.x;
    }
    /**
     * Set the scale y property on this render object.
     * Or return the current set y scaling value of this object
     * as a number.
     * */
    ScaleY(number) {
        if (typeof number === "number") {
            if (this.scaling === null)
                this.scaling = {
                    x: 1,
                    y: 1
                };
            this.scaling.y = number;
            return this.scaling.y;
        }
        return this.scaling === null ? null : this.scaling.y;
    }
    /** Disables scaling which may imrove the rendering performance. */
    DisableScaling() {
        this.scaling = null;
        return this;
    }
    /**
     *  Enables scaling by setting the values for both x and y to 1 by default.
     *
     *  This method is optional to enable scaling. Scaling can also be enabled using
     *  the following methods:
     *
     *  SetScaling(scalingObject);
     *  ScaleX(scale);
     *  ScaleY(scale);
     */
    EnableScaling() {
        this.scaling = { x: 1, y: 1 };
        return this;
    }
    SetTransform(horizontalScaling, verticalSkewing, horizontalSkewing, verticalScaling, horizontalTranslation, verticalTranslation) {
        this.transform = [
            horizontalScaling,
            verticalSkewing,
            horizontalSkewing,
            verticalScaling,
            horizontalTranslation,
            verticalTranslation
        ];
        return this;
    }
    /**
     * Gets a specific transform property and return its value.
     *
     * Will return null if the transform property does not contain valid values.
     * */
    GetTransformProperty(transformProperty) {
        if (this.transform === null)
            return null;
        switch (transformProperty) {
            case "hozirontalScaling": return this.transform[0];
            case "verticalSkewing": return this.transform[1];
            case "horizontalSkewing": return this.transform[2];
            case "verticalScaling": return this.transform[3];
            case "horizontalTranslation": return this.transform[4];
            case "verticalTranslation": return this.transform[5];
        }
        return null;
    }
    SetTransformProperty(transformProperty, value) {
        if (this.transform === null)
            return null;
        switch (transformProperty) {
            case "hozirontalScaling": this.transform[0] = value;
            case "verticalSkewing": this.transform[1] = value;
            case "horizontalSkewing": this.transform[2] = value;
            case "verticalScaling": this.transform[3] = value;
            case "horizontalTranslation": this.transform[4] = value;
            case "verticalTranslation": this.transform[5] = value;
        }
        return this.transform;
    }
    /**
     * Creates an style group to change the rendering styles of this object.
     * @param name Name of the styles
     * @param styles Styles
     */
    CreateStyleGroup(name, styles) {
        if (typeof this.styleGroups[name] !== "undefined")
            throw new Error(`Cannot overwrite style group since group named '${name}' already exist.`);
        this.styleGroups[name] = styles;
        return this;
    }
    DeleteStyleGroup(name) {
        if (typeof this.styleGroups[name] === "undefined")
            throw new Error(`Cannot delete style group '${name}' since it does not exist.`);
        delete this.styleGroups[name];
        return this;
    }
    /**
     * Uses a style group. Will throw an error if group does not exist.
     * @param name Name of the style group
     * @returns
     */
    UseStyleGroup(name) {
        if (typeof this.styleGroups[name] === "undefined")
            throw new Error(`Cannot use style group '${name}' since it does not exist.`);
        for (let key in this.styleGroups[name])
            // @ts-ignore
            this.SetStyle(key, this.styleGroups[name][key]);
        return this;
    }
    /** Fuckinf fucky fuck fuck fuck */
    static ApplyRenderStyles(ctx, styles) {
        const startedAt = Date.now();
        if (typeof styles.direction === "string")
            ctx.direction = styles.direction;
        if (typeof styles.backgroundColor === "string")
            ctx.fillStyle = styles.backgroundColor;
        if (typeof styles.textColor === "string")
            ctx.fillStyle = styles.textColor;
        if (typeof styles.filter === "string")
            ctx.filter = styles.filter;
        if (typeof styles.font === "string")
            ctx.font = styles.font;
        if (typeof styles.opacity === "number")
            ctx.globalAlpha = styles.opacity;
        if (typeof styles.globalCompositeOperation === "string")
            ctx.globalCompositeOperation = styles.globalCompositeOperation;
        if (typeof styles.imageSmoothingEnabled === "boolean")
            ctx.imageSmoothingEnabled = styles.imageSmoothingEnabled;
        if (typeof styles.imageSmoothingQuality === "string")
            ctx.imageSmoothingQuality = styles.imageSmoothingQuality;
        if (typeof styles.lineCap === "string")
            ctx.lineCap = styles.lineCap;
        if (typeof styles.lineDashOffset === "number")
            ctx.lineDashOffset = styles.lineDashOffset;
        if (typeof styles.lineJoin === "string")
            ctx.lineJoin = styles.lineJoin;
        if (typeof styles.miterLimit === "number")
            ctx.miterLimit = styles.miterLimit;
        if (typeof styles.borderWidth === "number")
            ctx.lineWidth = styles.borderWidth;
        if (typeof styles.strokeWidth === "number")
            ctx.lineWidth = styles.strokeWidth;
        if (typeof styles.lineWidth === "number")
            ctx.lineWidth = styles.lineWidth;
        if (typeof styles.borderColor === "string")
            ctx.strokeStyle = styles.borderColor;
        if (typeof styles.strokeColor === "string")
            ctx.strokeStyle = styles.strokeColor;
        if (typeof styles.textStrokeColor === "string")
            ctx.strokeStyle = styles.textStrokeColor;
        if (typeof styles.shadowBlur === "number")
            ctx.shadowBlur = styles.shadowBlur;
        if (typeof styles.shadowColor === "string")
            ctx.shadowColor = styles.shadowColor;
        if (typeof styles.shadowOffsetX === "number")
            ctx.shadowOffsetX = styles.shadowOffsetX;
        if (typeof styles.shadowOffsetY === "number")
            ctx.shadowOffsetY = styles.shadowOffsetY;
        if (typeof styles.textAlign === "string")
            ctx.textAlign = styles.textAlign;
        if (typeof styles.textBaseline === "string")
            ctx.textBaseline = styles.textBaseline;
        const endedAt = Date.now();
        return {
            startedAt: startedAt,
            endedAt: endedAt,
            duration: endedAt - startedAt
        };
    }
}
exports.RenderObject = RenderObject;
