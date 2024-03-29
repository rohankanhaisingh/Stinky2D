"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKeyDown = exports.OnKeyUp = exports.OnKeyDown = exports.KeyUpListeners = exports.KeyDownListeners = exports.ActiveKeys = exports.AnimateInteger = exports.Vec3 = exports.Vec2 = exports.GetAverageArrayValue = exports.CalculateIntersection = exports.CalculateDistance = exports.CalculateAtan = exports.CalculateAngle = exports.RandomIntBetween = exports.LoadAudioSync = exports.SimplifyImageData = exports.LoadImageSync = exports.WaitFor = exports.Easings = exports.UniqueID = exports.FixedHexToRgbArray = exports.AnimateHeximalColor = exports.ConvertByteArrayToHex = exports.ConvertHexToByteArray = exports.RandomColor = exports.ColorCodes = exports.OffscreenRenderer = exports.GamepadHandler = exports.GamepadController = exports.Plugins = exports.PhysicsWorld2D = exports.RigidBody2D = exports.Collection = exports.AudioNode2D = exports.AudioSystem2D = exports.SpritesheetController = exports.LineSystem2D = exports.Line2D = exports.Geometry2D = exports.Circle = exports.TextNode = exports.Rectangle = exports.Looper = exports.Camera = exports.Renderer = exports.AllExistingRenderObjects = exports.RenderObject = exports.Scene = void 0;
/**
 * Stinky2D library
 *
 */
