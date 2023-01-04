/**
 * Stinky2D library
 * 
 */

declare global {
	interface Window {
		Stinky2D: any;
		RenderingOptions: any;
		EngineFlags: any;
	}
}

window.Stinky2D = {};
window.RenderingOptions = {};

export { Scene } from "./classes/scene";
export { RenderObject, AllExistingRenderObjects } from "./classes/renderobject";
export { Renderer } from "./classes/renderer";
export { Camera } from "./classes/camera";
export { Looper } from "./classes/looper";
export { Rectangle } from "./classes/rectangle";
export { TextNode } from "./classes/text";
export { Circle } from "./classes/circle";
export { Geometry2D } from "./classes/geometry-2d";
export { Line2D, LineSystem2D } from "./classes/linesystem";
export { SpritesheetController } from "./classes/spritesheet-controller";
export { AudioSystem2D, AudioNode2D } from "./classes/audio-system-2d";

export { ColorCodes, RandomColor, ConvertHexToByteArray, ConvertByteArrayToHex } from "./constants/colors";

export { UniqueID } from "./functions/uid"
export { WaitFor, LoadImageSync, SimplifyImageData} from "./functions/utilities";
export { Easings } from "./functions/easings";


export { RandomIntBetween, CalculateAngle, CalculateAtan, CalculateDistance, CalculateIntersection, GetAverageArrayValue, Vec2, Vec3, AnimateInterger } from "./functions/math";

export {
	SceneConstructor,
	SceneMouseButtonsObject,
	SceneMouseObject,
 	SceneEvents,
	SceneAttributes,
	SceneMouseWheelDirection,
	SceneImageFormat,
	GeneratedUniqueIDObject,
	UniqueIDFilterKeywords,
	RendererAttributes,
	RendererConstructor,
	RenderObjectConstructor,
	TransformMatrices,
	Rendering,
	CameraConstructor,
	Vector2,
	Vector3,
	LooperConstructor,
	LooperTickState,
	LooperEvents,
	LooperOnUpdateEvent,
	LooperEventNames,
	RenderObjectStyles,
	RectangleConstructor,
	RenderObjectStyleApplyingResults,
	AtanCalculation,
	MouseWheelObject,
	MouseMoveObject,
	MouseDownObject,
	MouseUpObject,
	MouseOutObject,
	MouseEnterObject,
	DragOffsetType,
	RectangleDragConfiguration,
	DragMouseButton,
	EasingName,
	TextConstructor,
	RenderObjectEvents,
	CircleConstructor,
	Geometry2DConstructor,
	Geometry2DStyles,
	LineSystem2DConstructor,
	Line2DConstructor,
	LineSystem2DOptions,
	RenderObjectEventObject,
	Dimension2D,
	SpritesheetControllerConstructor,
	AudioSystem2DConstructor,
	SpritesheetControllerEventObject,
	AudioNode2DConstructor,
	AudioNode2DEvents,
	SimplifiedImageData
} from "./typings";
