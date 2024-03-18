import { Draw } from "./draw.js";
export class Midpoint_painter extends Draw {
    draw(p0, p1, rgba) {
        let radius = Math.ceil(Math.sqrt(Math.pow(p0[0] - p1[0], 2) + Math.pow(p0[1] - p1[1], 2)));
        let x0 = p0[0];
        let y0 = p0[1];
        let x = radius;
        let y = 0;
        let p = 1 - x;

        while (y <= x) {
            this.setPixel(x0 + x, y0 + y, rgba);
            this.setPixel(x0 + y, y0 + x, rgba);
            this.setPixel(x0 + y, y0 - x, rgba);
            this.setPixel(x0 + x, y0 - y, rgba);
            this.setPixel(x0 - x, y0 - y, rgba);
            this.setPixel(x0 - y, y0 - x, rgba);
            this.setPixel(x0 - y, y0 + x, rgba);
            this.setPixel(x0 - x, y0 + y, rgba);
            y++;
            if (p < 0) {
                p += 2 * y + 3;
            } else {
                x--;
                p += 2 * (y - x) + 5;
            }
        }

        this.context.putImageData(this.imageData, 0, 0);
    }
}