var scene_1 = require("./classes/scene");
Object.defineProperty(exports, "Scene", { enumerable: true, get: function () { return scene_1.Scene; } });
var renderobject_1 = require("./classes/renderobject");
Object.defineProperty(exports, "RenderObject", { enumerable: true, get: function () { return renderobject_1.RenderObject; } });
Object.defineProperty(exports, "AllExistingRenderObjects", { enumerable: true, get: function () { return renderobject_1.AllExistingRenderObjects; } });
var renderer_1 = require("./classes/renderer");
Object.defineProperty(exports, "Renderer", { enumerable: true, get: function () { return renderer_1.Renderer; } });
var camera_1 = require("./classes/camera");
Object.defineProperty(exports, "Camera", { enumerable: true, get: function () { return camera_1.Camera; } });
var looper_1 = require("./classes/looper");
Object.defineProperty(exports, "Looper", { enumerable: true, get: function () { return looper_1.Looper; } });
var rectangle_1 = require("./classes/rectangle");
Object.defineProperty(exports, "Rectangle", { enumerable: true, get: function () { return rectangle_1.Rectangle; } });
var text_1 = require("./classes/text");
Object.defineProperty(exports, "TextNode", { enumerable: true, get: function () { return text_1.TextNode; } });
var circle_1 = require("./classes/circle");
Object.defineProperty(exports, "Circle", { enumerable: true, get: function () { return circle_1.Circle; } });
var geometry_2d_1 = require("./classes/geometry-2d");
Object.defineProperty(exports, "Geometry2D", { enumerable: true, get: function () { return geometry_2d_1.Geometry2D; } });
var linesystem_1 = require("./classes/linesystem");
Object.defineProperty(exports, "Line2D", { enumerable: true, get: function () { return linesystem_1.Line2D; } });
Object.defineProperty(exports, "LineSystem2D", { enumerable: true, get: function () { return linesystem_1.LineSystem2D; } });
var spritesheet_controller_1 = require("./classes/spritesheet-controller");
Object.defineProperty(exports, "SpritesheetController", { enumerable: true, get: function () { return spritesheet_controller_1.SpritesheetController; } });
var audio_system_2d_1 = require("./classes/audio-system-2d");
Object.defineProperty(exports, "AudioSystem2D", { enumerable: true, get: function () { return audio_system_2d_1.AudioSystem2D; } });
Object.defineProperty(exports, "AudioNode2D", { enumerable: true, get: function () { return audio_system_2d_1.AudioNode2D; } });
var collection_1 = require("./classes/collection");
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return collection_1.Collection; } });
var physics_2d_1 = require("./classes/physics-2d");
Object.defineProperty(exports, "RigidBody2D", { enumerable: true, get: function () { return physics_2d_1.RigidBody2D; } });
Object.defineProperty(exports, "PhysicsWorld2D", { enumerable: true, get: function () { return physics_2d_1.PhysicsWorld2D; } });
var plugins_1 = require("./classes/plugins");
Object.defineProperty(exports, "Plugins", { enumerable: true, get: function () { return plugins_1.Plugins; } });
var controller_1 = require("./classes/controller");
Object.defineProperty(exports, "GamepadController", { enumerable: true, get: function () { return controller_1.GamepadController; } });
Object.defineProperty(exports, "GamepadHandler", { enumerable: true, get: function () { return controller_1.GamepadHandler; } });
var offscreen_renderer_1 = require("./classes/offscreen-renderer");
Object.defineProperty(exports, "OffscreenRenderer", { enumerable: true, get: function () { return offscreen_renderer_1.OffscreenRenderer; } });
var colors_1 = require("./constants/colors");
Object.defineProperty(exports, "ColorCodes", { enumerable: true, get: function () { return colors_1.ColorCodes; } });
Object.defineProperty(exports, "RandomColor", { enumerable: true, get: function () { return colors_1.RandomColor; } });
Object.defineProperty(exports, "ConvertHexToByteArray", { enumerable: true, get: function () { return colors_1.ConvertHexToByteArray; } });
Object.defineProperty(exports, "ConvertByteArrayToHex", { enumerable: true, get: function () { return colors_1.ConvertByteArrayToHex; } });
Object.defineProperty(exports, "AnimateHeximalColor", { enumerable: true, get: function () { return colors_1.AnimateHeximalColor; } });
Object.defineProperty(exports, "FixedHexToRgbArray", { enumerable: true, get: function () { return colors_1.FixedHexToRgbArray; } });
var uid_1 = require("./functions/uid");
Object.defineProperty(exports, "UniqueID", { enumerable: true, get: function () { return uid_1.UniqueID; } });
var easings_1 = require("./functions/easings");
Object.defineProperty(exports, "Easings", { enumerable: true, get: function () { return easings_1.Easings; } });
var utilities_1 = require("./functions/utilities");
Object.defineProperty(exports, "WaitFor", { enumerable: true, get: function () { return utilities_1.WaitFor; } });
Object.defineProperty(exports, "LoadImageSync", { enumerable: true, get: function () { return utilities_1.LoadImageSync; } });
Object.defineProperty(exports, "SimplifyImageData", { enumerable: true, get: function () { return utilities_1.SimplifyImageData; } });
Object.defineProperty(exports, "LoadAudioSync", { enumerable: true, get: function () { return utilities_1.LoadAudioSync; } });
var math_1 = require("./functions/math");
Object.defineProperty(exports, "RandomIntBetween", { enumerable: true, get: function () { return math_1.RandomIntBetween; } });
Object.defineProperty(exports, "CalculateAngle", { enumerable: true, get: function () { return math_1.CalculateAngle; } });
Object.defineProperty(exports, "CalculateAtan", { enumerable: true, get: function () { return math_1.CalculateAtan; } });
Object.defineProperty(exports, "CalculateDistance", { enumerable: true, get: function () { return math_1.CalculateDistance; } });
Object.defineProperty(exports, "CalculateIntersection", { enumerable: true, get: function () { return math_1.CalculateIntersection; } });
Object.defineProperty(exports, "GetAverageArrayValue", { enumerable: true, get: function () { return math_1.GetAverageArrayValue; } });
Object.defineProperty(exports, "Vec2", { enumerable: true, get: function () { return math_1.Vec2; } });
Object.defineProperty(exports, "Vec3", { enumerable: true, get: function () { return math_1.Vec3; } });
Object.defineProperty(exports, "AnimateInteger", { enumerable: true, get: function () { return math_1.AnimateInteger; } });
var keyboard_1 = require("./functions/keyboard");
Object.defineProperty(exports, "ActiveKeys", { enumerable: true, get: function () { return keyboard_1.ActiveKeys; } });
Object.defineProperty(exports, "KeyDownListeners", { enumerable: true, get: function () { return keyboard_1.KeyDownListeners; } });
Object.defineProperty(exports, "KeyUpListeners", { enumerable: true, get: function () { return keyboard_1.KeyUpListeners; } });
Object.defineProperty(exports, "OnKeyDown", { enumerable: true, get: function () { return keyboard_1.OnKeyDown; } });
Object.defineProperty(exports, "OnKeyUp", { enumerable: true, get: function () { return keyboard_1.OnKeyUp; } });
Object.defineProperty(exports, "GetKeyDown", { enumerable: true, get: function () { return keyboard_1.GetKeyDown; } });
require("./constants/global");
