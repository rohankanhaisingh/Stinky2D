import { Dimension2D, EasingName, RenderObjectConstructor, RenderObjectDataAttributes, RenderObjectEventMap, RenderObjectStyleApplyingResults, RenderObjectStyles, RenderObjectTransformProperty, SpritesheetControllerConstructor, Vector2 } from "../typings";
import { AudioNode2D } from "./audio-system-2d";
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
    attributes: {
        [K in RenderObjectDataAttributes]?: string;
    };
    events: {
        [key: string]: Function;
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
    children: RenderObject[];
    audioNodes: AudioNode2D[];
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    segments: Vector2[];
    styles: RenderObjectStyles;
    transform: number[] | null;
    scaling: Vector2 | null;
    rotation: number;
    velocityX: number;
    velocityY: number;
    acceleration: number;
    mass: number;
    scene: Scene;
    renderer: Renderer;
    initialPosition: Vector2;
    initialDimension: Dimension2D;
    spritesheetController?: SpritesheetController | SpritesheetControllerConstructor;
    constructor();
    Draw(ctx: CanvasRenderingContext2D): number;
    Update(ctx: CanvasRenderingContext2D, deltaTime: number): number;
    OnAdd(renderer: Renderer): void;
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
    AddEventListener<K extends keyof RenderObjectEventMap>(event: K, cb: RenderObjectEventMap[K]): RenderObject;
    /**
     * Sets a data attribute to this instance, allowing every
     * instance to be unique.
     *
     * @param attributeName Name of attribute.
     * @param value Value of attribute, which has to be a string.
     */
    SetDataAttribute(attributeName: RenderObjectDataAttributes, value: string): RenderObject;
    /**
     * Returns a set attribute with its value. The value can be either
     * a string or null if no attribute is set.
     *
     * @param attributeName Name of attribute.
     * */
    GetDataAttribute(attributeName: RenderObjectDataAttributes): string | null;
    /**
     * Sets a style property on this render object instance.
     *
     * @param style Key of the RenderObjectStyles interface.
     * @param value Value of the style.
    */
    SetStyle(style: keyof RenderObjectStyles, value: any): any;
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
    /**
     * Set the scaling on this render object using a
     * Vector2 represented number object.
     **/
    SetScaling(scale: Vector2): RenderObject;
    /**
     * Set the scale x property on this render object.
     * Or return the current set x scaling value of this object
     * as a number.
     * */
    ScaleX(number?: number): number | null;
    /**
     * Set the scale y property on this render object.
     * Or return the current set y scaling value of this object
     * as a number.
     * */
    ScaleY(number?: number): number | null;
    /** Disables scaling which may imrove the rendering performance. */
    DisableScaling(): RenderObject;
    /**
     *  Enables scaling by setting the values for both x and y to 1 by default.
     *
     *  This method is optional to enable scaling. Scaling can also be enabled using
     *  the following methods:
     *
     *  SetScaling(scalingObject);
     *  ScaleX(scale);
     *  ScaleY(scale);
     */
    EnableScaling(): RenderObject;
    SetTransform(horizontalScaling: number, verticalSkewing: number, horizontalSkewing: number, verticalScaling: number, horizontalTranslation: number, verticalTranslation: number): RenderObject;
    /**
     * Gets a specific transform property and return its value.
     *
     * Will return null if the transform property does not contain valid values.
     * */
    GetTransformProperty(transformProperty: RenderObjectTransformProperty): number | null;
    SetTransformProperty(transformProperty: RenderObjectTransformProperty, value: number): number[] | null;
}
