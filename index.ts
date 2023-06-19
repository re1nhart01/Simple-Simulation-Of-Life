import {Food} from "./Food";
import {Mob} from "./Mob";

let entities: Mob[] = [];
let foods: Food[] = [];
export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 800;
const counterMobs = document.querySelector('.count_of_mobs');
const counterFood = document.querySelector('.count_of_food');

export function getXY() {
    return {
        x: Math.round(Math.random() * CANVAS_WIDTH) + 1,
        y: Math.round(Math.random() * CANVAS_HEIGHT) + 1
    }
}



(function Runnable() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    let iteration = 0;
    function redraw() {
        ctx!.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
            entities.push(Mob.spawn(ctx));
        }
            if (iteration > 0 && iteration % 5 === 0) {
                for (let i = 0; i < entities.length; i++) {
                    entities[i].goToClosestFood(foods);
                    if (entities[i].countOfIterationUntilBornNew === 0) {
                        entities.push(Mob.spawn(ctx))
                        entities[i].countOfIterationUntilBornNew = 5;
                    }
                        entities = entities.filter((el) => el.countOfIterationUntilDie !== 0);
                }
            }
            if (iteration % 10 === 0) {
                foods.push(Food.spawn(ctx))
            }
            redraw();
        iteration++;
    }, 100)
})();
