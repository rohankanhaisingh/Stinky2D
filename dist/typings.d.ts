export declare type UniqueIDFilterKeywords = "numbers" | "letters" | "lettersUpperCase" | "lettersLowerCase";
export declare type DragOffsetType = "center" | "offset";
export declare type DragMouseButton = "left" | "middle" | "right";
export declare type EasingName = "easeInQuad" | "easeOutQuad" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInOutQuint" | "easeInSine" | "easeOutSine" | "easeInOutSine" | "easeInExpo" | "easeOutExpo" | "easeInOutExpo" | "easeInCirc" | "easeOutCirc" | "easeInOutCirc" | "easeInElastic" | "easeOutElastic" | "easeInOutElastic" | "easeInBack" | "easeOutBack" | "easeInOutBack" | "easeInBounce" | "easeOutBounce" | "easeInOutBounce";
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
export declare type SceneAttributes = "keepSizeToWindow" | "disableContextMenu" | "redrawOnResize";
export declare type SceneMouseWheelDirection = "up" | "down" | "left" | "right" | null;
export declare type SceneEvents = "sceneResize" | "mouseDown" | "mouseUp" | "mouseMove" | "mouseOut" | "mouseEnter" | "mouseWheel";
export declare type SceneImageFormat = "png" | "webp" | "jpeg" | "jpg";
export interface SceneMouseButtonsObject {
    right: boolean;
    middle: boolean;
    left: boolean;
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
}
export declare type RenderObjectEvents = "mouseDown" | "mouseUp" | "mouseMove" | "mouseOut" | "mouseEnter" | "mouseClick" | "render" | "update" | "exist" | "destroy";
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
    lineCap?: CanvasLineCap;
    lineDashOffset?: number;
    lineJoin?: CanvasLineJoin;
    miterLimit?: number;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}
export interface RenderObjectStyleApplyingResults {
    startedAt: number;
    endedAt: number;
    duration: number;
}
export declare type LooperOnUpdateEvent = (state: LooperTickState) => void;
export declare type LooperEventNames = "update";
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
