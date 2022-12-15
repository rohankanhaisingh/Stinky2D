# Vector2

Interface representing an object that can be used when creating an object
with the ``x`` and ``y`` properties.

This interface is also implemented in the ``Vec2`` class.

- - - 

## Interface 

```ts
export interface Vector2 {
	x: number;
	y: number;
}
```

## Example 

```ts
const myPosition: Vector2 = {
	x: 20,
	y: 42
};
```