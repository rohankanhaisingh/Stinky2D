"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffscreenRenderer = void 0;
const uid_1 = require("../functions/uid");
class OffscreenRenderer {
    /**
     * An offscreen renderer can be used to post process
     * existing visuals from other renderers.
     *
     * This renderer can process several filters such as
     * bloom, glow, contrast, down- and upscaling and many more.
     */
    constructor() {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.scalingFactor = 1;
        this.glowFilter = null;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d", { alpha: true, willReadFrequently: true, colorSpace: "display-p3" });
        this.canvas.width = 800;
        this.canvas.height = 600;
    }
    /**
     * Sets the scaling factor based on a renderer.
     * The lower the scaling factor, the lower the quality gets.
     *
     * A higher scaling factor may decrease the performance.
     * @param renderer
     * @param scalingFactor
     */
    SetDynamicScalingFactor(renderer, scalingFactor) {
        this.scalingFactor = scalingFactor;
        this.canvas.width = renderer.scene.width * scalingFactor;
        this.canvas.height = renderer.scene.height * scalingFactor;
    }
    /**
     * Pre-generates a texture with all the effecs applied,
     * which later can be used by a rendere to draw it as a layer.
     * The more effects are applied, the longer it can take to
     * process the effects.
     *
     * Downscaling might be useful.
     * @param renderer
     */
    CreateTexture(renderer) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.glowFilter !== null)
            ctx.filter = this.glowFilter;
        ctx.drawImage(renderer.scene.canvasElement, 0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
    /**
     * Use the glow effect as part of the post-processing effect collection.
     * @param blurStrength
     * @param brightness
     */
    UseGlowEffect(blurStrength, brightness) {
        this.glowFilter = `blur(${blurStrength}px) brightness(${brightness * 100}%)`;
    }
    CopyTexture(renderer) {
    }
}
exports.OffscreenRenderer = OffscreenRenderer;
