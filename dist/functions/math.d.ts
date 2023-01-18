import { AtanCalculation, EasingName, Vector2, Vector3 } from "../typings";
/**
 * Generates a random number between two numbers.
 * @param number1 Minimum rage number
 * @param number2 Maximum rage number
*/
export declare function RandomIntBetween(number1: number, number2: number): number;
/**
 * Calculates the average value of an array, returning a float number.
 *
 * This method returns an error if any stored element in the given array is not a number type.
 * @param arr Array with numbers stored.
*/
export declare function GetAverageArrayValue(arr: number[]): number;
/**
 * Calculates the distance between two coordinates.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
*/
export declare function CalculateDistance(x1: number, y1: number, x2: number, y2: number): number;
/**Calculates the angle between two coordinates. */
export declare function CalculateAngle(cx: number, cy: number, ex: number, ey: number): number;
/**
 * Calculates intersecting points between four coordinates, returning a Vector2 object.
 *
 * This function requires four parameters that must be an object whose x and y properties are set to a number type.
 * If you are sure that the object you want to use contains properties x and y, you can then cast it to a Vector2 object.
 *
 * Casting example:
 * CalculateIntersection(obj1 as Vector2, obj2 as Vector2, obj3 as Vector2, obj4 as Vector2);
 * */
export declare function CalculateIntersection(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): Vector2;
/**Creates a empty Vector2 object. */
export declare class Vec2 implements Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    Set(x: number | null, y: number | null): this;
    Clone(): Vec2;
    Multiply(value: Vector2 | Vec2): this;
    MultiplyScalar(scalar: number): this;
    Devide(value: Vector2 | Vec2): this;
    Min(value: Vector2 | Vec2): this;
    Max(value: Vector2 | Vec2): this;
    Clamp(min: Vector2 | Vec2, max: Vector2 | Vec2): this;
    ClampScalar(min: number, max: number): this;
    Floor(): this;
    Ceil(): this;
    Round(): this;
    Dot(value: Vector2 | Vec2): number;
    ComputeAngle(): number;
    RotateAround(center: Vector2 | Vec2, angle: number): this;
}
export declare function Vec3(): Vector3;
/**
 * Uses the atan method to calculate the direction between two coordinates, returning an object with the base value and another method and properties.
 *
 * @param x1 x-axis of first coordinate.
 * @param y1 y-axis of first coordinate.
 * @param x2 x-axis of second coordinate.
 * @param y2 y-axis of second coordinate.
 */
export declare function CalculateAtan(x1: number, y1: number, x2: number, y2: number): AtanCalculation;
export declare function AnimateInteger(from: number, to: number, easing: EasingName, duration: number, resultCallback: (value: number) => void): void;
