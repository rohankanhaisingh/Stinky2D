"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugins = void 0;
const math_1 = require("../functions/math");
const circle_1 = require("./circle");
const rectangle_1 = require("./rectangle");
const renderobject_1 = require("./renderobject");
var Plugins;
(function (Plugins) {
    class Toggle extends renderobject_1.RenderObject {
        constructor(x, y, width, height, bodyStyles, thumbStyles) {
            super();
            this.isActive = false;
            this.padding = 5;
            this.thumbRadius = 10;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            const thumbDistance = (height / 2) - this.thumbRadius;
            this.body = new rectangle_1.Rectangle(x - this.padding, y - this.padding, width + (this.padding * 2), height + (this.padding * 2), bodyStyles);
            this.thumb = new circle_1.Circle(x + this.thumbRadius + thumbDistance, y + this.thumbRadius + thumbDistance, this.thumbRadius, 0, 360, false, thumbStyles);
            this.body.AddEventListener("mouseDown", () => {
                if (!this.isActive) {
                    (0, math_1.AnimateInteger)(this.height / 2, this.width - (this.height / 2), "easeOutBack", 500, value => {
                        this.thumb.x = this.x + value;
                    });
                    this.isActive = true;
                }
                else {
                    (0, math_1.AnimateInteger)(this.width - (this.height / 2), this.height / 2, "easeOutBack", 500, value => {
                        this.thumb.x = this.x + value;
                    });
                    this.isActive = false;
                }
            });
        }
        SetPosition(x, y) {
            if (typeof this.x !== "number")
                throw new Error("Cannot set x-axis of object, as it does not exist or is not a number.");
            if (typeof this.y !== "number")
                throw new Error("Cannot set y-axis of object, as it does not exist or is not a number.");
            const thumbYDistance = (this.height / 2) - this.thumbRadius;
            this.x = x;
            this.y = y;
            this.body.x = this.x - this.padding;
            this.body.y = this.y - this.padding;
            this.thumb.x = this.isActive ? this.x + this.width - (this.height / 2) : this.x + (this.height / 2);
            this.thumb.y = this.y + this.thumbRadius + thumbYDistance;
            return this;
        }
        OnAdd(renderer) {
            renderer.Add(this.body);
            renderer.Add(this.thumb);
        }
    }
    Plugins.Toggle = Toggle;
})(Plugins = exports.Plugins || (exports.Plugins = {}));
