import { Dimension2D, SpritesheetControllerConstructor, SpritesheetControllerEventObject } from "../typings";
import { RenderObject } from "./renderobject";
export declare class SpritesheetController implements SpritesheetControllerConstructor {
    frames: HTMLImageElement[];
    frameDimension: Dimension2D;
    loop: boolean;
    paused: boolean;
    duration: number;
    frameDuration: number;
    start: number;
    attachedRenderObject?: RenderObject;
    id: string;
    events: SpritesheetControllerEventObject;
    frame: number;
    constructor(frames: HTMLImageElement[], renderObject: RenderObject);
    Reset(): SpritesheetController;
    /**Updates the controller by a renderer. */
    Update(deltaTime: number): void;
    /** Pauses the controller */
    Pause(): SpritesheetController;
    /** Continues playing the controller */
    Play(): SpritesheetController;
    /** Detaches the controller from the attached render object. */
    Detach(): SpritesheetController;
    /** Attaches the controller to a render object. */
    Attach(renderObject: RenderObject): SpritesheetController;
    /**
     * Adds an event listener on this controller, where the callback method will be fired when any of the events gets triggered.
     *
     * @param event Event name
     * @param callback Callback function when the event triggers.
     */
    AddEventListener(event: keyof SpritesheetControllerEventObject, callback: (timestamp: number) => void): SpritesheetController;
}
