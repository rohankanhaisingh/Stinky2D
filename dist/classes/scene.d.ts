import { Vec2 } from "../functions/math";
import { CameraConstructor, RendererConstructor, SceneAttributes, SceneConstructor, SceneEventsMap, SceneImageFormat, SceneMouseObject, Vector2 } from "../typings";
import { Camera } from "./camera";
import { Renderer } from "./renderer";
export declare class Scene implements SceneConstructor {
    width: number;
    height: number;
    domElement: HTMLElement;
    canvasElement: HTMLCanvasElement;
    id: string;
    events: {
        [key: string]: Function;
    };
    attributes: SceneAttributes[];
    mouse: SceneMouseObject;
    camera: Camera | CameraConstructor;
    renderer: Renderer | RendererConstructor;
    /**
     * Creates a scene in which graphical elements are rendered. This is a required component within the program.
     * @param width
     * @param height
     * @param domElement
     * @param attributes
     */
    constructor(width: number, height: number, domElement: HTMLElement, attributes?: SceneAttributes[]);
    private _handleMouseEvents;
    private _handleResizeEvents;
    /**
     * Sets an attribute to this instance, which will have impact on certain behaviors.
     * @param attribute Attribute
     */
    SetAttribute(attribute: SceneAttributes): SceneAttributes[];
    /**
     * Removes an existing attribute of this instance.
     * @param attribute
     */
    RemoveAttribute(attribute: SceneAttributes): SceneAttributes[];
    /**
     * Exports the canvas element to an image using a specific
     * image format. The recommended image format is "png".
     *
     * Will return ``null`` if the given format is unknown.
     * @param format
     */
    ExportToImage(format: SceneImageFormat): null | string;
    /**
     * Appends an event listener which will be evoked when any of these event gets triggered.
     *
     * When an event listener already exists, an error will be returned.
     * @param event
     * @param cb
     */
    AddEventListener<K extends keyof SceneEventsMap>(event: K, cb: SceneEventsMap[K]): Scene;
    /**
     * Removes an existing event listener, returning a boolean describing
     * the state of the removal.
     *
     * @param event
     */
    RemoveEventListener<K extends keyof SceneEventsMap>(event: K): boolean;
    /**
     * Calculates the fixed mouse position based on the applied camera position
     * and the mouse position, returning a Vector2 typeof object.
     *
     * Note that if no camera has been applied, the normal mouse position will be returned.
     */
    GetFixedMousePosition(): Vector2;
    /**
     * Calculates the center coordinate of the canvas element
     * and returns a Vec2 class instance containing the calculated values.
     *
     * Requires no arguments.
     */
    Center(): Vec2;
    GetRandomPosition(): Vec2;
}
