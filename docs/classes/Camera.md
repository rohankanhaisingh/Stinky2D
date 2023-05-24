# Camera

Things need to be seen and captured, that's why you need this instance.

A camera allows you to render specific parts of a scene.

- - - 

## Constructor

```ts
new Camera(renderer: Renderer | RendererConstructor, scene: Scene | SceneConstructor);
```

| Argument name   | Type              | Required | Description                                              |
|-----------------|-------------------|----------|----------------------------------------------------------|
| ``renderer``    | Renderer          | Yes      | Renderer where the camera will be applied on             |
| ``scene``       | Scene             | Yes      | Scene thingy                                             |

## Class properties

| Property name          | Type                     | Description                                         | Access type                      |
|------------------------|--------------------------|-----------------------------------------------------|----------------------------------|
| ``x``                  | Number                   | X-axis of the camera                                | ``Changable``                    |
| ``y``                  | Number                   | Y-axis of the camera                                | ``Changable``                    |
| ``scaleX``             | Number                   | Horizontal scaling                                  | ``Changable``                    |
| ``scaleY``             | Number                   | Vertical scaling                                    | ``Changable``                    |
| ``width``              | Number                   | View width                                          | ``Changable``                    |
| ``height``             | Number                   | View height                                         | ``Changable``                    |
| ``offscreenRendering`` | Boolean                  | Allows objects to render offscreen                  | ``Changable (prevent doing it)`` |
| ``lastOffset``         | Vector2                  | Vector2 object containing last registered positions | ``Readonly``                     |
| ``renderer``           | Renderer                 | Renderer instance                                   | ``Readonly``                     |
| ``scene``              | Scene                    | Scene instance                                      | ``Readonly``                     |
| ``ctx``                | CanvasRenderingContext2D | 2D rendering context                                | ``Readonly``                     |

## Methods

### ``SetOffset()``

Sets the camera offset, no idea why you need this but it's there :).

```ts
public SetOffset(x: number | null, y: number | null): Camera;
```

### ``AnimatePosition()``

Animates the camera position from one position to another.

```ts
public AnimatePosition(from: Vector2, to: Vector2, easing: EasingName, duration: number): Camera;
```

### ``AnimateCurrentPosition()``

Animates the camera position from the current position to another.

```ts
public AnimateCurrentPosition(to: Vector2, easing: EasingName, duration: number): Camera;
```

### ``AnimateCurrentScaling()``

Animates the camera position from the current scaling position to another.

```ts
public AnimateCurrentScaling(to: Vector2, easing: EasingName, duration: number): Camera;
```