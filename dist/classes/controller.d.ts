import { GamepadControllerConstructor, GamepadControllerEventMap, GamepadControllerTypeMap, GamepadHandlerConstructor, GamepadHandlerEventMap } from "../typings";
import { Collection } from "./collection";
export declare class GamepadController implements GamepadControllerConstructor {
    id: string;
    timestamp: number;
    updateSpeed: number;
    start: number;
    gamepad: Gamepad;
    gamepadId: string;
    axes: number[];
    buttons: GamepadButton[];
    events: {
        [K: string]: Function;
    };
    constructor(gamepad: Gamepad);
    AddEventListener<K extends keyof GamepadControllerEventMap>(event: K, cb: GamepadControllerEventMap[K]): void;
    Update(index: number): void;
    ResolveControllerTypeValues<K extends keyof GamepadControllerTypeMap>(type: K): GamepadControllerTypeMap[K] | null;
}
export declare class GamepadHandler implements GamepadHandlerConstructor {
    id: string;
    timestamp: number;
    controllers: Collection<GamepadController>;
    events: {
        [K: string]: Function;
    };
    foundFirstController: boolean;
    constructor(maxControllers?: number);
    AddEventListener<K extends keyof GamepadHandlerEventMap>(event: K, cb: GamepadHandlerEventMap[K]): void;
    Update(deltaTime: number): void;
    WaitForController(): Promise<null | GamepadController>;
}
