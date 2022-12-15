# SceneConstructor 

Interface which has been implemented in the [``Scene``](../classes/Scene.md) class instance, including properties
declaring types that will be added in the future.

See [``Scene``](../classes/Scene.md) for more details.\
See [``Renderer``](../classes/Renderer.md) for more details.

- - - 

## Interface

```ts
interface SceneConstructor {
	width: number;
	height: number;
	canvasElement: HTMLCanvasElement;
	domElement: HTMLElement;
	renderer?: RendererConstructor;
	camera?: CameraConstructor;
}
```

## Class implementation

```ts
class Scene implements SceneConstructor {
	declare public width;
	declare public height;
	declare public canvasElement;
	declare public domElement;
	declare public renderer;
	declare public camera;
}
```