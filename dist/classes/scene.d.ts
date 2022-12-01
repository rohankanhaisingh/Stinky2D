import { SceneAttributes, SceneConstructor, SceneEvents, SceneImageFormat, SceneMouseObject } from "../typings";
export declare class Scene implements SceneConstructor {
    width: number;
    height: number;
    domElement: HTMLElement;
    canvasElement: HTMLCanvasElement;
    events: {
        [key: string]: Function;
    };
    attributes: SceneAttributes[];
    mouse: SceneMouseObject;
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
     * Exports the canvas element to an image.
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
    AddEventListener(event: SceneEvents, cb: (event: any) => void): Scene;
    /**
     * Removes an existing event listener.
     *
     * @param event
     */
    RemoveEventListener(event: SceneEvents): boolean;
}
