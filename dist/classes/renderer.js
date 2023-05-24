"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const uid_1 = require("../functions/uid");
const camera_1 = require("./camera");
const collection_1 = require("./collection");
const offscreen_renderer_1 = require("./offscreen-renderer");
class Renderer {
    /**
     * By creating a 'renderer' instance, the program can draw images.
     * This must be manually linked to a 'Scene' instance. If not, no graphics can be displayed
     * @param scene The scene that will be linked to the renderer.
     * @param attributes Attributes specifying the behaviour of the renderer.
     */
    constructor(scene, attributes) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.renderObjects = [];
        this.visibleRenderObjects = [];
        this.attributes = {};
        this.transform = null;
        this.picking = false;
        this.pickDelay = 100;
        this.lastPicked = Date.now();
        this.scene = scene;
        this.attributes = Object.assign({}, attributes);
        this.context = scene.canvasElement.getContext("2d", attributes);
        scene.renderer = this;
        window.Stinky2D[this.id] = this;
    }
    /** Clears the entire scene, which will end up showing a black scene. */
    ClearScene() {
        const ctx = this.context;
        const scene = this.scene;
        ctx.clearRect(0, 0, scene.width, scene.height);
        return this;
    }
    /**
     * This method paints the entire scene using the given color.
     * This method does not work together with the 'ClearScene' method
     *
     * Note that everything will be erased once this method is used.
     * It will also erase when the window has been resized.
     * @param color Color used for painting.
     */
    PaintScene(color) {
        const ctx = this.context;
        const scene = this.scene;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, scene.width, scene.height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        return this;
    }
    /** Render all objects in conjunction with the camera linked to this instance */
    RenderObjectsInCamera(deltaTime, renderMode) {
        if (!(this.camera instanceof camera_1.Camera))
            throw new Error("Cannot render objects in camera since no camera has been specified.");
        const results = {
            startedAt: Date.now(),
            endedAt: 0,
            duration: 0,
            renderedAmountOfObjects: 0
        };
        const ctx = this.context;
        const camera = this.camera;
        const visibleObjects = [];
        ctx.save();
        if (this.transform !== null)
            ctx.transform(this.transform[0], this.transform[1], this.transform[2], this.transform[3], this.transform[4], this.transform[5]);
        ctx.translate(camera.x, camera.y);
        ctx.scale(camera.scaleX, camera.scaleY);
        let i = 0;
        while (i < this.renderObjects.length) {
            const obj = this.renderObjects[i];
            if (!this.camera.offScreenRendering) {
                if (typeof obj.width === "number" && typeof obj.height === "number") {
                    if (!obj.forceRendering) {
                        if (obj.x > -(((this.camera.x + 30) / this.camera.scaleX) + (obj.width)) && obj.x < -((this.camera.x - this.camera.width) / this.camera.scaleX) &&
                            obj.y > -((this.camera.y + 30) / this.camera.scaleY) && obj.y < -((this.camera.y - (this.camera.height))) / this.camera.scaleY) {
                            visibleObjects.push(obj);
                            obj.visible = true;
                            if (typeof obj.Draw === "function")
                                obj.Draw(this.context);
                            if (typeof obj.Update === "function")
                                obj.Update(this.context, deltaTime);
                            if (obj.spritesheetController)
                                obj.spritesheetController.Update(deltaTime);
                        }
                        else {
                            obj.visible = false;
                        }
                    }
                    else {
                        if (typeof obj.Draw === "function")
                            obj.Draw(this.context);
                        if (typeof obj.Update === "function")
                            obj.Update(this.context, deltaTime);
                        if (obj.spritesheetController)
                            obj.spritesheetController.Update(deltaTime);
                        visibleObjects.push(obj);
                        obj.visible = false;
                    }
                }
                if (typeof obj.radius === "number") {
                    if (!obj.forceRendering) {
                        if (obj.x > -(((this.camera.x + 30) / this.camera.scaleX) + (obj.radius)) && obj.x < -((this.camera.x - this.camera.width) / this.camera.scaleX) &&
                            obj.y > -((this.camera.y + 30) / this.camera.scaleY) && obj.y < -((this.camera.y - (this.camera.height))) / this.camera.scaleY) {
                            visibleObjects.push(obj);
                            obj.visible = true;
                            if (typeof obj.Draw === "function")
                                obj.Draw(this.context);
                            if (typeof obj.Update === "function")
                                obj.Update(this.context, deltaTime);
                            if (obj.spritesheetController)
                                obj.spritesheetController.Update(deltaTime);
                        }
                        else {
                            obj.visible = false;
                        }
                    }
                    else {
                        if (typeof obj.Draw === "function")
                            obj.Draw(this.context);
                        if (typeof obj.Update === "function")
                            obj.Update(this.context, deltaTime);
                        if (obj.spritesheetController)
                            obj.spritesheetController.Update(deltaTime);
                        visibleObjects.push(obj);
                        obj.visible = false;
                    }
                }
            }
            else {
                if (typeof obj.Draw === "function")
                    obj.Draw(this.context);
                if (typeof obj.Update === "function")
                    obj.Update(this.context, deltaTime);
                if (obj.spritesheetController)
                    obj.spritesheetController.Update(deltaTime);
            }
            i += 1;
        }
        this.visibleRenderObjects = visibleObjects;
        if (this.picking) {
            const now = Date.now();
            if (now > this.lastPicked + this.pickDelay) {
                this.lastPicked = now;
            }
        }
        ctx.restore();
        results.renderedAmountOfObjects = visibleObjects.length;
        results.endedAt = Date.now();
        results.duration = results.endedAt - results.startedAt;
        return results;
    }
    RenderCopiedTexture(target, options) {
        let canvas = null;
        if (target instanceof offscreen_renderer_1.OffscreenRenderer)
            canvas = target.canvas;
        if (target instanceof HTMLCanvasElement)
            canvas = target;
        if (canvas === null)
            throw new Error("Cannot renderer copied texture.");
        const ctx = this.context;
        const _options = Object.assign({}, options);
        ctx.save();
        ctx.globalAlpha = typeof _options.opacity === "number" ? _options.opacity : 1;
        ctx.imageSmoothingEnabled = typeof _options.imageSmoothingEnabled === "boolean" ? _options.imageSmoothingEnabled : true;
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(canvas, 0, 0, this.scene.width, this.scene.height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    }
    /** Renders a specific render object. Throws an error if no camera instance has been applied to this renderer. */
    Render(renderObject, deltaTime) {
        if (!(this.camera instanceof camera_1.Camera))
            throw new Error("Cannot render objects in camera since no camera has been specified.");
        const results = {
            startedAt: Date.now(),
            endedAt: 0,
            duration: 0,
            renderedAmountOfObjects: 0
        };
        const ctx = this.context;
        const camera = this.camera;
        ctx.save();
        if (this.transform !== null)
            ctx.transform(this.transform[0], this.transform[1], this.transform[2], this.transform[3], this.transform[4], this.transform[5]);
        ctx.translate(camera.x, camera.y);
        ctx.scale(camera.scaleX, camera.scaleY);
        const obj = renderObject;
        if (!this.camera.offScreenRendering) {
            if (typeof obj.width === "number" && typeof obj.height === "number") {
                if (!obj.forceRendering) {
                    if (obj.x > -(((this.camera.x + 30) / this.camera.scaleX) + (obj.width)) && obj.x < -((this.camera.x - this.camera.width) / this.camera.scaleX) &&
                        obj.y > -((this.camera.y + 30) / this.camera.scaleY) && obj.y < -((this.camera.y - (this.camera.height))) / this.camera.scaleY) {
                        obj.visible = true;
                        if (typeof obj.Draw === "function")
                            obj.Draw(this.context);
                        if (typeof obj.Update === "function")
                            obj.Update(this.context, deltaTime);
                        if (obj.spritesheetController)
                            obj.spritesheetController.Update(deltaTime);
                    }
                    else {
                        obj.visible = false;
                    }
                }
                else {
                    if (typeof obj.Draw === "function")
                        obj.Draw(this.context);
                    if (typeof obj.Update === "function")
                        obj.Update(this.context, deltaTime);
                    if (obj.spritesheetController)
                        obj.spritesheetController.Update(deltaTime);
                    obj.visible = false;
                }
            }
            if (typeof obj.radius === "number") {
                if (!obj.forceRendering) {
                    if (obj.x > -(((this.camera.x + 30) / this.camera.scaleX) + (obj.radius)) && obj.x < -((this.camera.x - this.camera.width) / this.camera.scaleX) &&
                        obj.y > -((this.camera.y + 30) / this.camera.scaleY) && obj.y < -((this.camera.y - (this.camera.height))) / this.camera.scaleY) {
                        obj.visible = true;
                        if (typeof obj.Draw === "function")
                            obj.Draw(this.context);
                        if (typeof obj.Update === "function")
                            obj.Update(this.context, deltaTime);
                        if (obj.spritesheetController)
                            obj.spritesheetController.Update(deltaTime);
                    }
                    else {
                        obj.visible = false;
                    }
                }
                else {
                    if (typeof obj.Draw === "function")
                        obj.Draw(this.context);
                    if (typeof obj.Update === "function")
                        obj.Update(this.context, deltaTime);
                    if (obj.spritesheetController)
                        obj.spritesheetController.Update(deltaTime);
                    obj.visible = false;
                }
            }
        }
        else {
            if (typeof obj.Draw === "function")
                obj.Draw(this.context);
            if (typeof obj.Update === "function")
                obj.Update(this.context, deltaTime);
            if (obj.spritesheetController)
                obj.spritesheetController.Update(deltaTime);
        }
        if (this.picking) {
            const now = Date.now();
            if (now > this.lastPicked + this.pickDelay)
                this.lastPicked = now;
        }
        ctx.restore();
        results.endedAt = Date.now();
        results.duration = results.endedAt - results.startedAt;
        return results;
    }
    /**
     * Adds a render object to this renderer instance.
     *
     * An error might be thrown if an instance already has been added to this renderer.
     * @param renderObject
    */
    Add(renderObject) {
        let hasFoundObject = false;
        for (let i = 0; i < this.renderObjects.length; i++) {
            const foundObject = this.renderObjects[i];
            if (foundObject.id === renderObject.id)
                hasFoundObject = true;
        }
        if (hasFoundObject)
            throw new Error(`Failed to add renderobject (objectID: ${renderObject.id}) to renderer since it has already been added.`);
        renderObject.scene = this.scene;
        renderObject.renderer = this;
        this.renderObjects.push(renderObject);
        renderObject.OnAdd(this);
        return renderObject;
    }
    /**Enables the ability to analyze the colors in the rendered image */
    EnablePicking() {
        this.lastPicked = Date.now();
        return this.picking = true;
    }
    /**Disables the ability to analyze the colors in the rendered image */
    DisablePicking() {
        this.lastPicked = Date.now();
        return this.picking = false;
    }
    /**
     *  Sets a delay in which the rendered image is analyzed
     *	The default value is 100.
     *
     *	Does not accept float numbers.
     *
     * @param delay Delay in milliseconds.
     */
    SetPickDelay(delay) {
        return this.pickDelay = delay;
    }
    /**
     *
     * This method returns an ImageData object representing the underlying pixel data for a specified portion of the canvas
     * using the CanvasRenderingContext2D.getImageData method.
     *
     * If the rendered image is analyzed multiple times, make sure the 'willReadFrequently' option is enabled when building a 'Renderer' class.
     * The greater the value of the desired width and height of the analysis, the more time it will take to perform the analysis.
     * WebGL can be used to make the analysis faster, through the graphics card.
     * */
    GetImageData(startX, startY, width, height, colorSpace) {
        return this.context.getImageData(startX, startY, width, height, {
            colorSpace: colorSpace ? colorSpace : "display-p3"
        });
    }
    Destroy(renderObject) {
        for (let i = 0; i < this.renderObjects.length; i++) {
            const obj = this.renderObjects[i];
            if (obj.id === renderObject.id) {
                this.renderObjects.splice(i, 1);
                break;
            }
        }
        return this;
    }
    /**
     * Searches a render object by filtering specific attributes and checking the
     * value if they match the entered values.
     *
     * This method returns either the found render object stored in an array, or null
     * if no object has been found.
     *
     * The returning array with render objects can automatically be stored in a Collection
     * instance if the argument 'useCollection' is set to true.
     * */
    GetObjectByDataAttribute(attributeName, attributeValue, useCollection) {
        const objects = this.renderObjects;
        const foundObjects = [];
        for (const object of objects) {
            if (typeof object.attributes[attributeName] === "string") {
                if (object.attributes[attributeName] === attributeValue) {
                    foundObjects.push(object);
                }
            }
        }
        if (foundObjects.length === 0)
            return null;
        return useCollection === true ? new collection_1.Collection(foundObjects) : foundObjects;
    }
    QuerySelector(selector) {
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
    /**
     * Sets a specific transform property on the whole renderer itself.
     *
     * */
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
}
exports.Renderer = Renderer;
