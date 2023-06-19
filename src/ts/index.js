"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXY = exports.CANVAS_HEIGHT = exports.CANVAS_WIDTH = void 0;
var Food_1 = require("./Food");
var Mob_1 = require("./Mob");
var entities = [];
var foods = [];
exports.CANVAS_WIDTH = 1280;
exports.CANVAS_HEIGHT = 800;
var counterMobs = document.querySelector('.count_of_mobs');
var counterFood = document.querySelector('.count_of_food');
function getXY() {
    return {
        x: Math.round(Math.random() * exports.CANVAS_WIDTH) + 1,
        y: Math.round(Math.random() * exports.CANVAS_HEIGHT) + 1
    };
}
exports.getXY = getXY;
(function Runnable() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var iteration = 0;
    function redraw() {
        ctx.clearRect(0, 0, exports.CANVAS_WIDTH, exports.CANVAS_HEIGHT);
        for (var i = 0; i < foods.length; i++) {
            foods[i].draw();
        }
        for (var i = 0; i < entities.length; i++) {
            entities[i].draw();
        }
    }
    setInterval(function () {
        if (counterMobs && counterFood) {
            counterMobs.innerHTML = String(entities.length);
            counterFood.innerHTML = String(foods.length);
        }
        if (iteration === 0) {
            entities.push(Mob_1.Mob.spawn(ctx));
        }
        if (iteration > 0 && iteration % 5 === 0) {
            for (var i = 0; i < entities.length; i++) {
                entities[i].goToClosestFood(foods);
                if (entities[i].countOfIterationUntilBornNew === 0) {
                    entities.push(Mob_1.Mob.spawn(ctx));
                    entities[i].countOfIterationUntilBornNew = 5;
                }
                entities = entities.filter(function (el) { return el.countOfIterationUntilDie !== 0; });
            }
        }
        if (iteration % 10 === 0) {
            foods.push(Food_1.Food.spawn(ctx));
        }
        redraw();
        iteration++;
    }, 100);
})();
