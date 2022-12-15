# SceneMouseObject

This interface represents an object with properties
that will automatically be modified by the 'Scene' instance based 
on the user their movement.

- - -

## Interface 

```ts
export interface SceneMouseObject {
	x: number;
	y: number;
	velocityX: number;
	velocityY: number;
	lastTimestamp: number;
	wheelDirection: SceneMouseWheelDirection;
	isInWindow: boolean;
	buttons: SceneMouseButtonsObject;
	checkObjectEntry: (x: number, y: number, range: number) => boolean;
	isDragging?: boolean;
}
```