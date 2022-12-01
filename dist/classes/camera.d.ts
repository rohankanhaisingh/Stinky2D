import { CameraConstructor, EasingName, RendererConstructor, SceneConstructor, Vector2 } from "../typings";
import { Renderer } from "./renderer";
import { Scene } from "./scene";
export declare class Camera implements CameraConstructor {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    width: number;
    height: number;
    offScreenRendering: boolean;
    lastOffset: {
        x: number;
        y: number;
    };
    renderer: Renderer | RendererConstructor;
    scene: Scene | SceneConstructor;
    ctx: CanvasRenderingContext2D;
    /**
     * This camera class allows you to render graphical components located at off-screen coordinates.
     * @param renderer Renderer class used to project the view
     * @param scene Scene classes used to determine the dimensions of the screen
     */
    constructor(renderer: Renderer | RendererConstructor, scene: Scene | SceneConstructor);
    /**
     * Sets the camera offset, no idea why you need this but it's there :).
     * @param x
     * @param y
     */
    SetOffset(x: number | null, y: number | null): Camera;
    /**
     * Animates the camera position from one position to another
     * @param from Starting position
     * @param to Ending position
     * @param easing Animation type
     * @param duration Duration of animation
     */
    AnimatePosition(from: Vector2, to: Vector2, easing: EasingName, duration: number): Camera;
    /**
     * Animates the position of this object to another specific y position.
     * @param to Positions where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentPosition(to: Vector2, easing: EasingName, duration: number): Camera;
    /**
     * Animates the scaling of this object to another specific y position.
     * @param to Scaleing where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentScaling(to: Vector2, easing: EasingName, duration: number): Camera;
}
