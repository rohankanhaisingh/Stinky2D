import { AtanCalculation, Vector2, Vector3 } from "../typings";

/**
 * Generates a random number between two numbers.
 * @param number1 Minimum rage number	
 * @param number2 Maximum rage number
*/
export function RandomIntBeween(number1: number, number2: number): number {

	return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
}

/**
 * Calculates the average value of an array, returning a float number.
 * 
 * This method returns an error if any stored element in the given array is not a number type.
 * @param arr Array with numbers stored. 
*/
export function GetAverageArrayValue(arr: number[]) {

    let sum = 0,
        i = 0;

    while (i < arr.length) {

        sum += parseInt(arr[i].toString(), 10);

        i += 1;
    }

    const avg = sum / arr.length;

    return avg;
}

/**
 * Calculates the distance between two coordinates.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
*/
export function CalculateDistance(x1: number, y1: number, x2: number, y2: number) {


    let d1 = x1 - x2,
        d2 = y1 - y2,
        //@ts-expect-error
        distance = Math.sqrt(d1 * d1, d2 * d2);

    return distance;
}

/**Calculates the angle between two coordinates. */
export function CalculateAngle(cx: number, cy: number, ex: number, ey: number) {

    let dy = ey - cy,
        dx = ex - cx,
        theta = Math.atan2(dy, dx);

    theta *= 180 / Math.PI;

    if (theta < 0) theta = 360 + theta;

    return theta;
}

/**
 * Calculates intersecting points between four coordinates, returning a Vector2 object. 
 * 
 * This function requires four parameters that must be an object whose x and y properties are set to a number type.
 * If you are sure that the object you want to use contains properties x and y, you can then cast it to a Vector2 object.
 * 
 * Casting example:
 * CalculateIntersection(obj1 as Vector2, obj2 as Vector2, obj3 as Vector2, obj4 as Vector2);
 * */
export function CalculateIntersection(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): Vector2 {

    var d1 = (p1.x - p2.x) * (p3.y - p4.y); // (x1 - x2) * (y3 - y4)
    var d2 = (p1.y - p2.y) * (p3.x - p4.x); // (y1 - y2) * (x3 - x4)
    var d = (d1) - (d2);

    if (d == 0) throw new Error('Number of intersection points is zero or infinity.'); 

    var u1 = (p1.x * p2.y - p1.y * p2.x); // (x1 * y2 - y1 * x2)
    var u4 = (p3.x * p4.y - p3.y * p4.x); // (x3 * y4 - y3 * x4)

    var u2x = p3.x - p4.x; // (x3 - x4)
    var u3x = p1.x - p2.x; // (x1 - x2)
    var u2y = p3.y - p4.y; // (y3 - y4)
    var u3y = p1.y - p2.y; // (y1 - y2)

    var px = (u1 * u2x - u3x * u4) / d;
    var py = (u1 * u2y - u3y * u4) / d;

    var p: Vector2 = { x: px, y: py };

    return p;
}

/**Creates a empty Vector2 object. */
export function Vec2(x?: number, y?: number): Vector2 {
    return { x: typeof x === "number" ? x : 0, y: typeof y === "number" ? y : 0 }
}

export function Vec3(): Vector3 {
    return { x: 0, y: 0, z: 0 };
}

/**
 * Uses the atan method to calculate the direction between two coordinates, returning an object with the base value and another method and properties.
 * 
 * @param x1 x-axis of first coordinate.
 * @param y1 y-axis of first coordinate.
 * @param x2 x-axis of second coordinate.
 * @param y2 y-axis of second coordinate.
 */
export function CalculateAtan(x1: number, y1: number, x2: number, y2: number): AtanCalculation {

    const a = Math.atan2(y2 - y1, x2 - x1);

    return {
        base: a,
        cos: Math.cos(a),
        sin: Math.sin(a),
        /** Normalizes the cos and sin values ??of the calculated atan value. */
        normalize: function (): Vector2 {
            return {
                x: parseFloat(this.cos.toFixed(2)),
                y: parseFloat(this.sin.toFixed(2))
            }
        },
        complete: function (): Vector2 {
            return {
                x: parseInt(this.cos.toString()),
                y: parseInt(this.sin.toString())
            }
        },
        multiply: function (len: number): Vector2 {
            return {
                x: this.cos * len,
                y: this.sin * len
            }
        }
    }

}