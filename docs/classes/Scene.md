# Scene

Creates a scene in which allow you what and where you want things to be 
rendered. 

This is NOT the place where you add graphical elements.
You can add cameras though.

- - - 

## Constructor

```ts
new Scene(width: number, height: number, domElement: HTMLElement, attributes?: SceneAttributes[]);
```

| Argument name   | Type             | Required | Description                                              |
|-----------------|------------------|----------|----------------------------------------------------------|
| ``width``       | Number           | Yes      | The width of the scene.                                  |
| ``height``      | Number           | Yes      | The height of the scene.                                 |
| ``domElement``  | HTMLElement      | Yes      | The element in which the canvas element will be appended |
| ``attributes``  | SceneAttributes[]| No       | Attributes and things you know.                          |

## Class properties

| Property name     | Type              | Description                                         | Access type   |
|-------------------|-------------------|-----------------------------------------------------|---------------|
| ``width``         | Number            | The width of the scene                              | ``Changable`` |
| ``height``        | Number            | The height of the scene                             | ``Changable`` |
| ``domElement``    | HTMLElement       | Element in which the canvas element gets appened in | ``Readonly``  |
| ``canvasElement`` | HTMLCanvasElement | Canvas element in where things will get painted     | ``Readonly``  |
| ``events``        | Unknown           | Object containing event functions                   | ``Readonly``  |
| ``mouse``         | SceneMouseObject  | Object containing info about the user mouse         | ``Readonly``  |
| ``camera``        | Camera            | Camera instance                                     | ``Readonly``  |
| ``renderer``      | Renderer          | Renderer instance                                   | ``Readonly``  |

## Methods

### ``SetPosition()``

Sets an attribute to this instance, which will have impact on certain behaviors. 

```ts
public SetAttribute(attribute: SceneAttributes): SceneAttributes[];
```

### ``RemoveAttribute()``

Removes an existing attribute from this instance.

```ts
public RemoveAttribute(attribute: SceneAttributes): SceneAttributes[];
```

### ``ExportToImage()``

Exports the canvas element to an image using a specific
image format. The recommended image format is "png".
	  
Will return ``null`` if the given format is unknown.

```ts
public ExportToImage(format: SceneImageFormat): null | string;
```

### ``AddEventListener()``

Appends an event listener which will be evoked when any of these event gets triggered. 
	  
When an event listener already exists, an error will be returned.

```ts
public AddEventListener<K extends keyof SceneEventsMap>(event: K, cb: SceneEventsMap[K]): Scene;
```

### ``RemoveEventListener()``

Removes an existing event listener, returning a boolean describing
the state of the removal.

```ts
public RemoveEventListener<K extends keyof SceneEventsMap>(event: K): boolean ;
```

### ``GetFixedMousePosition()``

Calculates the fixed mouse position based on the applied camera position
and the mouse position, returning a Vector2 typeof object.
	  
Note that if no camera has been applied, the normal mouse position will be returned.

```ts
public GetFixedMousePosition(): Vector2;
```

### ``Center()``

Calculates the center coordinate of the canvas element
and returns a Vec2 class instance containing the calculated values.
	  
Requires no arguments.
```ts
public Center(): Vec2;
```
