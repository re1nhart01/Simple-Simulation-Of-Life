/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/BaseMob.ts":
/*!***************************!*\
  !*** ./src/ts/BaseMob.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseMob = void 0;
class BaseMob {
    constructor(canvW, canvH) {
        this.canvasWidth = canvW;
        this.canvasHeight = canvH;
    }
}
exports.BaseMob = BaseMob;


/***/ }),

/***/ "./src/ts/Food.ts":
/*!************************!*\
  !*** ./src/ts/Food.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Food = void 0;
const index_1 = __webpack_require__(/*! ./index */ "./src/ts/index.ts");
class Food {
    constructor(x, y, ctx) {
        this.id = `${Math.random()}.${Date.now()}`;
        this.x = x;
        this.y = y;
        this.color = '#1199ff';
        this.w = 40;
        this.h = 40;
        this.context = ctx;
    }
    draw() {
        if (this.context) {
            let image = new Image();
            image.src = 'assets/food.png';
            this.context.drawImage(image, this.x, this.y, this.w, this.h);
        }
    }
    static spawn(ctx) {
        const coords = (0, index_1.getXY)();
        return new Food(coords.x, coords.y, ctx);
    }
}
exports.Food = Food;


/***/ }),

/***/ "./src/ts/Mob.ts":
/*!***********************!*\
  !*** ./src/ts/Mob.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mob = void 0;
const index_1 = __webpack_require__(/*! ./index */ "./src/ts/index.ts");
const BaseMob_1 = __webpack_require__(/*! ./BaseMob */ "./src/ts/BaseMob.ts");
class Mob extends BaseMob_1.BaseMob {
    constructor(x, y, canvW, canvH, ctx) {
        super(canvW, canvH);
        this.id = `${Math.random()}.${Date.now()}`;
        this.x = x;
        this.y = y;
        this.isPresent = true;
        this.countOfIterationUntilDie = 10;
        this.countOfIterationUntilBornNew = 5;
        this.color = '#000000';
        this.w = 50;
        this.h = 50;
        this.context = ctx;
        this.daysOfLife = 0;
        this.currentSelectedFood = -1;
    }
    static spawn(ctx) {
        const coords = (0, index_1.getXY)();
        return new Mob(coords.x, coords.y, index_1.CANVAS_WIDTH, index_1.CANVAS_HEIGHT, ctx);
    }
    getXY() {
        return {
            x: Math.round(Math.random() * index_1.CANVAS_WIDTH) + 1,
            y: Math.round(Math.random() * index_1.CANVAS_HEIGHT) + 1
        };
    }
    draw() {
        if (this.context) {
            let image = new Image();
            image.src = 'assets/amongus.webp';
            this.context.drawImage(image, this.x, this.y, this.w, this.h);
        }
        this.daysOfLife++;
    }
    checkIsDie(iteration) {
        if (iteration % 300 === 0) {
            this.countOfIterationUntilDie--;
        }
        if (this.countOfIterationUntilDie === 0) {
            this.isPresent = false;
        }
    }
    goToClosestFood(foods) {
        if (foods.length === 0) {
            let dx = Math.round(Math.random() * index_1.CANVAS_WIDTH) - this.x;
            let dy = Math.round(Math.random() * index_1.CANVAS_HEIGHT) - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let normalizedDx = dx / distance;
            let normalizedDy = dy / distance;
            let moveDistance = 60;
            this.x += Math.round(normalizedDx * moveDistance);
            this.y += Math.round(normalizedDy * moveDistance);
            return;
        }
        const filteredFood = foods.filter((el) => {
            let dx = el.x - this.x;
            let dy = el.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= 120;
        });
        if (filteredFood.length === 0) {
            let index = this.currentSelectedFood;
            if (!foods[index]) {
                index = Math.floor(Math.random() * foods.length);
                this.currentSelectedFood = index;
            }
            const first = foods[index];
            let dx = first.x - this.x;
            let dy = first.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let normalizedDx = dx / distance;
            let normalizedDy = dy / distance;
            let moveDistance = 60;
            this.x += Math.round(normalizedDx * moveDistance);
            this.y += Math.round(normalizedDy * moveDistance);
            if (this.countOfIterationUntilDie) {
                this.countOfIterationUntilDie--;
            }
        }
        else if (filteredFood.length === 1) {
            this.x = filteredFood[0].x;
            this.y = filteredFood[0].y;
            const index = foods.findIndex((el) => el === filteredFood[0]);
            foods.splice(index, 1);
            if (this.countOfIterationUntilBornNew) {
                this.countOfIterationUntilBornNew--;
            }
            this.countOfIterationUntilDie += 10;
        }
        else {
            const index = Math.floor(Math.random() * filteredFood.length);
            const delta = filteredFood[index];
            this.x = delta.x;
            this.y = delta.y;
            foods.splice(index, 1);
            if (this.countOfIterationUntilBornNew) {
                this.countOfIterationUntilBornNew--;
            }
            this.countOfIterationUntilDie += 10;
        }
    }
    updateCoords(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Mob = Mob;


/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getXY = exports.CANVAS_HEIGHT = exports.CANVAS_WIDTH = void 0;
const Food_1 = __webpack_require__(/*! ./Food */ "./src/ts/Food.ts");
const Mob_1 = __webpack_require__(/*! ./Mob */ "./src/ts/Mob.ts");
let entities = [];
let foods = [];
exports.CANVAS_WIDTH = 1280;
exports.CANVAS_HEIGHT = 800;
const counterMobs = document.querySelector('.count_of_mobs');
const counterFood = document.querySelector('.count_of_food');
function getXY() {
    return {
        x: Math.round(Math.random() * exports.CANVAS_WIDTH) + 1,
        y: Math.round(Math.random() * exports.CANVAS_HEIGHT) + 1
    };
}
exports.getXY = getXY;
(function Runnable() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let iteration = 0;
    function redraw() {
        ctx.clearRect(0, 0, exports.CANVAS_WIDTH, exports.CANVAS_HEIGHT);
        for (let i = 0; i < foods.length; i++) {
            foods[i].draw();
        }
        for (let i = 0; i < entities.length; i++) {
            entities[i].draw();
        }
    }
    setInterval(() => {
        if (counterMobs && counterFood) {
            counterMobs.innerHTML = String(entities.length);
            counterFood.innerHTML = String(foods.length);
        }
        if (iteration === 0) {
            entities.push(Mob_1.Mob.spawn(ctx));
        }
        if (iteration > 0 && iteration % 5 === 0) {
            for (let i = 0; i < entities.length; i++) {
                entities[i].goToClosestFood(foods);
                if (entities[i].countOfIterationUntilBornNew === 0) {
                    entities.push(Mob_1.Mob.spawn(ctx));
                    entities[i].countOfIterationUntilBornNew = 5;
                }
                entities = entities.filter((el) => el.countOfIterationUntilDie !== 0);
            }
        }
        if (iteration % 10 === 0) {
            foods.push(Food_1.Food.spawn(ctx));
        }
        redraw();
        iteration++;
    }, 100);
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUNURjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osZ0JBQWdCLG1CQUFPLENBQUMsa0NBQVM7QUFDakM7QUFDQTtBQUNBLHFCQUFxQixjQUFjLEdBQUcsV0FBVztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7Ozs7Ozs7Ozs7O0FDMUJDO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFdBQVc7QUFDWCxnQkFBZ0IsbUJBQU8sQ0FBQyxrQ0FBUztBQUNqQyxrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYyxHQUFHLFdBQVc7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOzs7Ozs7Ozs7OztBQy9HRTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLEdBQUcscUJBQXFCLEdBQUcsb0JBQW9CO0FBQzVELGVBQWUsbUJBQU8sQ0FBQyxnQ0FBUTtBQUMvQixjQUFjLG1CQUFPLENBQUMsOEJBQU87QUFDN0I7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixxQkFBcUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7OztVQ3ZERDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdW50aXRsZWQxLy4vc3JjL3RzL0Jhc2VNb2IudHMiLCJ3ZWJwYWNrOi8vdW50aXRsZWQxLy4vc3JjL3RzL0Zvb2QudHMiLCJ3ZWJwYWNrOi8vdW50aXRsZWQxLy4vc3JjL3RzL01vYi50cyIsIndlYnBhY2s6Ly91bnRpdGxlZDEvLi9zcmMvdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdW50aXRsZWQxL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VudGl0bGVkMS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3VudGl0bGVkMS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdW50aXRsZWQxL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmFzZU1vYiA9IHZvaWQgMDtcbmNsYXNzIEJhc2VNb2Ige1xuICAgIGNvbnN0cnVjdG9yKGNhbnZXLCBjYW52SCkge1xuICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gY2Fudlc7XG4gICAgICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gY2Fudkg7XG4gICAgfVxufVxuZXhwb3J0cy5CYXNlTW9iID0gQmFzZU1vYjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Gb29kID0gdm9pZCAwO1xuY29uc3QgaW5kZXhfMSA9IHJlcXVpcmUoXCIuL2luZGV4XCIpO1xuY2xhc3MgRm9vZCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgY3R4KSB7XG4gICAgICAgIHRoaXMuaWQgPSBgJHtNYXRoLnJhbmRvbSgpfS4ke0RhdGUubm93KCl9YDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5jb2xvciA9ICcjMTE5OWZmJztcbiAgICAgICAgdGhpcy53ID0gNDA7XG4gICAgICAgIHRoaXMuaCA9IDQwO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjdHg7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2Fzc2V0cy9mb29kLnBuZyc7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBzcGF3bihjdHgpIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gKDAsIGluZGV4XzEuZ2V0WFkpKCk7XG4gICAgICAgIHJldHVybiBuZXcgRm9vZChjb29yZHMueCwgY29vcmRzLnksIGN0eCk7XG4gICAgfVxufVxuZXhwb3J0cy5Gb29kID0gRm9vZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Nb2IgPSB2b2lkIDA7XG5jb25zdCBpbmRleF8xID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XG5jb25zdCBCYXNlTW9iXzEgPSByZXF1aXJlKFwiLi9CYXNlTW9iXCIpO1xuY2xhc3MgTW9iIGV4dGVuZHMgQmFzZU1vYl8xLkJhc2VNb2Ige1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNhbnZXLCBjYW52SCwgY3R4KSB7XG4gICAgICAgIHN1cGVyKGNhbnZXLCBjYW52SCk7XG4gICAgICAgIHRoaXMuaWQgPSBgJHtNYXRoLnJhbmRvbSgpfS4ke0RhdGUubm93KCl9YDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5pc1ByZXNlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvdW50T2ZJdGVyYXRpb25VbnRpbERpZSA9IDEwO1xuICAgICAgICB0aGlzLmNvdW50T2ZJdGVyYXRpb25VbnRpbEJvcm5OZXcgPSA1O1xuICAgICAgICB0aGlzLmNvbG9yID0gJyMwMDAwMDAnO1xuICAgICAgICB0aGlzLncgPSA1MDtcbiAgICAgICAgdGhpcy5oID0gNTA7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGN0eDtcbiAgICAgICAgdGhpcy5kYXlzT2ZMaWZlID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWRGb29kID0gLTE7XG4gICAgfVxuICAgIHN0YXRpYyBzcGF3bihjdHgpIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gKDAsIGluZGV4XzEuZ2V0WFkpKCk7XG4gICAgICAgIHJldHVybiBuZXcgTW9iKGNvb3Jkcy54LCBjb29yZHMueSwgaW5kZXhfMS5DQU5WQVNfV0lEVEgsIGluZGV4XzEuQ0FOVkFTX0hFSUdIVCwgY3R4KTtcbiAgICB9XG4gICAgZ2V0WFkoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBpbmRleF8xLkNBTlZBU19XSURUSCkgKyAxLFxuICAgICAgICAgICAgeTogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogaW5kZXhfMS5DQU5WQVNfSEVJR0hUKSArIDFcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSAnYXNzZXRzL2Ftb25ndXMud2VicCc7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF5c09mTGlmZSsrO1xuICAgIH1cbiAgICBjaGVja0lzRGllKGl0ZXJhdGlvbikge1xuICAgICAgICBpZiAoaXRlcmF0aW9uICUgMzAwID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50T2ZJdGVyYXRpb25VbnRpbERpZS0tO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvdW50T2ZJdGVyYXRpb25VbnRpbERpZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc1ByZXNlbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnb1RvQ2xvc2VzdEZvb2QoZm9vZHMpIHtcbiAgICAgICAgaWYgKGZvb2RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IGR4ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogaW5kZXhfMS5DQU5WQVNfV0lEVEgpIC0gdGhpcy54O1xuICAgICAgICAgICAgbGV0IGR5ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogaW5kZXhfMS5DQU5WQVNfSEVJR0hUKSAtIHRoaXMueTtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBsZXQgbm9ybWFsaXplZER4ID0gZHggLyBkaXN0YW5jZTtcbiAgICAgICAgICAgIGxldCBub3JtYWxpemVkRHkgPSBkeSAvIGRpc3RhbmNlO1xuICAgICAgICAgICAgbGV0IG1vdmVEaXN0YW5jZSA9IDYwO1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGgucm91bmQobm9ybWFsaXplZER4ICogbW92ZURpc3RhbmNlKTtcbiAgICAgICAgICAgIHRoaXMueSArPSBNYXRoLnJvdW5kKG5vcm1hbGl6ZWREeSAqIG1vdmVEaXN0YW5jZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWRGb29kID0gZm9vZHMuZmlsdGVyKChlbCkgPT4ge1xuICAgICAgICAgICAgbGV0IGR4ID0gZWwueCAtIHRoaXMueDtcbiAgICAgICAgICAgIGxldCBkeSA9IGVsLnkgLSB0aGlzLnk7XG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlIDw9IDEyMDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChmaWx0ZXJlZEZvb2QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmN1cnJlbnRTZWxlY3RlZEZvb2Q7XG4gICAgICAgICAgICBpZiAoIWZvb2RzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZm9vZHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZEZvb2QgPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZm9vZHNbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IGR4ID0gZmlyc3QueCAtIHRoaXMueDtcbiAgICAgICAgICAgIGxldCBkeSA9IGZpcnN0LnkgLSB0aGlzLnk7XG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgbGV0IG5vcm1hbGl6ZWREeCA9IGR4IC8gZGlzdGFuY2U7XG4gICAgICAgICAgICBsZXQgbm9ybWFsaXplZER5ID0gZHkgLyBkaXN0YW5jZTtcbiAgICAgICAgICAgIGxldCBtb3ZlRGlzdGFuY2UgPSA2MDtcbiAgICAgICAgICAgIHRoaXMueCArPSBNYXRoLnJvdW5kKG5vcm1hbGl6ZWREeCAqIG1vdmVEaXN0YW5jZSk7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5yb3VuZChub3JtYWxpemVkRHkgKiBtb3ZlRGlzdGFuY2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsRGllKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxEaWUtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmaWx0ZXJlZEZvb2QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnggPSBmaWx0ZXJlZEZvb2RbMF0ueDtcbiAgICAgICAgICAgIHRoaXMueSA9IGZpbHRlcmVkRm9vZFswXS55O1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBmb29kcy5maW5kSW5kZXgoKGVsKSA9PiBlbCA9PT0gZmlsdGVyZWRGb29kWzBdKTtcbiAgICAgICAgICAgIGZvb2RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxCb3JuTmV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxCb3JuTmV3LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvdW50T2ZJdGVyYXRpb25VbnRpbERpZSArPSAxMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlsdGVyZWRGb29kLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IGZpbHRlcmVkRm9vZFtpbmRleF07XG4gICAgICAgICAgICB0aGlzLnggPSBkZWx0YS54O1xuICAgICAgICAgICAgdGhpcy55ID0gZGVsdGEueTtcbiAgICAgICAgICAgIGZvb2RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxCb3JuTmV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxCb3JuTmV3LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvdW50T2ZJdGVyYXRpb25VbnRpbERpZSArPSAxMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVDb29yZHMoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbn1cbmV4cG9ydHMuTW9iID0gTW9iO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFhZID0gZXhwb3J0cy5DQU5WQVNfSEVJR0hUID0gZXhwb3J0cy5DQU5WQVNfV0lEVEggPSB2b2lkIDA7XG5jb25zdCBGb29kXzEgPSByZXF1aXJlKFwiLi9Gb29kXCIpO1xuY29uc3QgTW9iXzEgPSByZXF1aXJlKFwiLi9Nb2JcIik7XG5sZXQgZW50aXRpZXMgPSBbXTtcbmxldCBmb29kcyA9IFtdO1xuZXhwb3J0cy5DQU5WQVNfV0lEVEggPSAxMjgwO1xuZXhwb3J0cy5DQU5WQVNfSEVJR0hUID0gODAwO1xuY29uc3QgY291bnRlck1vYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRfb2ZfbW9icycpO1xuY29uc3QgY291bnRlckZvb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRfb2ZfZm9vZCcpO1xuZnVuY3Rpb24gZ2V0WFkoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogZXhwb3J0cy5DQU5WQVNfV0lEVEgpICsgMSxcbiAgICAgICAgeTogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogZXhwb3J0cy5DQU5WQVNfSEVJR0hUKSArIDFcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRYWSA9IGdldFhZO1xuKGZ1bmN0aW9uIFJ1bm5hYmxlKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgaXRlcmF0aW9uID0gMDtcbiAgICBmdW5jdGlvbiByZWRyYXcoKSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgZXhwb3J0cy5DQU5WQVNfV0lEVEgsIGV4cG9ydHMuQ0FOVkFTX0hFSUdIVCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9vZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvb2RzW2ldLmRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbnRpdGllc1tpXS5kcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoY291bnRlck1vYnMgJiYgY291bnRlckZvb2QpIHtcbiAgICAgICAgICAgIGNvdW50ZXJNb2JzLmlubmVySFRNTCA9IFN0cmluZyhlbnRpdGllcy5sZW5ndGgpO1xuICAgICAgICAgICAgY291bnRlckZvb2QuaW5uZXJIVE1MID0gU3RyaW5nKGZvb2RzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgZW50aXRpZXMucHVzaChNb2JfMS5Nb2Iuc3Bhd24oY3R4KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiA+IDAgJiYgaXRlcmF0aW9uICUgNSA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVudGl0aWVzW2ldLmdvVG9DbG9zZXN0Rm9vZChmb29kcyk7XG4gICAgICAgICAgICAgICAgaWYgKGVudGl0aWVzW2ldLmNvdW50T2ZJdGVyYXRpb25VbnRpbEJvcm5OZXcgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXRpZXMucHVzaChNb2JfMS5Nb2Iuc3Bhd24oY3R4KSk7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0aWVzW2ldLmNvdW50T2ZJdGVyYXRpb25VbnRpbEJvcm5OZXcgPSA1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbnRpdGllcyA9IGVudGl0aWVzLmZpbHRlcigoZWwpID0+IGVsLmNvdW50T2ZJdGVyYXRpb25VbnRpbERpZSAhPT0gMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiAlIDEwID09PSAwKSB7XG4gICAgICAgICAgICBmb29kcy5wdXNoKEZvb2RfMS5Gb29kLnNwYXduKGN0eCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlZHJhdygpO1xuICAgICAgICBpdGVyYXRpb24rKztcbiAgICB9LCAxMDApO1xufSkoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90cy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==