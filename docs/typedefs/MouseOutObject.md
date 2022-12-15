# MouseOutObject

Interface representing an object containing properties which allows you to handle
in-scene mouse events.

- - -

## Interface 

```ts
interface MouseOutObject {
	readonly timestamp: number;
	readonly lastPosition: Vector2;
	readonly scene: SceneConstructor;
	readonly isInWindow: boolean;
}
```