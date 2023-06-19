import { getXY } from "./index";

export class Food {
    private readonly id: string;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public color: string;
    private readonly context: CanvasRenderingContext2D | null;

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D | null) {
        this.id = `${Math.random()}.${Date.now()}`
        this.x = x;
        this.y = y;
        this.color = '#1199ff';
        this.w = 40;
        this.h = 40;
        this.context = ctx;
    }

    public draw() {
        if (this.context) {
            let image = new Image();
            image.src = 'assets/food.png';
            this.context.drawImage(image,this.x, this.y, this.w, this.h);
        }
    }
    public static spawn(ctx: CanvasRenderingContext2D | null) {
        const coords = getXY();
        return new Food(coords.x, coords.y, ctx)
    }

}
