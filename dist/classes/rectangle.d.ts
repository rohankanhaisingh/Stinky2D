import { DragMouseButton, DragOffsetType, RectangleConstructor, RectangleDragConfiguration, RenderObjectStyles, SceneConstructor } from "../typings";
import { RenderObject } from "./renderobject";
import { Scene } from "./scene";
export declare class Rectangle extends RenderObject implements RectangleConstructor {
    id: string;
    timestamp: number;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    styles: RenderObjectStyles;
    dragConfig: RectangleDragConfiguration;
    private _mouseOffset;
    /**
     * Creates a grapical render component representing a rectangle, allowing you to customize it manually.
     *
     * The positions always points at the top-left of the component. You might want to use the 'Center' method to adjust the component's positions at the center, based it's width and height.
     * @param x x-axis of the rectangle.
     * @param y
     * @param width
     * @param height
     * @param styles
    */
    constructor(x: number, y: number, width: number, height: number, styles?: RenderObjectStyles);
    Draw(ctx: CanvasRenderingContext2D): number;
    Update(ctx: CanvasRenderingContext2D, deltaTime: number): number;
    /**
     * Configures the 'drag' function.
     * @param scene The scene used to access the mouse object.
     * @param offsetType Offset type
     */
    ConfigureDragging(scene: SceneConstructor | Scene, offsetType: DragOffsetType, button: DragMouseButton): boolean | Rectangle;
    /**
     * Enables dragging on this render component based on the set dragging configuration.
     *
     * Will return an error if this component has not been configurated.
     */
    EnableDragging(): this;
    /** Disables dragging on this render component. */
    DisableDragging(): void;
}
