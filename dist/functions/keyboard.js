"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKeyDown = exports.OnKeyUp = exports.OnKeyDown = exports.KeyUpListeners = exports.KeyDownListeners = exports.ActiveKeys = void 0;
exports.ActiveKeys = {};
exports.KeyDownListeners = {};
exports.KeyUpListeners = {};
/**
 * Listenes on keys being pressed.
 * @param key Can be a key on any keyboard. For example "w", or "g".
 * @param cb Function that'll be called whenever the given key gets pressed.
 * @returns { boolean }
 */
function OnKeyDown(key, cb) {
    if (typeof exports.KeyDownListeners[key] === "function")
        return false;
    exports.KeyDownListeners[key] = cb;
    return true;
}
exports.OnKeyDown = OnKeyDown;
/**
 * Listenes on keys being released.
 * @param key Can be a key on any keyboard. For example "w", or "g".
 * @param cb Function that'll be called whenever the given key gets released.
 * @returns { boolean }
 */
function OnKeyUp(key, cb) {
    if (typeof exports.KeyUpListeners[key] === "function")
        return false;
    exports.KeyUpListeners[key] = cb;
    return true;
}
exports.OnKeyUp = OnKeyUp;
/**
 * Returns a boolean representing the down state of a key.
 * This function can be used within a looper-update event.
 * @param key Can be a key on any keyboard. For example "w", or "g".
 * @returns
 */
function GetKeyDown(key) {
    if (typeof exports.ActiveKeys[key] !== "boolean")
        exports.ActiveKeys[key] = false;
    return exports.ActiveKeys[key];
}
exports.GetKeyDown = GetKeyDown;
// Immediately start listening on keyboard events.
(function () {
    if (typeof window === "undefined")
        return;
    window.addEventListener("keydown", function (ev) {
        if (typeof exports.KeyDownListeners[ev.key] === "function")
            exports.KeyDownListeners[ev.key]({
                key: ev.key,
                mode: "keydown",
                timestamp: Date.now()
            });
        if (typeof exports.ActiveKeys[ev.key] === "boolean")
            exports.ActiveKeys[ev.key] = true;
    });
    window.addEventListener("keyup", function (ev) {
        if (typeof exports.KeyDownListeners[ev.key] === "function")
            exports.KeyDownListeners[ev.key]({
                key: ev.key,
                mode: "keyup",
                timestamp: Date.now()
            });
        if (typeof exports.ActiveKeys[ev.key] === "boolean")
            exports.ActiveKeys[ev.key] = false;
    });
})();
