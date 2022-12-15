"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextNode = void 0;
const renderobject_1 = require("./renderobject");
class TextNode extends renderobject_1.RenderObject {
    constructor(text, x, y, width, height, styles) {
        super();
        this.text = "";
        this.showBoundary = false;
        this.width = 10;
        this.height = 10;
        this.rotation = 0;
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = typeof width === "number" ? width : 10;
        this.height = typeof height === "number" ? height : 10;
        this.styles = Object.assign({}, styles);
    }
    Draw(ctx) {
        ctx.save();
        ctx.beginPath();
        renderobject_1.RenderObject.ApplyRenderStyles(ctx, this.styles);
        ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
        ctx.rotate(this.rotation * Math.PI / 180);
        if (typeof this.styles.textColor === "string" || typeof this.styles.backgroundColor === "string")
            ctx.fillText(this.text, 0 - (this.width / 2), 0 - (this.height / 2));
        if (typeof this.styles.textStrokeColor === "string" || typeof this.styles.borderColor === "string")
            ctx.strokeText(this.text, 0 - (this.width / 2), 0 - (this.height / 2));
        ctx.restore();
        if (!this.showBoundary)
            return 0;
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.strokeStyle = "red";
        ctx.strokeRect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height);
        ctx.restore();
        return 0;
    }
    Update(ctx, deltaTime) {
        return 0;
    }
}
exports.TextNode = TextNode;
