import { Vec2 } from "../functions/math";
import { Dimension2D, EasingName, RenderObjectConstructor, RenderObjectDataAttributes, RenderObjectEventMap, RenderObjectStyleApplyingResults, RenderObjectStyles, RenderObjectTransformProperty, SpritesheetControllerConstructor, Vector2 } from "../typings";
import { AudioNode2D } from "./audio-system-2d";
import { Renderer } from "./renderer";
import { Scene } from "./scene";
import { SpritesheetController } from "./spritesheet-controller";
export declare const AllExistingRenderObjects: RenderObject[];
export declare class RenderObject implements RenderObjectConstructor {
    /** Unique generated id for each render object. */
    id: string;
    /** Counts the amount of render objects created in general. */
    exisitingObjectCount: number;
    /** Timestamp of when the render object has been made. */
    timestamp: number;
    /** Array index of renderer instance. */
    arrayIndex: number;
    /** Boolean which determines whether the object is visible or not. */
    visible: boolean;
    /** Forces rendering outside the camera view/ */
    forceRendering: boolean;
    /** Render object attributes. */
    attributes: {
        [K in RenderObjectDataAttributes]?: string;
    };
    /** All events stored in this object. */
    events: {
        [key: string]: Function;
    };
    /** All events that will be emitted once. */
    eventsOnce: {
        [key: string]: Function;
    };
    /** Event states.*/
    eventStates: {
        hasEntered: boolean;
        hasLeft: boolean;
        hasClicked: boolean;
        isDown: boolean;
        isUp: boolean;
    };
    /** Render object children applied to this instance. */
    children: RenderObject[];
    /** Audio node applied to this instance. */
    audioNodes: AudioNode2D[];
    styleGroups: {
        [K: string]: RenderObjectStyles;
    };
    /**
     * The x-coordinate of the object.
     * @type {number}
     * @public
     */
    x: number;
    /**
     * The y-coordinate of the object.
     * @type {number}
     * @public
     */
    y: number;
    /**
     * The width of the object.
     * @type {number}
     * @public
     */
    width: number;
    /**
     * The height of the object.
     * @type {number}
     * @public
     */
    height: number;
    /**
     * The radius of the object.
     * @type {number}
     * @public
     */
    radius: number;
    /**
     * The segments of the object.
     * @type {Vector[]}
     * @public
     */
    segments: Vector2[];
    /**
     * The styles of the object.
     * @type {RenderObjectStyles}
     * @public
     */
    styles: RenderObjectStyles;
    /**
   * The transform of the object.
   * @type {number[] | null}
   * @public
   */
    transform: number[] | null;
    /**
     * The scaling of the object.
     * @type {Vector2 | null}
     * @public
     */
    scaling: Vector2 | null;
    /**
     * The rotation of the object.
     * @type {number}
     * @public
     */
    rotation: number;
    /**
     * The velocity in the X direction.
     * @type {number}
     * @public
     */
    velocityX: number;
    /**
     * The velocity in the Y direction.
     * @type {number}
     * @public
     */
    velocityY: number;
    /**
     * The acceleration of the object.
     * @type {number}
     * @public
     */
    acceleration: number;
    /**
     * The mass of the object.
     * @type {number}
     * @public
     */
    mass: number;
    /**
     * The scene that the object belongs to.
     * @type {Scene}
     * @public
     */
    scene: Scene;
    /**
     * The renderer used to render the object.
     * @type {Renderer}
     * @public
     */
    renderer: Renderer;
    /**
     * The initial position of the object.
     * @type {Vector2}
     * @public
     */
    initialPosition: Vector2;
    /**
     * The initial dimensions of the object.
     * @type {Dimension2D}
     * @public
     */
    initialDimension: Dimension2D;
    spritesheetController?: SpritesheetController | SpritesheetControllerConstructor;
    constructor();
    Draw(ctx: CanvasRenderingContext2D): number;
    Update(ctx: CanvasRenderingContext2D, deltaTime: number): number;
    OnAdd(renderer: Renderer): void;
    private _handleEventProperties;
    private _updateOnMouseOverEvent;
    UpdateEvents(): this | undefined;
    /**
     * Centers the render object based on the object's dimensions and position.
     * @param x x-axis.
     * @param y y-axis.
     */
    Center(x: number, y: number): RenderObject;
    /** Sets the position of this object using a method. */
    SetPosition(x: number | Vec2, y?: number): RenderObject;
    /**
     * Returns a new Vec2 class provided with the position of this renderobject.
     * @returns
     */
    GetPosition(): Vec2;
    SetFixedSize(width: number, height: number, position: Vector2): void;
    /**
     * Changes the size using a method
     * @param width Width of this component.
     * @param height Height of this component.
     */
    ChangeSize(width: number | null, height: number | null): RenderObject;
    SetSize(vector: Vec2): this | undefined;
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
    /**
     * Creates an style group to change the rendering styles of this object.
     * @param name Name of the styles
     * @param styles Styles
     */
    CreateStyleGroup(name: string, styles: RenderObjectStyles): this;
    DeleteStyleGroup(name: string): RenderObject;
    /**
     * Uses a style group. Will throw an error if group does not exist.
     * @param name Name of the style group
     * @returns
     */
    UseStyleGroup(name: string): RenderObject;
    /** Fuckinf fucky fuck fuck fuck */
    static ApplyRenderStyles(ctx: CanvasRenderingContext2D, styles: RenderObjectStyles): RenderObjectStyleApplyingResults;
}
