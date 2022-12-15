# MouseDownObject 

Interface representing an object containing properties which are set as readonly. Those properties allows you to handle mouse button events.

This object interface is attachted to the [``SceneMouseObject``](./SceneMouseObject.md) object.

See interface [``SceneMouseButtonsObject``](./SceneMouseButtonsObject.md); <br>
See interface [``SceneConstructor``](./SceneConstructor.md);
- - -

## Interface 

```ts
interface MouseDownObject {
	readonly buttons: SceneMouseButtonsObject;
	readonly timestamp: number;
	readonly scene: SceneConstructor;
}
```