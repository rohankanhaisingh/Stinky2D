import { Renderer } from "./renderer";
export declare class OffscreenRenderer {
    id: string;
    timestamp: number;
    scalingFactor: number;
    glowFilter: string | null;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    /**
     * An offscreen renderer can be used to post process
     * existing visuals from other renderers.
     *
     * This renderer can process several filters such as
     * bloom, glow, contrast, down- and upscaling and many more.
     */
    constructor();
    /**
     * Sets the scaling factor based on a renderer.
     * The lower the scaling factor, the lower the quality gets.
     *
     * A higher scaling factor may decrease the performance.
     * @param renderer
     * @param scalingFactor
     */
    SetDynamicScalingFactor(renderer: Renderer, scalingFactor: number): void;
    /**
     * Pre-generates a texture with all the effecs applied,
     * which later can be used by a rendere to draw it as a layer.
     * The more effects are applied, the longer it can take to
     * process the effects.
     *
     * Downscaling might be useful.
     * @param renderer
     */
    CreateTexture(renderer: Renderer): void;
    /**
     * Use the glow effect as part of the post-processing effect collection.
     * @param blurStrength
     * @param brightness
     */
    UseGlowEffect(blurStrength: number, brightness: number): void;
}
