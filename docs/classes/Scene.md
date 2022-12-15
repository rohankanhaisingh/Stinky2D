# Scene

Creating a ``Scene`` class instance will initialize the entire drawing process, 
creating a [``HTMLCanvasElement``](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) instance.

This is a required component in the program. Without this instance, no graphics will and can be shown.

- - - 

## Constructor

```ts
new Scene(width: number, height: number, domElement: HTMLElement, attributes?: SceneAttributes[]);
```

| Argument name  | Type              | Required | Description                                                                 |
|----------------|-------------------|----------|-----------------------------------------------------------------------------|
| ``width``      | Number            | yes      | Sets the width of the scene.                                                |
| ``height``     | Number            | yes      | Sets the height of the scene.                                               |
| ``domElement`` | HTMLElement       | yes      | A HTMLElement in which the canvas element of the scene will be appended in. |
| ``attributes`` | SceneAttributes[] | no       | Attributes that will set the behaviour of the scene.                        |

## Class properties

| Property name     | Type                                                    | Description                                                                 |
|-------------------|---------------------------------------------------------|-----------------------------------------------------------------------------|
| ``width``         | Number                                                  | Sets the width of the scene.                                                |
| ``height``        | Number                                                  | Sets the height of the scene.                                               |
| ``domElement``    | HTMLElement                                             | A HTMLElement in which the canvas element of the scene will be appended in. |
| ``canvasElement`` | HTMLCanvasElement                                       | Canvas element that will be created.                                        |
| ``id``            | String                                                  | Unique generated id for this instance.                                      |
| ``events``        | ``{[key: string]: Function}``                           | Object with event functions.                                                |
| ``attributes``    | ``SceneAttributes[]``                                   | Attributes that will set the behaviour of the scene.                        |
| ``mouse``         | [``SceneMouseObject``](../typedefs/SceneMouseObject.md) | Object containing properties and methods being controlled by the mouse.     |
| ``camera``        | [``Camera``](./Camera.md)                               | Camera instance that will be applied later.                                 |
| ``renderer``      | [``Renderer``](./Renderer.md)                           | Renderer instance that will be applied later.                               |

## Methods

### SetAttribute()

Sets an attribute to this instance, which will have impact on certain behaviors. 

| Argument name |                            Type                      | Required |
|---------------|------------------------------------------------------|----------|
| ``attribute`` | [``SceneAttributes``](../typedefs/SceneAttribute.md) | Yes      |

### RemoveAttribute()

Removes an existing attribute of this instance.

| Argument name |                            Type                      | Required |
|---------------|------------------------------------------------------|----------|
| ``attribute`` | [``SceneAttributes``](../typedefs/SceneAttribute.md) | Yes      |

### ExportToImage()

Exports the canvas element to an image.
Will return ``null`` if the given format is unknown.

| Argument name |                          Type                           | Required |
|---------------|---------------------------------------------------------|----------|
| ``format``    | [``SceneImageFormat``](../typedefs/SceneImageFormat.md) | Yes      |

### AddEventListener()

 Appends an event listener which will be evoked when any of these event gets triggered. 
 When an event listener already exists, an error will be returned.

| Argument name | Type                                          | Required |
|---------------|-----------------------------------------------|----------|
| ``event``     | [``SceneEvents``](../typedefs/SceneEvents.md) | Yes      |
| ``cb``        | Function                                      | Yes      |

### RemoveEventListener()

Removes an existing event listener.

| Argument name | Type                                          | Required |
|---------------|-----------------------------------------------|----------|
| ``event``     | [``SceneEvents``](../typedefs/SceneEvents.md) | Yes      |

### GetFixedMousePosition()

Returns an object with the calculated mouse position based on the camera position.

Returns a [``Vector2``](../typedefs/Vector2.md) object.

## Examples

### Example 1

```ts
import { Scene } from "stinky-2d";

const myScene = new Scene(innerWidth, innerHeight, document.body);

myScene.SetAttribute("keepSizeToWindow");
myScene.SetAttribute("disableContextMenu");
myScene.SetAttribute("redrawOnResize");
```