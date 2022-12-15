import { CameraConstructor, RendererAttributes, RendererConstructor, Rendering, SceneConstructor, TransformMatrices, UniqueIDFilterKeywords } from "../typings";
import { Scene } from "./scene";
import { UniqueID } from "../functions/uid";
import { Camera } from "./camera";
import { RenderObject } from "./renderobject";
import { setUncaughtExceptionCaptureCallback } from "process";
import { SpritesheetController } from "./spritesheet-controller";

export class Renderer implements RendererConstructor {

	public id = UniqueID(18).id;
	public timestamp = Date.now();
	public renderObjects: RenderObject[] = [];
	public visibleRenderObjects: RenderObject[] = [];

	public attributes = {};

	public transform: TransformMatrices | null = null;
	declare public scene: Scene | SceneConstructor;
	declare public context: CanvasRenderingContext2D;
	declare public camera: Camera | CameraConstructor | undefined;

	/**
	 * By creating a 'renderer' instance, the program can draw images.
	 * This must be manually linked to a 'Scene' instance. If not, no graphics can be displayed
	 * @param scene The scene that will be linked to the renderer.
	 * @param attributes Attributes specifying the behaviour of the renderer.
	 */
	constructor(scene: Scene | SceneConstructor, attributes?: RendererAttributes) {

		this.scene = scene;
		this.attributes = { ...attributes };
		this.context = scene.canvasElement.getContext("2d") as CanvasRenderingContext2D;

		(scene as SceneConstructor).renderer = this;
	}

	/**Clears the entire scene, which will end up showing a black scene. */
	public ClearScene(): Renderer {

		const ctx: CanvasRenderingContext2D = this.context;
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
	public PaintScene(color: string) {

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
	public RenderObjectsInCamera(deltaTime: number): Rendering {

		if (!(this.camera instanceof Camera)) throw new Error("Cannot render objects in camera since no camera has been specified.");

		const results: Rendering = {
			startedAt: Date.now(),
			endedAt: 0,
			duration: 0,
			renderedAmountOfObjects: 0
		}

		const ctx: CanvasRenderingContext2D = this.context;
		const camera: Camera = this.camera;
		const visibleObjects: RenderObject[] = [];

		ctx.save();

		if (this.transform !== null)
			ctx.transform(this.transform.horizontalScaling, this.transform.verticalSkewing, this.transform.horizontalSkewing, this.transform.verticalScaling, this.transform.horizontalTranslation, this.transform.verticalTranslation);

		ctx.translate(camera.x, camera.y);
		ctx.scale(camera.scaleX, camera.scaleY);

		let i = 0;

		while (i < this.renderObjects.length) {

			const obj: RenderObject = this.renderObjects[i];
			if (!this.camera.offScreenRendering) {

				if (typeof obj.width === "number" && typeof obj.height === "number") {

					if (!obj.forceRendering) {
						if (obj.x > -(((this.camera.x + 30) / this.camera.scaleX) + (obj.width)) && obj.x < -((this.camera.x - this.camera.width) / this.camera.scaleX) &&
							obj.y > -((this.camera.y + 30) / this.camera.scaleY) && obj.y < -((this.camera.y - (this.camera.height))) / this.camera.scaleY) {

							visibleObjects.push(obj);

							obj.visible = true;

							if (typeof obj.Draw === "function") obj.Draw(this.context);
							if (typeof obj.Update === "function") obj.Update(this.context, deltaTime);

							if (obj.spritesheetController as SpritesheetController) (obj.spritesheetController as SpritesheetController).Update(deltaTime);

						} else {
							obj.visible = false;
						}
					} else {

						if (typeof obj.Draw === "function") obj.Draw(this.context);
						if (typeof obj.Update === "function") obj.Update(this.context, deltaTime);
						if (obj.spritesheetController as SpritesheetController) (obj.spritesheetController as SpritesheetController).Update(deltaTime);

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

							if (typeof obj.Draw === "function") obj.Draw(this.context);
							if (typeof obj.Update === "function") obj.Update(this.context, deltaTime);
							if (obj.spritesheetController as SpritesheetController) (obj.spritesheetController as SpritesheetController).Update(deltaTime);

						} else {
							obj.visible = false;
						}
					} else {

						if (typeof obj.Draw === "function") obj.Draw(this.context);
						if (typeof obj.Update === "function") obj.Update(this.context, deltaTime);
						if (obj.spritesheetController as SpritesheetController) (obj.spritesheetController as SpritesheetController).Update(deltaTime);

						visibleObjects.push(obj);

						obj.visible = false;
					}

				}

			} else {

				if (typeof obj.Draw === "function") obj.Draw(this.context);
				if (typeof obj.Update === "function") obj.Update(this.context, deltaTime);
				if (obj.spritesheetController as SpritesheetController) (obj.spritesheetController as SpritesheetController).Update(deltaTime);
			}

			i += 1;
		}

		this.visibleRenderObjects = visibleObjects;

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
	*/
	public Add(renderObject: RenderObject): RenderObject {

		let hasFoundObject: boolean = false;

		for (let i = 0; i < this.renderObjects.length; i++) {

			const foundObject: RenderObject = this.renderObjects[i];

			if (foundObject.id === renderObject.id) hasFoundObject = true;
		}

		if (hasFoundObject) throw new Error(`Failed to add renderobject (objectID: ${renderObject.id}) to renderer since it has already been added.`);

		renderObject.scene = this.scene as Scene;
		renderObject.renderer = <RendererConstructor> this as Renderer;

		this.renderObjects.push(renderObject);

		return renderObject;
	}

	public Destroy(renderObject: RenderObject): Renderer {

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