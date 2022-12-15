import { CameraConstructor, RendererAttributes, RendererConstructor, Rendering, SceneConstructor, TransformMatrices } from "../typings";
import { Scene } from "./scene";
import { Camera } from "./camera";
import { RenderObject } from "./renderobject";
export declare class Renderer implements RendererConstructor {
    id: string;
    timestamp: number;
    renderObjects: RenderObject[];
    visibleRenderObjects: RenderObject[];
    attributes: {};
    transform: TransformMatrices | null;
    scene: Scene | SceneConstructor;
    context: CanvasRenderingContext2D;
    camera: Camera | CameraConstructor | undefined;
    /**
     * By creating a 'renderer' instance, the program can draw images.
     * This must be manually linked to a 'Scene' instance. If not, no graphics can be displayed
     * @param scene The scene that will be linked to the renderer.
     * @param attributes Attributes specifying the behaviour of the renderer.
     */
    constructor(scene: Scene | SceneConstructor, attributes?: RendererAttributes);
    /**Clears the entire scene, which will end up showing a black scene. */
    ClearScene(): Renderer;
    /**
     * This method paints the entire scene using the given color.
     * This method does not work together with the 'ClearScene' method
     *
     * Note that everything will be erased once this method is used.
     * It will also erase when the window has been resized.
     * @param color Color used for painting.
     */
    PaintScene(color: string): this;
    /** Render all objects in conjunction with the camera linked to this instance */
    RenderObjectsInCamera(deltaTime: number): Rendering;
    /**
     * Adds a render object to this renderer instance.
     *
     * An error might be thrown if an instance already has been added to this renderer.
     * @param renderObject
    */
    Add(renderObject: RenderObject): RenderObject;
    Destroy(renderObject: RenderObject): Renderer;
}
