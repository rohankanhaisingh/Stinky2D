import { RenderObjectStyles } from "../typings";
import { Circle } from "./circle";
import { Rectangle } from "./rectangle";
import { Renderer } from "./renderer";
import { RenderObject } from "./renderobject";
export declare namespace Plugins {
    class Toggle extends RenderObject {
        body: Rectangle;
        thumb: Circle;
        isActive: boolean;
        padding: number;
        thumbRadius: number;
        constructor(x: number, y: number, width: number, height: number, bodyStyles: RenderObjectStyles, thumbStyles: RenderObjectStyles);
        SetPosition(x: number, y: number): RenderObject;
        OnAdd(renderer: Renderer): void;
    }
}
