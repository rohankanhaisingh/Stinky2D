import { Renderer, Scene, Looper, Camera } from "..";

const scene: Scene = new Scene(innerWidth, innerHeight, document.querySelector(".app .container") as HTMLDivElement, ["redrawOnResize", "keepSizeToWindow", "disableContextMenu"]);
const renderer: Renderer = new Renderer(scene, { willReadFrequently: true, alpha: true });
const camera: Camera = new Camera(renderer, scene);
const looper: Looper = new Looper();