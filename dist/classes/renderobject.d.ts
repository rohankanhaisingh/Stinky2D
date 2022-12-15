import { Dimension2D, EasingName, RenderObjectConstructor, RenderObjectEventObject, RenderObjectEvents, RenderObjectStyleApplyingResults, RenderObjectStyles, SpritesheetControllerConstructor, Vector2 } from "../typings";
import { Renderer } from "./renderer";
import { Scene } from "./scene";
import { SpritesheetController } from "./spritesheet-controller";
export declare const AllExistingRenderObjects: RenderObject[];
export declare class RenderObject implements RenderObjectConstructor {
    id: string;
    exisitingObjectCount: number;
    timestamp: number;
    visible: boolean;
    forceRendering: boolean;
    events: {
        [key: string]: (event: RenderObjectEventObject) => void;
    };
    eventsOnce: {
        [key: string]: Function;
    };
    eventStates: {
        hasEntered: boolean;
        hasLeft: boolean;
        hasClicked: boolean;
        isDown: boolean;
        isUp: boolean;
    };
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    segments: Vector2[];
    styles: RenderObjectStyles;
    rotation: number;
    velocityX: number;
    velocityY: number;
    gravitationalAcceleration: number;
    objectWeight: number;
    scene: Scene;
    renderer: Renderer;
    initialPosition: Vector2;
    initialDimension: Dimension2D;
    spritesheetController?: SpritesheetController | SpritesheetControllerConstructor;
    constructor();
    Draw(ctx: CanvasRenderingContext2D): number;
    Update(ctx: CanvasRenderingContext2D, deltaTime: number): number;
    private _updateOnMouseOverEvent;
    UpdateEvents(): this | undefined;
    /**
     * Centers the render object based on the object's dimensions and position.
     * @param x x-axis.
     * @param y y-axis.
     */
    Center(x: number, y: number): RenderObject;
    /** Sets the position of this object using a method. */
    SetPosition(x: number, y: number): RenderObject;
    SetFixedSize(width: number, height: number, position: Vector2): void;
    /**
     * Changes the size using a method
     * @param width Width of this component.
     * @param height Height of this component.
     */
    ChangeSize(width: number | null, height: number | null): RenderObject;
    /**
     * Animates the x position of this object to another specific x position.
     * @param endX Position where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentXPosition(to: number, easing: EasingName, duration: number): RenderObject;
    /**
     * Animates the y position of this object to another specific y position.
     * @param endY Position where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentYPosition(to: number, easing: EasingName, duration: number): RenderObject;
    /**
     * Animates the position of this object to another specific y position.
     * @param to Positions where the animation ends.
     * @param easing Easing type.
     * @param duration Duration of the animation.
     */
    AnimateCurrentPosition(to: Vector2, easing: EasingName, duration: number): RenderObject;
    /**
     * Animates this render component from one position to another
     * @param from Starting position
     * @param to Ending position
     * @param easing Animation type
     * @param duration Duration of animation
     */
    AnimatePosition(from: Vector2, to: Vector2, easing: EasingName, duration: number): RenderObject;
    /**
     * Animates the background color to a desired color
     * @param to Color
     * @param easing Animation type
     * @param duration Duration of the animation
     */
    AnimateCurrentBackgroundColor(to: string, easing: EasingName, duration: number): RenderObject;
    /**
     * Animates the border color to a desired color
     * @param to Color
     * @param easing Animation type
     * @param duration Duration of the animation
     */
    AnimateCurrentBorderColor(to: string, easing: EasingName, duration: number): RenderObject;
    /**
     * Animates the border color to a desired color
     * @param to Color
     * @param easing Animation type
     * @param duration Duration of the animation
     */
    AnimateCurrentShadowColor(to: string, easing: EasingName, duration: number): RenderObject;
    /**
     * Animates the current rotation value.
     * @param to Rotation where the animation will end.
     * @param easing Name of the animation.
     * @param duration Duration of the animation.
     */
    AnimateCurrentRotation(to: number, easing: EasingName, duration: number): RenderObject;
    /**
     * Appends an event listener which will be evoked when any of these event gets triggered.
     *
     * When an event listener already exists, an error will be returned.
     * @param event
     * @param cb
     */
    AddEventListener(event: RenderObjectEvents, cb: (event: RenderObjectEventObject) => void): RenderObject;
    /** Fuckinf fucky fuck fuck fuck */
    static ApplyRenderStyles(ctx: CanvasRenderingContext2D, styles: RenderObjectStyles): RenderObjectStyleApplyingResults;
    /**
     * Animates just a number from a start value, to an ending value.
     * @param from The value where you want to start animating.
     * @param to The value where you want the animation to end.
     * @param easing Animation type.
     * @param duration Duration of the animation.
     * @param callback A function that will be called while animating, passing the animated value as argument.
    */
    static AnimateNumber(from: number, to: number, easing: EasingName, duration: number, callback: (value: number) => void): void;
}
