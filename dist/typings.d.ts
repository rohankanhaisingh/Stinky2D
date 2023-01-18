import { AudioNode2D } from "./classes/audio-system-2d";
import { RenderObject } from "./classes/renderobject";
import { Vec2 } from "./functions/math";
export type UniqueIDFilterKeywords = "numbers" | "letters" | "lettersUpperCase" | "lettersLowerCase";
export type DragOffsetType = "center" | "offset";
export type DragMouseButton = "left" | "middle" | "right";
export type EasingName = "easeInQuad" | "easeOutQuad" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInOutQuint" | "easeInSine" | "easeOutSine" | "easeInOutSine" | "easeInExpo" | "easeOutExpo" | "easeInOutExpo" | "easeInCirc" | "easeOutCirc" | "easeInOutCirc" | "easeInElastic" | "easeOutElastic" | "easeInOutElastic" | "easeInBack" | "easeOutBack" | "easeInOutBack" | "easeInBounce" | "easeOutBounce" | "easeInOutBounce";
export type RenderObjectEvents = "mouseDown" | "mouseUp" | "mouseMove" | "mouseOut" | "mouseEnter" | "mouseClick" | "mouseWheel" | "render" | "update" | "exist" | "destroy";
export type SceneAttributes = "keepSizeToWindow" | "disableContextMenu" | "redrawOnResize";
export type SceneMouseWheelDirection = "up" | "down" | "left" | "right" | null;
export type SceneEvents = "sceneResize" | "mouseDown" | "mouseUp" | "mouseMove" | "mouseOut" | "mouseEnter" | "mouseWheel";
export type SceneImageFormat = "png" | "webp" | "jpeg" | "jpg";
export type LooperOnUpdateEvent = (state: LooperTickState) => void;
export type LooperEventNames = "update";
export type AudioNode2DEvents = "end" | "play" | "playing" | "pause" | "update" | "load";
export type AudioNode2DControllerNodes = BiquadFilterNode | StereoPannerNode | GainNode | AnalyserNode;
export type AudioNode2DControllerNodeName = "BiquadFilter" | "StereoPanner" | "GainNode" | "AnalyserNode";
export type AudioNode2DAnalyserFFTSize = 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;
export type CollectionElementTypes = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export interface GeneratedUniqueIDObject {
    readonly id: string;
    readonly timestamp: number;
    readonly length: number;
}
export interface Vector2 {
    x: number;
    y: number;
}
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface AtanCalculation {
    base: number;
    cos: number;
    sin: number;
    normalize: () => Vector2;
    complete: () => Vector2;
    multiply: (len: number) => Vector2;
}
export interface SceneMouseButtonsObject {
    right: boolean;
    middle: boolean;
    left: boolean;
    resetState: () => void;
}
export interface SceneMouseObject {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    lastTimestamp: number;
    wheelDirection: SceneMouseWheelDirection;
    isInWindow: boolean;
    buttons: SceneMouseButtonsObject;
    checkObjectEntry: (x: number, y: number, range: number) => boolean;
    isDragging?: boolean;
}
export interface MouseWheelObject {
    readonly direction: SceneMouseWheelDirection;
    readonly timestamp: number;
    readonly scene: SceneConstructor;
}
export interface MouseMoveObject {
    readonly x: number;
    readonly y: number;
    readonly velocityX: number;
    readonly velocityY: number;
    readonly timestamp: number;
    readonly lastTimestamp: number;
    readonly scene: SceneConstructor;
}
export interface MouseDownObject {
    readonly buttons: SceneMouseButtonsObject;
    readonly timestamp: number;
    readonly scene: SceneConstructor;
}
export interface MouseUpObject {
    readonly buttons: SceneMouseButtonsObject;
    readonly timestamp: number;
    readonly scene: SceneConstructor;
}
export interface MouseOutObject {
    readonly timestamp: number;
    readonly lastPosition: Vector2;
    readonly scene: SceneConstructor;
    readonly isInWindow: boolean;
}
export interface MouseEnterObject {
    readonly timestamp: number;
    readonly position: Vector2;
    readonly scene: SceneConstructor;
    readonly isInWindow: boolean;
}
export interface SceneConstructor {
    width: number;
    height: number;
    canvasElement: HTMLCanvasElement;
    domElement: HTMLElement;
    renderer?: RendererConstructor;
    camera?: CameraConstructor;
}
export interface RenderObjectConstructor {
    id: string;
    exisitingObjectCount: number;
    timestamp: number;
}
export interface RendererAttributes {
    alpha?: boolean;
    willReadFrequently?: boolean;
    desynchronized?: boolean;
}
export interface RendererConstructor {
    id: string;
    timestamp: number;
    context: CanvasRenderingContext2D;
    scene: SceneConstructor;
    attributes: RendererAttributes;
    renderObjects: RenderObjectConstructor[];
    visibleRenderObjects: RenderObjectConstructor[];
    transform: TransformMatrices | null;
    camera?: CameraConstructor;
}
export interface Rendering {
    startedAt: number;
    endedAt: number;
    duration: number;
    renderedAmountOfObjects: number;
}
export interface CameraConstructor {
    renderer: RendererConstructor;
    ctx: CanvasRenderingContext2D;
    scene: SceneConstructor;
    x: number;
    y: number;
    width: number;
    height: number;
    scaleX: number;
    scaleY: number;
    offScreenRendering: boolean;
    lastOffset: Vector2;
}
export interface TransformMatrices {
    horizontalSkewing: number;
    verticalSkewing: number;
    horizontalScaling: number;
    verticalScaling: number;
    horizontalTranslation: number;
    verticalTranslation: number;
}
export interface RenderObjectStyles {
    backgroundColor?: string | number[];
    backgroundImage?: HTMLImageElement;
    filter?: string;
    opacity?: number;
    globalCompositeOperation?: GlobalCompositeOperation;
    imageSmoothingEnabled?: boolean;
    imageSmoothingQuality?: ImageSmoothingQuality;
    borderWidth?: number;
    borderColor?: string | number[];
    shadowBlur?: number;
    shadowColor?: string | number[];
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    direction?: CanvasDirection;
    font?: string;
    textColor?: string;
    textStrokeColor?: string;
    lineCap?: CanvasLineCap;
    lineDashOffset?: number;
    lineJoin?: CanvasLineJoin;
    miterLimit?: number;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
    strokeColor?: string;
    strokeWidth?: number;
    lineWidth?: number;
}
export interface RenderObjectStyleApplyingResults {
    startedAt: number;
    endedAt: number;
    duration: number;
}
export interface LooperConstructor {
    id: string;
    renderer: RendererConstructor;
}
export interface LooperTickState {
    readonly frameRate: number;
    readonly lastTimestamp: number;
    readonly deltaTime: number;
    readonly perfectFrameRate: number;
}
export interface LooperEvents {
    update: LooperOnUpdateEvent[];
}
export interface RectangleConstructor {
    id: string;
    timestamp: number;
    x: number;
    y: number;
    height: number;
    width: number;
    styles: RenderObjectStyles;
}
export interface RectangleDragConfiguration {
    isEnabled: boolean;
    offsetType: DragOffsetType | null;
    scene: SceneConstructor | null;
    button: DragMouseButton;
}
export interface TextConstructor {
    text: string;
    showBoundary: boolean;
}
export interface CircleConstructor {
    x: number;
    y: number;
    radius: number;
    startRadian: number;
    endRadian: number;
    counterClockwise: boolean;
}
export interface Geometry2DConstructor {
    segments: Vector2[];
}
export interface Geometry2DStyles {
    backgroundColor?: string;
    borderColor?: string;
}
export interface Line2DConstructor {
    from: Vector2;
    to: Vector2;
    styles: RenderObjectStyles;
    id: string;
}
export interface LineSystem2DOptions {
    maxLines?: number;
}
export interface LineSystem2DConstructor {
    options: LineSystem2DOptions;
    lines: Line2DConstructor[];
}
export interface RenderObjectEventObject {
    readonly target: RenderObject;
    readonly mousePosition: Vector2;
    readonly mouse: SceneMouseObject;
}
export interface Dimension2D {
    width?: number;
    height?: number;
    radius?: number;
}
export interface SpritesheetControllerConstructor {
    frames: HTMLImageElement[];
    duration: number;
    frameDimension: Dimension2D;
    loop: boolean;
    frameDuration: number;
}
export interface SpritesheetControllerEventObject {
    reset?: (timestamp: number) => void;
    play?: (timestamp: number) => void;
    pause?: (timestamp: number) => void;
    update?: (timestamp: number) => void;
    detach?: (timestamp: number) => void;
    attach?: (timestamp: number) => void;
}
export interface AudioSystem2DConstructor {
    maxAudioNodes: number;
    ctx: AudioContext;
    gain: GainNode;
    panner: StereoPannerNode;
    id: string;
    nodes: AudioSystem2DConstructor[] | AudioNode2D[];
}
export interface AudioNode2DConstructor {
    ctx: AudioContext;
    id: string;
    timestamp: number;
    x: number;
    y: number;
    range: number;
    events: {
        [event in AudioNode2DEvents]?: () => void;
    };
}
export interface SimplifiedImageData {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
    readonly colorSpace: PredefinedColorSpace;
    readonly width: number;
    readonly height: number;
    readonly hex: string;
}
export interface RigidBody2DConstructor {
    id: string;
    timestamp: number;
    position: Vec2 | Vector2;
    velocity: Vec2 | Vector2;
    acceleration: Vec2 | Vector2;
}
declare global {
    interface Window {
        Stinky2D: any;
        RenderingOptions: any;
        EngineFlags: any;
    }
    interface String {
        readonly bruh: () => void;
    }
}
