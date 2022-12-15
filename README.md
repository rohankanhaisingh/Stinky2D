# Stinky2D

A 2D graphics library made for Electron applications 

_Last edited by Rohan Kanhaisingh at 1-12-2022._

- - -

## What is Stinky2D

Stinky2D, as mentioned earlier, is a 2D graphics library created for use by Electron applications
the CanvasRenderingContext2D API.

The library is written in TypeScript, giving the developer the ability to write code in the most secure and
efficient way possible. Everything will be ready for deployment after writing code.

## Installation

To install Stinky2D you need to install the NPM package. You do not need to install the declaration types
manually because they are already generated.

```
$ npm install stinky-2d
```

## Usage

```typescript
import { Scene, Renderer, Camera, Looper, LooperTickState, ColorCodes } from "stinky-2d"

const scene = new Scene(innerWidth, innerHeight, document.body);
const renderer = new Renderer(scene);
const camera = new Camera(renderer, scene);
const looper = new Looper();

looper.addEventListener("update", function(state: LooperTickState): void {
	renderer.ClearScene();
	renderer.PaintScene(ColorCodes.BLACK);

	return;
});

looper.Trigger();
```