import {Food} from "./Food";

export abstract class BaseMob {
    protected canvasWidth: number;
    protected canvasHeight: number;

    protected constructor(canvW: number, canvH: number) {
        this.canvasWidth = canvW;
        this.canvasHeight = canvH;
    }

    public abstract draw(): void;
    public abstract checkIsDie(iteration: number): void;
    public abstract updateCoords(x: number, y: number): void;
    public abstract goToClosestFood(foods: Food[]): void;

}
