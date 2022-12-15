import { Vec2 } from "../functions/math";
import { Geometry2DConstructor, RenderObjectStyles, Vector2 } from "../typings";
import { RenderObject } from "./renderobject";
export declare class Geometry2D extends RenderObject implements Geometry2DConstructor {
    x: number;
    y: number;
    segments: Vector2[] | Vec2[];
    width: number;
    height: number;
    rotation: number;
    startPosition: Vector2;
    showBoundary: boolean;
    /**
     * Creates an empty geometry object, which will contain segments.
     * Those segments can be added, removed or manipulated manually.
     *
     * The outline of the geometry will be linear and the styles will be the same, like for any other renderobject.
     *
     * @param x Base x-axis of the geometry.
     * @param y Base y-axis of the geometry.
     * @param segments Array with segments. Enter an empty array to ignore this paramater.
     * @param styles Styles for the geometry.
     */
    constructor(x: number, y: number, segments: Vector2[] | Vec2[], styles?: RenderObjectStyles);
    /**
     * Computes the maximum width out of all segments.
     *
     * Negative values ??are not determined as the maximum width.
     */
    ComputeMaxGeometryWidth(): number;
    /**
     * Computes the maximum height out of all segments.
     *
     * Negative values ??are not determined as the maximum height.
     */
    ComputeMaxGeometryHeight(): number;
    /**
     * Automatically sets the width and height of the geometry based on the width and height of the segments.
     *
     * The in-screen rendering method may not work accurately if the segments contain negative values.
     * To solve this, try converting the segments to positive numbers.
     *
     * @param setStartPosition Automatically sets the starting position of the geometry based on the first segment in the array.
     */
    AutoSetGeometrySize(setStartPosition?: boolean): this;
    Draw(ctx: CanvasRenderingContext2D): number;
}
