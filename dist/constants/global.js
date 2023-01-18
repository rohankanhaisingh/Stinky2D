"use strict";
const Utilities = require("../functions/utilities");
const MathUtils = require("../functions/math");
(function () {
    window.Stinky2D = {};
    window.RenderingOptions = {};
    window.Stinky2D.Utilities = {};
    window.Stinky2D.Math = {};
    for (let l in Utilities)
        window.Stinky2D.Utilities[l] = Utilities[l];
    for (let l in MathUtils)
        window.Stinky2D.Math[l] = MathUtils[l];
})();
