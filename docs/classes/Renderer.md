# Renderer

Here is where the magic gets stored.

By creating a 'renderer' instance, the program can draw images.
This must be manually linked to a 'Scene' instance. If not, no graphics can be displayed

- - - 

## Constructor

```ts
new Renderer(scene: Scene | SceneConstructor, attributes?: RendererAttributes);
```

| Argument name   | Type              | Required | Description                                              |
|-----------------|-------------------|----------|----------------------------------------------------------|
| ``scene``       | Scene             | Yes      | A scene instance where the renderer gets applied on      |
| ``attributes``  | RendererAttributes| Yes      | Renderer attributes                                      |

## Class properties

| Property name            | Type                      | Description                                                                         | Access type   |
|--------------------------|---------------------------|-------------------------------------------------------------------------------------|---------------|
| ``id``                   | String                    | Unique generated ID                                                                 | ``Readonly``  |
| ``timestamp``            | Number                    | Timestamp when the instancing happened                                              | ``Readonly``  |
| ``renderObjects``        | ``RenderObject[]``        | Array stored with render objects                                                    | ``Readonly``  |
| ``visibleRenderObjects`` | ``RenderObject[]``        | Array stored with visible render objects                                            | ``Readonly``  |
| ``attributes``           | RenderAttributes          | Attributes for the renderer                                                         | ``Changable`` |
| ``transform``            | TransformMatrices \| Null | Transform matrices for the entire renderer.                                         | ``Changable`` |
| ``picking``              | Boolean                   | Boolean which represents whether the renderer is activly picking image data or not. | ``Readonly``  |
| ``pickDelay``            | Number                    | Delay between each moment of picking image data.                                    | ``Changable`` |
| ``lastPicked``           | Number                    | Timestamp when the renderer last activly picked image data.                         | ``Readonly``  |
| ``scene``                | Scene                     | Scene instance that is applied to the renderer                                      | ``Readonly``  |
| ``context``              | CanvasRenderingContext2D  | 2D rendering context                                                                | ``Readonly``  |
| ``camera``               | Camera                    | Camera instance that is applied to the renderer                                     | ``Readonly``  |
## Methods

### ``ClearScene()``

Clears the entire scene, which will end up showing a blank screen.
This method might be useful when rendering a lot without frame stacking on eachother.

```ts
public ClearScene(): Renderer;
```

### ``PaintScene()``

This method paints the entire scene using the given color. 
This method does not work together with the 'ClearScene' method
	  
Note that everything will be erased once this method is used.
It will also erase when the window has been resized.

```ts
public PaintScene(color: string): void;
```

### ``RenderObjectsInCamera()``

Render all features added to this renderer instance. The more objects, the longer 
it can take to render. For complex scenes,it might be better to use more Renderer instances.

The ``deltaTime`` paramater is required which will be used to prevent lag delay.
You can pass this paramater while updating a ``Looper`` instance.

See [Looper](./Looper.md) for more details.
```ts
public RenderObjectsInCamera(deltaTime: number): Rendering;
```

### ``Add()``

Adds a render object to this renderer instance.
An error might be thrown if an instance already has been added to this renderer.

This is one of the most used methods in Stinky2D, because you need to 
manually add render objects to this renderer instance.

```ts
public Add(renderObject: RenderObject): RenderObject;
```

### ``EnablePicking()``

Enables the ability to analyze the colors in the rendered image.

The performance might decrease.

```ts
public EnablePicking(): boolean;
```

### ``DisablePicking()``

Disables the ability to analyze the colors in the rendered image.

The performance might **increase**.

```ts
public DisablePicking(): boolean;
```

### ``SetPickDelay()``

Sets a delay in which the rendered image is analyzed
The default value is 100, which is represented as 100 milliseconds.

So each 100 milliseconds, the renderer activily analyses the renderer image.
	 	
Does not accept float numbers.

```ts
public SetPickDelay(delay: number): number;
```

### ``GetImageData()``

The classic way to analyse the renderer image data.

This method returns an ImageData object representing the underlying pixel data for a specified portion of the canvas
using the CanvasRenderingContext2D.getImageData method.
 
If the rendered image is analyzed multiple times, make sure the 'willReadFrequently' option is enabled when building a 'Renderer' class.
The greater the value of the desired width and height of the analysis, the more time it will take to perform the analysis.
WebGL can be used to make the analysis faster, through the graphics card.

```ts
public GetImageData(startX: number, startY: number, width: number, height: number, colorSpace?: PredefinedColorSpace): ImageData;
```

### ``Destroy()``

Destroys a render object.

```ts
public Destroy(renderObject: RenderObject): Renderer;
```

### ``GetObjectByDataAttribute()``

Searches a render object by filtering specific attributes and checking the 
value if they match the entered values.
	  
This method returns either the found render object stored in an array, or null 
if no object has been found. The returning array with render objects can automatically 
be stored in a Collection instance if the argument 'useCollection' is set to true.

This method requires 2 paramters, and one is optional.


```ts
public GetObjectByDataAttribute(attributeName: RenderObjectDataAttributes, attributeValue: string, useCollection?: boolean): RenderObject[] | Collection<RenderObject> | null;
```
