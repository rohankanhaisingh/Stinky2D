import { RenderObjectStyles, TextConstructor } from "../typings";
import { RenderObject } from "./renderobject";
export declare class TextNode extends RenderObject implements TextConstructor {
    text: string;
    showBoundary: boolean;
    width: number;
    height: number;
    rotation: number;
    constructor(text: string, x: number, y: number, width: number | null, height: number | null, styles?: RenderObjectStyles);
    Draw(ctx: CanvasRenderingContext2D): number;
    Update(ctx: CanvasRenderingContext2D, deltaTime: number): number;
}
