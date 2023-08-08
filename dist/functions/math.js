"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimateInteger = exports.CalculateAtan = exports.Vec3 = exports.Vec2 = exports.CalculateIntersection = exports.CalculateAngle = exports.CalculateDistance = exports.GetAverageArrayValue = exports.RandomIntBetween = void 0;
const easings_1 = require("./easings");
/**
 * Generates a random number between two numbers.
 * @param number1 Minimum rage number
 * @param number2 Maximum rage number
*/
function RandomIntBetween(number1, number2) {
    return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
}
exports.RandomIntBetween = RandomIntBetween;
/**
 * Calculates the average value of an array, returning a float number.
 *
 * This method returns an error if any stored element in the given array is not a number type.
 * @param arr Array with numbers stored.
*/
function GetAverageArrayValue(arr) {
    let sum = 0, i = 0;
    while (i < arr.length) {
        sum += parseInt(arr[i].toString(), 10);
        i += 1;
    }
    const avg = sum / arr.length;
    return avg;
}
exports.GetAverageArrayValue = GetAverageArrayValue;
/**
 * Calculates the distance between two coordinates.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
*/
function CalculateDistance(x1, y1, x2, y2) {
    let d1 = x2 - x1, d2 = y2 - y1, distance = Math.sqrt(d1 * d1 + d2 * d2);
    return distance;
}
exports.CalculateDistance = CalculateDistance;
/**Calculates the angle between two coordinates. */
function CalculateAngle(cx, cy, ex, ey) {
    let dy = ey - cy, dx = ex - cx, theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0)
        theta = 360 + theta;
    return theta;
}
exports.CalculateAngle = CalculateAngle;
/**
 * Calculates intersecting points between four coordinates, returning a Vector2 object.
 *
 * This function requires four parameters that must be an object whose x and y properties are set to a number type.
 * If you are sure that the object you want to use contains properties x and y, you can then cast it to a Vector2 object.
 *
 * Casting example:
 * CalculateIntersection(obj1 as Vector2, obj2 as Vector2, obj3 as Vector2, obj4 as Vector2);
 * */
function CalculateIntersection(p1, p2, p3, p4) {
    var d1 = (p1.x - p2.x) * (p3.y - p4.y); // (x1 - x2) * (y3 - y4)
    var d2 = (p1.y - p2.y) * (p3.x - p4.x); // (y1 - y2) * (x3 - x4)
    var d = (d1) - (d2);
    if (d == 0)
        throw new Error('Number of intersection points is zero or infinity.');
    var u1 = (p1.x * p2.y - p1.y * p2.x); // (x1 * y2 - y1 * x2)
    var u4 = (p3.x * p4.y - p3.y * p4.x); // (x3 * y4 - y3 * x4)
    var u2x = p3.x - p4.x; // (x3 - x4)
    var u3x = p1.x - p2.x; // (x1 - x2)
    var u2y = p3.y - p4.y; // (y3 - y4)
    var u3y = p1.y - p2.y; // (y1 - y2)
    var px = (u1 * u2x - u3x * u4) / d;
    var py = (u1 * u2y - u3y * u4) / d;
    var p = { x: px, y: py };
    return p;
}
exports.CalculateIntersection = CalculateIntersection;
/**Creates a empty Vector2 object. */
class Vec2 {
    constructor(x, y) {
        this.x = typeof x === "number" ? x : 0;
        this.y = typeof y === "number" ? y : 0;
    }
    Set(x, y) {
        this.x = typeof x === "number" ? x : this.x;
        this.y = typeof y === "number" ? y : this.y;
        return this;
    }
    Clone() {
        return new Vec2(this.x, this.y);
    }
    Multiply(value) {
        this.x *= value.x;
        this.y *= value.y;
        return this;
    }
    MultiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    Devide(value) {
        this.x /= value.x;
        this.y /= value.y;
        return this;
    }
    Min(value) {
        this.x = Math.min(this.x, value.x);
        this.y = Math.min(this.y, value.y);
        return this;
    }
    Max(value) {
        this.x = Math.max(this.x, value.x);
        this.y = Math.max(this.y, value.y);
        return this;
    }
    Clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }
    ClampScalar(min, max) {
        this.x = Math.max(min, Math.min(max, this.x));
        this.y = Math.max(min, Math.min(max, this.y));
        return this;
    }
    Floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    Ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    Round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    Dot(value) {
        return this.x * value.x + this.y * value.y;
    }
    ComputeAngle() {
        const angle = Math.atan2(-this.y, -this.x) + Math.PI;
        return angle;
    }
    RotateAround(center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }
    ConvertPixelsToMeters() {
        const x = this.x * (1 / 30), y = this.y * (1 / 30);
        return new Vec2(x, y);
    }
    SaveConvertPixelsToMeters() {
        const x = this.x * (1 / 30), y = this.y * (1 / 30);
        this.x = x;
        this.y = y;
        return this;
    }
    ConvertMetersToPixels() {
        const x = this.x * 30, y = this.y * 30;
        return new Vec2(x, y);
    }
    SaveConvertMetersToPixels() {
        const x = this.x * 30, y = this.y * 30;
        this.x = x;
        this.y = y;
        return this;
    }
}
exports.Vec2 = Vec2;
function Vec3() {
    return { x: 0, y: 0, z: 0 };
}
exports.Vec3 = Vec3;
/**
 * Uses the atan method to calculate the direction between two coordinates, returning an object with the base value and another method and properties.
 *
 * @param x1 x-axis of first coordinate.
 * @param y1 y-axis of first coordinate.
 * @param x2 x-axis of second coordinate.
 * @param y2 y-axis of second coordinate.
 */
function CalculateAtan(x1, y1, x2, y2) {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return {
        base: a,
        cos: Math.cos(a),
        sin: Math.sin(a),
        /** Normalizes the cos and sin values ??of the calculated atan value. */
        normalize: function () {
            return {
                x: parseFloat(this.cos.toFixed(2)),
                y: parseFloat(this.sin.toFixed(2))
            };
        },
        complete: function () {
            return {
                x: parseInt(this.cos.toString()),
                y: parseInt(this.sin.toString())
            };
        },
        multiply: function (len) {
            return {
                x: this.cos * len,
                y: this.sin * len
            };
        }
    };
}
exports.CalculateAtan = CalculateAtan;
function AnimateInteger(from, to, easing, duration, resultCallback) {
    if (typeof from !== "number")
        throw new Error("Cannot animate integer because starting value is not defined.");
    if (typeof to !== "number")
        throw new Error("Cannot animate integer because ending value is not defined.");
    if (typeof duration !== "number")
        throw new Error("Cannot animate integer because duration value is not defined.");
    if (typeof resultCallback !== "function")
        throw new Error("Cannot animate integer because callback function is not defined.");
    const now = Date.now();
    const updateTick = () => {
        const elapsedTime = Date.now() - now;
        const easingValue = easings_1.Easings[easing](elapsedTime, 0, to - from, duration);
        resultCallback(from + easingValue);
        if (elapsedTime < duration) {
            window.requestAnimationFrame(updateTick);
        }
        else {
            resultCallback(to);
        }
    };
    updateTick();
}
exports.AnimateInteger = AnimateInteger;
