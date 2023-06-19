import { CANVAS_HEIGHT, CANVAS_WIDTH, getXY } from "./index";
import { BaseMob } from "./BaseMob";
import {Food} from "./Food";
class Mob extends BaseMob {
    private readonly id: string;
    private readonly context: CanvasRenderingContext2D | null;
    public w: number;
    public h: number;
    public x: number;
    public y: number;
    public isPresent: boolean;
    public countOfIterationUntilDie: number;
    public countOfIterationUntilBornNew: number;
    public color: string;
    public daysOfLife: number;
    private currentSelectedFood: number;
    constructor(x: number, y: number, canvW: number, canvH: number, ctx:  CanvasRenderingContext2D | null) {
        super(canvW, canvH);
        this.id = `${Math.random()}.${Date.now()}`
        this.x = x;
        this.y = y;
        this.isPresent = true;
        this.countOfIterationUntilDie = 10;
        this.countOfIterationUntilBornNew = 5;
        this.color = '#000000'
        this.w = 50;
        this.h = 50;
        this.context = ctx;
        this.daysOfLife = 0;
        this.currentSelectedFood = -1;
    }

    public static spawn(ctx: CanvasRenderingContext2D | null) {
        const coords = getXY();
        return new Mob(coords.x, coords.y, CANVAS_WIDTH, CANVAS_HEIGHT, ctx)
    }

    public getXY() {
        return {
            x: Math.round(Math.random() * CANVAS_WIDTH) + 1,
            y: Math.round(Math.random() * CANVAS_HEIGHT) + 1
        }
    }

    public override draw() {
        if (this.context) {
            let image = new Image();
            image.src = 'assets/amongus.webp';
            this.context.drawImage(image,this.x, this.y, this.w, this.h);
        }
        this.daysOfLife++;
    }

    public override checkIsDie(iteration: number): void {
        if (iteration  % 300 === 0) {
            this.countOfIterationUntilDie--;
        }
        if (this.countOfIterationUntilDie === 0) {
            this.isPresent = false;
        }
    }


    public override goToClosestFood(foods: Food[]): void {
        if (foods.length === 0) {
            return;
        }
        const filteredFood = foods.filter((el) => {
            let dx = el.x - this.x;
            let dy = el.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= 120;
        })
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
                this.countOfIterationUntilDie--
            }

        } else if (filteredFood.length === 1) {
            this.x = filteredFood[0].x;
            this.y = filteredFood[0].y;
            const index = foods.findIndex((el) => el === filteredFood[0])
            foods.splice(index, 1);
            if (this.countOfIterationUntilBornNew) {
                this.countOfIterationUntilBornNew--;
            }
            this.countOfIterationUntilDie += 10;
        } else {
            const index = Math.floor(Math.random() * filteredFood.length);
            const delta = filteredFood[index]
            this.x = delta.x;
            this.y = delta.y;
            foods.splice(index, 1)
            if (this.countOfIterationUntilBornNew) {
                this.countOfIterationUntilBornNew--;
            }
            this.countOfIterationUntilDie += 10;

        }
    }
    public override updateCoords(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}

export { Mob };
