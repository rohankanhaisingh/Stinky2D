import { AudioNode2D } from "./classes/audio-system-2d";
import { RenderObject } from "./classes/renderobject";

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

/*
 * Interface representing an object that will be returned
 * when generating an unique ID.
 * 
 * The object properties are marked as readonly, which cannot 
 * be modified in any way.
 */
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

/*
 * This interface represents an object with properties
 * based on a generic mouse with three buttons: left, middle and right.
 */
export interface SceneMouseButtonsObject {
	right: boolean;
	middle: boolean;
	left: boolean;
	resetState: () => void;
}

/*
 * This interface represents an object with properties
 * that will automatically be modified by the 'Scene' instance based 
 * on the user their movement.
 */
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

/*
 * Interface that will be implemented in the 'Scene' class.
 * This interface specifies the standard class members.
 */
export interface SceneConstructor {
	width: number;
	height: number;
	canvasElement: HTMLCanvasElement;
	domElement: HTMLElement;
	renderer?: RendererConstructor;
	camera?: CameraConstructor;
}
/*
 * Interface that will be implemented in a 'RenderObject' class instance,
 * including standard specified class members.
 * 
 */
export interface RenderObjectConstructor {
	id: string;
	exisitingObjectCount: number;
	timestamp: number;
}

/*
 * Interface that represents an object that can be used
 * while constructing a 'Renderer' class instance, this to
 * specific renderer attributes.
 */
export interface RendererAttributes {
	alpha?: boolean;
	willReadFrequently?: boolean;
	desynchronized?: boolean;
}

/*
 * Interface that will be implemented in a 'Renderer' class instance,
 * including standard specified class members.
 */
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

/*
 * Interface representing an object with transform matrices,
 * that eventually can be used in all graphic components.
 */
export interface TransformMatrices {
	horizontalSkewing: number;
	verticalSkewing: number;
	horizontalScaling: number;
	verticalScaling: number;
	horizontalTranslation: number;
	verticalTranslation: number;
}

/*
 * This interface represents an object with possible style properties
 * that will be used on a graphical render component.
 */
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

/*
 * Interface representing an object that will be returned from the 'Tick' method
 * of a 'Looper' instance, with properties defining the frame-rate, last registered timestamp,
 * the delta-time and the perfect set frame-rate which is 60 frames by default.
 */
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
	events: {[event in AudioNode2DEvents]?: () => void};
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