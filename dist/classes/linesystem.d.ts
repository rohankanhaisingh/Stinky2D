import { Vec2 } from "../functions/math";
import { Line2DConstructor, LineSystem2DConstructor, LineSystem2DOptions, RenderObjectStyles, Vector2 } from "../typings";
import { RenderObject } from "./renderobject";
export declare class Line2D implements Line2DConstructor {
    id: string;
    from: Vector2;
    to: Vector2;
    styles: RenderObjectStyles;
    constructor(from: Vector2 | Vec2, to: Vector2 | Vec2, styles: RenderObjectStyles);
}
export declare class LineSystem2D extends RenderObject implements LineSystem2DConstructor {
    options: {};
    lines: Line2DConstructor[] | Line2D[];
    width: number;
    height: number;
    /**
     * Creates a 2 dimensional line system.
     * Every line added to this system will be shown in the scene.
     *
     * The dimension should be adjusted manually.
     * It can also be set automatically.
     *
     * @param x x-axis of the line system.
     * @param y y-axis of the line system.
     */
    constructor(x: number, y: number, options?: LineSystem2DOptions);
    Draw(ctx: CanvasRenderingContext2D): number;
    /**
     * Adds a 2 dimensional line to the 2D line system.
     *
     * @param line Line that will be added to this system.
    */
    AddLine2D(line: Line2D | Line2DConstructor): LineSystem2D;
    /**
     * Sets a specific style property to all lines added to this line system.
     * The property must be a property within the RenderObjectStyles interface.
     *
     * For detailed information about the style properties, read the documentation for the RenderObjectStyles interface.
     *
     * @param property Style property
     * @param value Style value.
     */
    SetStyleOnLines(property: keyof RenderObjectStyles, value: any): LineSystem2D;
    /** Destroys all the lines added to this system. */
    DestroyAllLines(): LineSystem2D;
    /** Destroys a specific line class in this system, returning a boolean representing the result of the destruction. */
    DestroyLine(line: Line2D | Line2DConstructor): boolean;
    /**
     * Gets a random line instance added to this instance.
     *
     * Will return null if no lines has been added.
     */
    GetRandomLineInstance(): Line2D | Line2DConstructor | null;
}
