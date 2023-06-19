"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
var index_1 = require("./index");
var Food = /** @class */ (function () {
    function Food(x, y, ctx) {
        this.id = "".concat(Math.random(), ".").concat(Date.now());
        this.x = x;
        this.y = y;
        this.color = '#1199ff';
        this.w = 20;
        this.h = 20;
        this.context = ctx;
    }
    Food.prototype.draw = function () {
        if (this.context) {
            var image = new Image();
            image.src = 'food.png';
            this.context.drawImage(image, this.x, this.y, this.w, this.h);
        }
    };
    Food.spawn = function (ctx) {
        var coords = (0, index_1.getXY)();
        return new Food(coords.x, coords.y, ctx);
    };
    return Food;
}());
exports.Food = Food;
