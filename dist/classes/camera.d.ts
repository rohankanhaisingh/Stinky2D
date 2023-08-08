import { Vec2 } from "../functions/math";
import { CameraConstructor, CameraFocusAnimation, EasingName, RendererConstructor, SceneConstructor, Vector2 } from "../typings";
import { Renderer } from "./renderer";
import { RenderObject } from "./renderobject";
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
     * The `Focus` function takes a renderObject as input and adjusts the camera or context position to center it on the object within a given scene.
     * It calculates the new x and y coordinates based on the scene dimensions and the renderObject's center.
     * This ensures that the object remains centered in the scene, allowing the user or viewer to focus on it while other elements may be moving.
     *
     * @param renderObject The object the camera should focus on.
     * @param scaling Sets the scaling level when focusing. This can be either a 'Vec2' class or a number. Null can be used to skip this paramater.
     * @param offset Sets the offset level when focusing. This can be either a 'Vec2' class or a number. Null can be used to skip this paramater.
     * @param animation Uses an animation to focus on the given render object.
     */
    Focus(renderObject: RenderObject, scaling: number | Vec2 | null, offset: number | Vec2 | null, animation?: CameraFocusAnimation): Camera;
    Scale(scaling: number | Vec2): Camera;
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
