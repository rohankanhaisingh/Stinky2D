# MouseMoveObject

Interface representing an object containing properties describing the user mouse movement, including properties
such as the x and y axis, velocity and more.

Those properties are set as ``readonly``, which means it cannot be changed outside the scope.

- - -

## Interface 

```ts
interface MouseMoveObject {
	readonly x: number;
	readonly y: number;
	readonly velocityX: number;
	readonly velocityY: number;
	readonly timestamp: number;
	readonly lastTimestamp: number;
	readonly scene: SceneConstructor;
}
```