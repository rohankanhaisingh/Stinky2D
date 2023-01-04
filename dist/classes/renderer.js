"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const uid_1 = require("../functions/uid");
const camera_1 = require("./camera");
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
    /**Clears the entire scene, which will end up showing a black scene. */
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
    RenderObjectsInCamera(deltaTime) {
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
            ctx.transform(this.transform.horizontalScaling, this.transform.verticalSkewing, this.transform.horizontalSkewing, this.transform.verticalScaling, this.transform.horizontalTranslation, this.transform.verticalTranslation);
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
    /**
     * Adds a render object to this renderer instance.
     *
     * An error might be thrown if an instance already has been added to this renderer.
     * @param renderObject
    //*/
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
    GetImageData(startX, startY, width, height) {
        return this.context.getImageData(startX, startY, width, height, { colorSpace: "display-p3" });
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
}
exports.Renderer = Renderer;
