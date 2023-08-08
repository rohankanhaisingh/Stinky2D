"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InbuiltFunction = void 0;
const uid_1 = require("../functions/uid");
class InbuiltFunction {
    constructor() {
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
    }
    Execute() { }
    ;
}
exports.InbuiltFunction = InbuiltFunction;
