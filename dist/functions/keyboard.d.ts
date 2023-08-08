import { InputEvent } from "../typings";
export declare const ActiveKeys: {
    [K: string]: boolean;
};
export declare const KeyDownListeners: {
    [K: string]: (ev: InputEvent) => void;
};
export declare const KeyUpListeners: {
    [K: string]: (ev: InputEvent) => void;
};
/**
 * Listenes on keys being pressed.
 * @param key Can be a key on any keyboard. For example "w", or "g".
 * @param cb Function that'll be called whenever the given key gets pressed.
 * @returns { boolean }
 */
export declare function OnKeyDown(key: string, cb: (ev: InputEvent) => void): boolean;
/**
 * Listenes on keys being released.
 * @param key Can be a key on any keyboard. For example "w", or "g".
 * @param cb Function that'll be called whenever the given key gets released.
 * @returns { boolean }
 */
export declare function OnKeyUp(key: string, cb: (ev: InputEvent) => void): boolean;
/**
 * Returns a boolean representing the down state of a key.
 * This function can be used within a looper-update event.
 * @param key Can be a key on any keyboard. For example "w", or "g".
 * @returns
 */
export declare function GetKeyDown(key: string): boolean;
