import { CameraConstructor, RendererAttributes, RendererConstructor, Rendering, RenderObjectDataAttributes, SceneConstructor, TransformMatrices } from "../typings";
import { Scene } from "./scene";
import { Camera } from "./camera";
import { RenderObject } from "./renderobject";
import { Collection } from "./collection";
export declare class Renderer implements RendererConstructor {
    id: string;
    timestamp: number;
    renderObjects: RenderObject[];
    visibleRenderObjects: RenderObject[];
    attributes: {};
    transform: TransformMatrices | null;
    picking: boolean;
    pickDelay: number;
    lastPicked: number;
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
    /** Clears the entire scene, which will end up showing a black scene. */
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
    //*/
    Add(renderObject: RenderObject): RenderObject;
    /**Enables the ability to analyze the colors in the rendered image */
    EnablePicking(): boolean;
    /**Disables the ability to analyze the colors in the rendered image */
    DisablePicking(): boolean;
    /**
     *  Sets a delay in which the rendered image is analyzed
     *	The default value is 100.
     *
     *	Does not accept float numbers.
     *
     * @param delay Delay in milliseconds.
     */
    SetPickDelay(delay: number): number;
    /**
     *
     * This method returns an ImageData object representing the underlying pixel data for a specified portion of the canvas
     * using the CanvasRenderingContext2D.getImageData method.
     *
     * If the rendered image is analyzed multiple times, make sure the 'willReadFrequently' option is enabled when building a 'Renderer' class.
     * The greater the value of the desired width and height of the analysis, the more time it will take to perform the analysis.
     * WebGL can be used to make the analysis faster, through the graphics card.
     * */
    GetImageData(startX: number, startY: number, width: number, height: number, colorSpace?: PredefinedColorSpace): ImageData;
    Destroy(renderObject: RenderObject): Renderer;
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
    GetObjectByDataAttribute(attributeName: RenderObjectDataAttributes, attributeValue: string, useCollection?: boolean): RenderObject[] | Collection<RenderObject> | null;
    QuerySelector(selector: string): void;
}
