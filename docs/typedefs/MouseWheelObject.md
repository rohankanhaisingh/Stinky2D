# MouseWheelObject

Interface representing an object containing properties about the phyical mouse wheel. 

- - - 

## Interface 

```ts
interface MouseWheelObject {
	readonly direction: SceneMouseWheelDirection;
	readonly timestamp: number;
	readonly scene: SceneConstructor;
}
```