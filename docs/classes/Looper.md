# Looper

Creates an looper instance, which will update itself every possible requested frame
using the ``window.requestAnimationFrame`` function.

I couldn't name it better lol.

- - - 

## Constructor

```ts
new Looper(renderer?: Renderer);
```

| Argument name   | Type              | Required | Description                                              |
|-----------------|-------------------|----------|----------------------------------------------------------|
| ``renderer``    | Renderer          | No       | Renderer where the looper will be applied on             |

## Class properties

| Property name        | Type     | Description                         | Access type   |
|----------------------|----------|-------------------------------------|---------------|
| ``id``               | String   | Unique generated id                 | ``Readonly``  |
| ``frameRate``        | Number   | Framerate of the entire looper      | ``Readonly``  |
| ``deltaTime``        | Number   | Delta time                          | ``Readonly``  |
| ``lastTimestamp``    | Number   | Last registered timestamp           | ``Readonly``  |
| ``perfectFrameRate`` | Number   | Can be seen as the simulation speed | ``Changable`` |
| ``times``            | Number[] | Unknown                             | ``Readonly``  |
| ``events``           | Object   | Object containing event functions   | ``Readonly``  |
| ``renderer``         | Renderer | Renderer if existing                | ``Changable`` |

## Methods

### ``SetOffset()``

Sets the camera offset, no idea why you need this but it's there :).

```ts
public SetOffset(x: number | null, y: number | null): Camera;
```
