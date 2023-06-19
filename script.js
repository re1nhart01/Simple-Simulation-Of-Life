/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./BaseMob.ts":
/*!********************!*\
  !*** ./BaseMob.ts ***!
  \********************/
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

/***/ "./Food.ts":
/*!*****************!*\
  !*** ./Food.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Food = void 0;
const index_1 = __webpack_require__(/*! ./index */ "./index.ts");
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
            image.src = 'food.png';
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

/***/ "./Mob.ts":
/*!****************!*\
  !*** ./Mob.ts ***!
  \****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mob = void 0;
const _1 = __webpack_require__(/*! . */ "./index.ts");
const BaseMob_1 = __webpack_require__(/*! ./BaseMob */ "./BaseMob.ts");
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
        const coords = (0, _1.getXY)();
        return new Mob(coords.x, coords.y, _1.CANVAS_WIDTH, _1.CANVAS_HEIGHT, ctx);
    }
    getXY() {
        return {
            x: Math.round(Math.random() * _1.CANVAS_WIDTH) + 1,
            y: Math.round(Math.random() * _1.CANVAS_HEIGHT) + 1
        };
    }
    draw() {
        if (this.context) {
            let image = new Image();
            image.src = 'amongus.webp';
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
            console.log(123);
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
            console.log(256);
        }
        else {
            const index = Math.floor(Math.random() * filteredFood.length);
            const delta = foods[index];
            this.x = delta.x;
            this.y = delta.y;
            foods.splice(index, 1);
            if (this.countOfIterationUntilBornNew) {
                this.countOfIterationUntilBornNew--;
            }
            this.countOfIterationUntilDie += 10;
            console.log(384);
        }
        console.log(foods);
    }
    updateCoords(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Mob = Mob;


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getXY = exports.CANVAS_HEIGHT = exports.CANVAS_WIDTH = void 0;
const Food_1 = __webpack_require__(/*! ./Food */ "./Food.ts");
const Mob_1 = __webpack_require__(/*! ./Mob */ "./Mob.ts");
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
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUNURjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osZ0JBQWdCLG1CQUFPLENBQUMsMkJBQVM7QUFDakM7QUFDQTtBQUNBLHFCQUFxQixjQUFjLEdBQUcsV0FBVztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7Ozs7Ozs7Ozs7O0FDMUJDO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFdBQVc7QUFDWCxXQUFXLG1CQUFPLENBQUMscUJBQUc7QUFDdEIsa0JBQWtCLG1CQUFPLENBQUMsK0JBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGNBQWMsR0FBRyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7Ozs7Ozs7Ozs7O0FDM0dFO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWEsR0FBRyxxQkFBcUIsR0FBRyxvQkFBb0I7QUFDNUQsZUFBZSxtQkFBTyxDQUFDLHlCQUFRO0FBQy9CLGNBQWMsbUJBQU8sQ0FBQyx1QkFBTztBQUM3QjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFCQUFxQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7O1VDdkREO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91bnRpdGxlZDEvLi9CYXNlTW9iLnRzIiwid2VicGFjazovL3VudGl0bGVkMS8uL0Zvb2QudHMiLCJ3ZWJwYWNrOi8vdW50aXRsZWQxLy4vTW9iLnRzIiwid2VicGFjazovL3VudGl0bGVkMS8uL2luZGV4LnRzIiwid2VicGFjazovL3VudGl0bGVkMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91bnRpdGxlZDEvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly91bnRpdGxlZDEvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3VudGl0bGVkMS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJhc2VNb2IgPSB2b2lkIDA7XG5jbGFzcyBCYXNlTW9iIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52VywgY2FudkgpIHtcbiAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IGNhbnZXO1xuICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNhbnZIO1xuICAgIH1cbn1cbmV4cG9ydHMuQmFzZU1vYiA9IEJhc2VNb2I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRm9vZCA9IHZvaWQgMDtcbmNvbnN0IGluZGV4XzEgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcbmNsYXNzIEZvb2Qge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGN0eCkge1xuICAgICAgICB0aGlzLmlkID0gYCR7TWF0aC5yYW5kb20oKX0uJHtEYXRlLm5vdygpfWA7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuY29sb3IgPSAnIzExOTlmZic7XG4gICAgICAgIHRoaXMudyA9IDQwO1xuICAgICAgICB0aGlzLmggPSA0MDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY3R4O1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9ICdmb29kLnBuZyc7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBzcGF3bihjdHgpIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gKDAsIGluZGV4XzEuZ2V0WFkpKCk7XG4gICAgICAgIHJldHVybiBuZXcgRm9vZChjb29yZHMueCwgY29vcmRzLnksIGN0eCk7XG4gICAgfVxufVxuZXhwb3J0cy5Gb29kID0gRm9vZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Nb2IgPSB2b2lkIDA7XG5jb25zdCBfMSA9IHJlcXVpcmUoXCIuXCIpO1xuY29uc3QgQmFzZU1vYl8xID0gcmVxdWlyZShcIi4vQmFzZU1vYlwiKTtcbmNsYXNzIE1vYiBleHRlbmRzIEJhc2VNb2JfMS5CYXNlTW9iIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjYW52VywgY2FudkgsIGN0eCkge1xuICAgICAgICBzdXBlcihjYW52VywgY2FudkgpO1xuICAgICAgICB0aGlzLmlkID0gYCR7TWF0aC5yYW5kb20oKX0uJHtEYXRlLm5vdygpfWA7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuaXNQcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxEaWUgPSAxMDtcbiAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxCb3JuTmV3ID0gNTtcbiAgICAgICAgdGhpcy5jb2xvciA9ICcjMDAwMDAwJztcbiAgICAgICAgdGhpcy53ID0gNTA7XG4gICAgICAgIHRoaXMuaCA9IDUwO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjdHg7XG4gICAgICAgIHRoaXMuZGF5c09mTGlmZSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkRm9vZCA9IC0xO1xuICAgIH1cbiAgICBzdGF0aWMgc3Bhd24oY3R4KSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9ICgwLCBfMS5nZXRYWSkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNb2IoY29vcmRzLngsIGNvb3Jkcy55LCBfMS5DQU5WQVNfV0lEVEgsIF8xLkNBTlZBU19IRUlHSFQsIGN0eCk7XG4gICAgfVxuICAgIGdldFhZKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogXzEuQ0FOVkFTX1dJRFRIKSArIDEsXG4gICAgICAgICAgICB5OiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBfMS5DQU5WQVNfSEVJR0hUKSArIDFcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSAnYW1vbmd1cy53ZWJwJztcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXlzT2ZMaWZlKys7XG4gICAgfVxuICAgIGNoZWNrSXNEaWUoaXRlcmF0aW9uKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb24gJSAzMDAgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsRGllLS07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsRGllID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzUHJlc2VudCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdvVG9DbG9zZXN0Rm9vZChmb29kcykge1xuICAgICAgICBpZiAoZm9vZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWRGb29kID0gZm9vZHMuZmlsdGVyKChlbCkgPT4ge1xuICAgICAgICAgICAgbGV0IGR4ID0gZWwueCAtIHRoaXMueDtcbiAgICAgICAgICAgIGxldCBkeSA9IGVsLnkgLSB0aGlzLnk7XG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlIDw9IDEyMDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChmaWx0ZXJlZEZvb2QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmN1cnJlbnRTZWxlY3RlZEZvb2Q7XG4gICAgICAgICAgICBpZiAoIWZvb2RzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZm9vZHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZEZvb2QgPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZm9vZHNbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IGR4ID0gZmlyc3QueCAtIHRoaXMueDtcbiAgICAgICAgICAgIGxldCBkeSA9IGZpcnN0LnkgLSB0aGlzLnk7XG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgbGV0IG5vcm1hbGl6ZWREeCA9IGR4IC8gZGlzdGFuY2U7XG4gICAgICAgICAgICBsZXQgbm9ybWFsaXplZER5ID0gZHkgLyBkaXN0YW5jZTtcbiAgICAgICAgICAgIGxldCBtb3ZlRGlzdGFuY2UgPSA2MDtcbiAgICAgICAgICAgIHRoaXMueCArPSBNYXRoLnJvdW5kKG5vcm1hbGl6ZWREeCAqIG1vdmVEaXN0YW5jZSk7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5yb3VuZChub3JtYWxpemVkRHkgKiBtb3ZlRGlzdGFuY2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsRGllKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxEaWUtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKDEyMyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmlsdGVyZWRGb29kLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy54ID0gZmlsdGVyZWRGb29kWzBdLng7XG4gICAgICAgICAgICB0aGlzLnkgPSBmaWx0ZXJlZEZvb2RbMF0ueTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZm9vZHMuZmluZEluZGV4KChlbCkgPT4gZWwgPT09IGZpbHRlcmVkRm9vZFswXSk7XG4gICAgICAgICAgICBmb29kcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsQm9ybk5ldykge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsQm9ybk5ldy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxEaWUgKz0gMTA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygyNTYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaWx0ZXJlZEZvb2QubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gZm9vZHNbaW5kZXhdO1xuICAgICAgICAgICAgdGhpcy54ID0gZGVsdGEueDtcbiAgICAgICAgICAgIHRoaXMueSA9IGRlbHRhLnk7XG4gICAgICAgICAgICBmb29kcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsQm9ybk5ldykge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRPZkl0ZXJhdGlvblVudGlsQm9ybk5ldy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3VudE9mSXRlcmF0aW9uVW50aWxEaWUgKz0gMTA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygzODQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGZvb2RzKTtcbiAgICB9XG4gICAgdXBkYXRlQ29vcmRzKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5leHBvcnRzLk1vYiA9IE1vYjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRYWSA9IGV4cG9ydHMuQ0FOVkFTX0hFSUdIVCA9IGV4cG9ydHMuQ0FOVkFTX1dJRFRIID0gdm9pZCAwO1xuY29uc3QgRm9vZF8xID0gcmVxdWlyZShcIi4vRm9vZFwiKTtcbmNvbnN0IE1vYl8xID0gcmVxdWlyZShcIi4vTW9iXCIpO1xubGV0IGVudGl0aWVzID0gW107XG5sZXQgZm9vZHMgPSBbXTtcbmV4cG9ydHMuQ0FOVkFTX1dJRFRIID0gMTI4MDtcbmV4cG9ydHMuQ0FOVkFTX0hFSUdIVCA9IDgwMDtcbmNvbnN0IGNvdW50ZXJNb2JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50X29mX21vYnMnKTtcbmNvbnN0IGNvdW50ZXJGb29kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50X29mX2Zvb2QnKTtcbmZ1bmN0aW9uIGdldFhZKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIGV4cG9ydHMuQ0FOVkFTX1dJRFRIKSArIDEsXG4gICAgICAgIHk6IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIGV4cG9ydHMuQ0FOVkFTX0hFSUdIVCkgKyAxXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0WFkgPSBnZXRYWTtcbihmdW5jdGlvbiBSdW5uYWJsZSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgbGV0IGl0ZXJhdGlvbiA9IDA7XG4gICAgZnVuY3Rpb24gcmVkcmF3KCkge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGV4cG9ydHMuQ0FOVkFTX1dJRFRILCBleHBvcnRzLkNBTlZBU19IRUlHSFQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvb2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb29kc1tpXS5kcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZW50aXRpZXNbaV0uZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKGNvdW50ZXJNb2JzICYmIGNvdW50ZXJGb29kKSB7XG4gICAgICAgICAgICBjb3VudGVyTW9icy5pbm5lckhUTUwgPSBTdHJpbmcoZW50aXRpZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvdW50ZXJGb29kLmlubmVySFRNTCA9IFN0cmluZyhmb29kcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVyYXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goTW9iXzEuTW9iLnNwYXduKGN0eCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVyYXRpb24gPiAwICYmIGl0ZXJhdGlvbiAlIDUgPT09IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5nb1RvQ2xvc2VzdEZvb2QoZm9vZHMpO1xuICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5jb3VudE9mSXRlcmF0aW9uVW50aWxCb3JuTmV3ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0aWVzLnB1c2goTW9iXzEuTW9iLnNwYXduKGN0eCkpO1xuICAgICAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5jb3VudE9mSXRlcmF0aW9uVW50aWxCb3JuTmV3ID0gNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZW50aXRpZXMgPSBlbnRpdGllcy5maWx0ZXIoKGVsKSA9PiBlbC5jb3VudE9mSXRlcmF0aW9uVW50aWxEaWUgIT09IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVyYXRpb24gJSAxMCA9PT0gMCkge1xuICAgICAgICAgICAgZm9vZHMucHVzaChGb29kXzEuRm9vZC5zcGF3bihjdHgpKTtcbiAgICAgICAgfVxuICAgICAgICByZWRyYXcoKTtcbiAgICAgICAgaXRlcmF0aW9uKys7XG4gICAgfSwgMTAwKTtcbn0pKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==