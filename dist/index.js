"use strict";
/**
 * Stinky2D library
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec3 = exports.Vec2 = exports.GetAverageArrayValue = exports.CalculateIntersection = exports.CalculateDistance = exports.CalculateAtan = exports.CalculateAngle = exports.RandomIntBeween = exports.Easings = exports.LoadImageSync = exports.WaitFor = exports.UniqueID = exports.ConvertByteArrayToHex = exports.ConvertHexToByteArray = exports.RandomColor = exports.ColorCodes = exports.Rectangle = exports.Looper = exports.Camera = exports.Renderer = exports.AllExistingRenderObjects = exports.RenderObject = exports.Scene = void 0;
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
var colors_1 = require("./constants/colors");
Object.defineProperty(exports, "ColorCodes", { enumerable: true, get: function () { return colors_1.ColorCodes; } });
Object.defineProperty(exports, "RandomColor", { enumerable: true, get: function () { return colors_1.RandomColor; } });
Object.defineProperty(exports, "ConvertHexToByteArray", { enumerable: true, get: function () { return colors_1.ConvertHexToByteArray; } });
Object.defineProperty(exports, "ConvertByteArrayToHex", { enumerable: true, get: function () { return colors_1.ConvertByteArrayToHex; } });
var uid_1 = require("./functions/uid");
Object.defineProperty(exports, "UniqueID", { enumerable: true, get: function () { return uid_1.UniqueID; } });
var utilities_1 = require("./functions/utilities");
Object.defineProperty(exports, "WaitFor", { enumerable: true, get: function () { return utilities_1.WaitFor; } });
Object.defineProperty(exports, "LoadImageSync", { enumerable: true, get: function () { return utilities_1.LoadImageSync; } });
var easings_1 = require("./functions/easings");
Object.defineProperty(exports, "Easings", { enumerable: true, get: function () { return easings_1.Easings; } });
var math_1 = require("./functions/math");
Object.defineProperty(exports, "RandomIntBeween", { enumerable: true, get: function () { return math_1.RandomIntBeween; } });
Object.defineProperty(exports, "CalculateAngle", { enumerable: true, get: function () { return math_1.CalculateAngle; } });
Object.defineProperty(exports, "CalculateAtan", { enumerable: true, get: function () { return math_1.CalculateAtan; } });
Object.defineProperty(exports, "CalculateDistance", { enumerable: true, get: function () { return math_1.CalculateDistance; } });
Object.defineProperty(exports, "CalculateIntersection", { enumerable: true, get: function () { return math_1.CalculateIntersection; } });
Object.defineProperty(exports, "GetAverageArrayValue", { enumerable: true, get: function () { return math_1.GetAverageArrayValue; } });
Object.defineProperty(exports, "Vec2", { enumerable: true, get: function () { return math_1.Vec2; } });
Object.defineProperty(exports, "Vec3", { enumerable: true, get: function () { return math_1.Vec3; } });
