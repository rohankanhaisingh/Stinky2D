"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSystem2D = exports.Line2D = void 0;
const uid_1 = require("../functions/uid");
const renderobject_1 = require("./renderobject");
class Line2D {
    constructor(from, to, styles) {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.from = from;
        this.to = to;
        this.styles = styles;
    }
}
exports.Line2D = Line2D;
class LineSystem2D extends renderobject_1.RenderObject {
    /**
     * Creates a 2 dimensional line system.
     * Every line added to this system will be shown in the scene.
     *
     * The dimension should be adjusted manually.
     * It can also be set automatically.
     *
     * @param x x-axis of the line system.
     * @param y y-axis of the line system.
     */
    constructor(x, y, options) {
        super();
        this.options = {};
        this.lines = [];
        this.width = 10;
        this.height = 10;
        this.x = x;
        this.y = y;
        this.options = Object.assign({}, options);
        if (typeof options === "undefined")
            this.options = { maxLines: 50 };
    }
    Draw(ctx) {
        if (this.lines.length === 0)
            return 0;
        ctx.save();
        const lines = this.lines;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.x + line.from.x, this.y + line.from.y);
            ctx.lineTo(this.x + line.to.x, this.y + line.to.y);
            renderobject_1.RenderObject.ApplyRenderStyles(ctx, line.styles);
            if (typeof line.styles.borderColor === "string" || typeof line.styles.strokeColor === "string")
                ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
        return 0;
    }
    /**
     * Adds a 2 dimensional line to the 2D line system.
     *
     * @param line Line that will be added to this system.
    */
    AddLine2D(line) {
        if (!(line instanceof Line2D))
            throw new Error("Cannot add line because argument is not a Line2D class, or has a Line2DConstructor interface.");
        this.lines.push(line);
        return this;
    }
    /**
     * Sets a specific style property to all lines added to this line system.
     * The property must be a property within the RenderObjectStyles interface.
     *
     * For detailed information about the style properties, read the documentation for the RenderObjectStyles interface.
     *
     * @param property Style property
     * @param value Style value.
     */
    SetStyleOnLines(property, value) {
        if (this.lines.length === 0)
            return this;
        const lines = this.lines;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            line.styles[property] = value;
        }
        return this;
    }
    /** Destroys all the lines added to this system. */
    DestroyAllLines() {
        this.lines = [];
        return this;
    }
    /** Destroys a specific line class in this system, returning a boolean representing the result of the destruction. */
    DestroyLine(line) {
        if (this.lines.length === 0)
            return false;
        const lines = this.lines;
        for (let i = 0; i < lines.length; i++) {
            const _line = lines[i];
            if (line.id === _line.id) {
                this.lines.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    /**
     * Gets a random line instance added to this instance.
     *
     * Will return null if no lines has been added.
     */
    GetRandomLineInstance() {
        if (this.lines.length === 0)
            return null;
        const lines = this.lines;
        const randomNumber = Math.floor(Math.random() * lines.length);
        return lines[randomNumber];
    }
}
exports.LineSystem2D = LineSystem2D;
