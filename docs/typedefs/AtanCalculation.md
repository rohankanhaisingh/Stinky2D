# AtanCalculation

Interface representing an object that will be returned when calling the ``CalculatAtan`` function,
which calculates the direction between two coordinates.

- - -

## Interface 

```ts
export interface AtanCalculation {
	base: number;
	cos: number; // Can be seen as the horizontal direction.
	sin: number; // Can be seen as the vertical direction.
	normalize: () => Vector2;
	complete: () => Vector2;
	multiply: (len: number) => Vector2;
}
```

## Example 

```ts
const point1: Vector2 = {
	x: 10,
	y: 50
};

const point2: Vector2 = {
	x: 53,
	y: 238
};

const calculation: AtanCalculation = CalculateAtan(point1.x, point1.y, point2.x, point2.y);
```