import { LooperConstructor, LooperEventNames, LooperEvents, LooperTickState, RendererConstructor } from "../typings";
import { Renderer } from "./renderer";
export declare class Looper implements LooperConstructor {
    id: string;
    animationFrame: number;
    frameRate: number;
    deltaTime: number;
    lastTimestamp: number;
    perfectFrameRate: number;
    times: number[];
    events: LooperEvents;
    renderer: Renderer | RendererConstructor;
    /**
     * Creates an looper instance, which will update itself every possible requested frame
     * using the ``window.requestAnimationFrame`` function.
     * @param renderer
     */
    constructor(renderer?: Renderer | RendererConstructor);
    private _tick;
    /**This will manually trigger the loop of this instance. */
    Trigger(): Looper;
    /**
     * Appends an event listener for events whose type attribute value is type.
     * The callback argument sets the callback that will be evoked when any of these events gets triggered.
     * @param event Event name
     * @param cb Callback function
     */
    AddEventListener(event: LooperEventNames, cb: (state: LooperTickState) => void): Looper;
}
