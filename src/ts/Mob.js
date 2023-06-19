"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = void 0;
var _1 = require("./index");
var BaseMob_1 = require("./BaseMob");
var Mob = /** @class */ (function (_super) {
    __extends(Mob, _super);
    function Mob(x, y, canvW, canvH, ctx) {
        var _this = _super.call(this, canvW, canvH) || this;
        _this.id = "".concat(Math.random(), ".").concat(Date.now());
        _this.x = x;
        _this.y = y;
        _this.isPresent = true;
        _this.countOfIterationUntilDie = 10;
        _this.countOfIterationUntilBornNew = 5;
        _this.color = '#000000';
        _this.w = 50;
        _this.h = 50;
        _this.context = ctx;
        _this.daysOfLife = 0;
        return _this;
    }
    Mob.spawn = function (ctx) {
        var coords = (0, _1.getXY)();
        return new Mob(coords.x, coords.y, _1.CANVAS_WIDTH, _1.CANVAS_HEIGHT, ctx);
    };
    Mob.prototype.getXY = function () {
        return {
            x: Math.round(Math.random() * _1.CANVAS_WIDTH) + 1,
            y: Math.round(Math.random() * _1.CANVAS_HEIGHT) + 1
        };
    };
    Mob.prototype.draw = function () {
        if (this.context) {
            var image = new Image();
            image.src = 'amongus.webp';
            this.context.drawImage(image, this.x, this.y, this.w, this.h);
        }
        this.daysOfLife++;
    };
    Mob.prototype.checkIsDie = function (iteration) {
        if (iteration % 300 === 0) {
            this.countOfIterationUntilDie--;
        }
        if (this.countOfIterationUntilDie === 0) {
            this.isPresent = false;
        }
    };
    Mob.prototype.goToClosestFood = function (foods) {
        var _this = this;
        if (foods.length === 0) {
            return;
        }
        var filteredFood = foods.filter(function (el) {
            var dx = el.x - _this.x;
            var dy = el.y - _this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            console.log('dst', dx, dy, distance);
            return distance <= 120;
        });
        if (filteredFood.length === 0) {
            var first = foods[Math.floor(Math.random() * filteredFood.length)];
            console.log(first);
            console.log(this.x, this.y, first);
            var dx = first.x - this.x;
            var dy = first.y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var normalizedDx = dx / distance;
            var normalizedDy = dy / distance;
            var moveDistance = 60;
            this.x += Math.round(normalizedDx * moveDistance);
            this.y += Math.round(normalizedDy * moveDistance);
            console.log(dx, dy, distance, normalizedDx, normalizedDy, this.x, this.y);
            if (this.countOfIterationUntilDie) {
                this.countOfIterationUntilDie--;
            }
            console.log(123);
        }
        else if (filteredFood.length === 1) {
            this.x = filteredFood[0].x;
            this.y = filteredFood[0].y;
            foods = foods.filter(function (el) { return el !== filteredFood[0]; });
            if (this.countOfIterationUntilBornNew) {
                this.countOfIterationUntilBornNew--;
            }
            this.countOfIterationUntilDie += 10;
            console.log(256);
        }
        else {
            var delta_1 = foods[Math.floor(Math.random() * filteredFood.length)];
            this.x = delta_1.x;
            this.y = delta_1.y;
            foods = foods.filter(function (el) { return el !== delta_1; });
            if (this.countOfIterationUntilBornNew) {
                this.countOfIterationUntilBornNew--;
            }
            this.countOfIterationUntilDie += 10;
            console.log(384);
        }
    };
    Mob.prototype.updateCoords = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Mob;
}(BaseMob_1.BaseMob));
exports.Mob = Mob;
