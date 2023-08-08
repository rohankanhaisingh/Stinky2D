import { CircleConstructor, EasingName, RenderObjectStyles, RenderObjectDragConfiguration, DragOffsetType, DragMouseButton } from "../typings";
import { RenderObject } from "./renderobject";
import { Scene } from "./scene";
export declare class Circle extends RenderObject implements CircleConstructor {
    x: number;
    y: number;
    rotation: number;
    dragConfig: RenderObjectDragConfiguration;
    radius: number;
    startRadian: number;
    endRadian: number;
    counterClockwise: boolean;
    private _mouseOffset;
    constructor(x: number, y: number, radius: number, startRadian: number, endRadian: number, counterClockwise: boolean, styles?: RenderObjectStyles);
    Draw(ctx: CanvasRenderingContext2D): number;
    Update(ctx: CanvasRenderingContext2D, deltaTime: number): number;
    AnimateCurrentStartAngle(to: number, easing: EasingName, duration: number): this;
    AnimateCurrentEndAngle(to: number, easing: EasingName, duration: number): this;
    AnimateCurrentRadius(to: number, easing: EasingName, duration: number): void;
    /**
     * Configures the 'drag' function.
     * @param scene The scene used to access the mouse object.
     * @param offsetType Offset type
     */
    ConfigureDragging(scene: Scene, offsetType: DragOffsetType, button: DragMouseButton): boolean | Circle;
    /**
     * Enables dragging on this render component based on the set dragging configuration.
     *
     * Will return an error if this component has not been configurated.
     */
    EnableDragging(): boolean;
    /** Disables dragging on this render component. */
    DisableDragging(): boolean;
}
