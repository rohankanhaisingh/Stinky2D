import { RenderObjectStyles, TextConstructor } from "../typings";
import { RenderObject } from "./renderobject";
export declare class TextNode extends RenderObject implements TextConstructor {
    text: string;
    showBoundary: boolean;
    width: number;
    height: number;
    rotation: number;
    /**
    Creates a new TextNode instance.
    @param {string} text - The text content of the node.
    @param {number} x - The x-coordinate of the node's position.
    @param {number} y - The y-coordinate of the node's position.
    @param {number | null} width - The width of the text node. If null, default width of 10 will be used.
    @param {number | null} height - The height of the text node. If null, default height of 10 will be used.
    @param {RenderObjectStyles} [styles] - The styles to be applied to the text node.
    */
    constructor(text: string, x: number, y: number, width: number | null, height: number | null, styles?: RenderObjectStyles);
    Draw(ctx: CanvasRenderingContext2D): number;
    Update(ctx: CanvasRenderingContext2D, deltaTime: number): number;
}
