import { CircleConstructor, EasingName, RenderObjectStyles } from "../typings";
import { RenderObject } from "./renderobject";
export declare class Circle extends RenderObject implements CircleConstructor {
    x: number;
    y: number;
    rotation: number;
    radius: number;
    startRadian: number;
    endRadian: number;
    counterClockwise: boolean;
    constructor(x: number, y: number, radius: number, startRadian: number, endRadian: number, counterClockwise: boolean, styles?: RenderObjectStyles);
    Draw(ctx: CanvasRenderingContext2D): number;
    AnimateCurrentStartAngle(to: number, easing: EasingName, duration: number): this;
    AnimateCurrentEndAngle(to: number, easing: EasingName, duration: number): this;
}
