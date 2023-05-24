# Math utility functions

- - -
Stinky2D offers built-in math functions that can be
used everywhere, even without using rendering methods.

Those functions can be imported from the library.

## Table of contents

1. [``RandomIntBetween()``](#RandomIntBetween)
1. [``GetAverageArrayValue()``](#GetAverageArrayValue)
1. [``CalculateDistance()``](#CalculateDistance)
1. [``CalculateAngle()``](#CalculateAngle)
1. [``CalculateIntersection()``](#CalculateIntersection)
1. [``Vec2()``](#Vec2)
1. [``Vec3()``](#Vec3)
1. [``CalculateAtan()``](#CalculateAtan)
1. [``AnimateInteger()``](#AnimateInteger)

- - -

## ``RandomIntBetween()``

This function takes two parameters (number), and returns a random number between the two entered values.

```ts
function RandomIntBetween(number1: number, number2: number): number;
```

## ``GetAverageArrayValue()``

This function takes a parameter that is an array and calculates the average value of that array. The array should only contain numbers.

```ts
function GetAverageArrayValue(arr: number[]): number;