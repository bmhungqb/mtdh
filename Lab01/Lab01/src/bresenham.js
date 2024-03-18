import { Draw } from "./draw.js";

export class Bresenham_painter extends Draw {
    draw(p0, p1, rgba) {
        let x0 = p0[0];
        let y0 = p0[1];
        let x1 = p1[0];
        let y1 = p1[1];
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        if (dx === 0 && dy === 0) return;
        // increase slowly    
        if (dy <= dx) {
            if (x1 < x0) {
                [x0, x1] = [x1, x0];
                [y0, y1] = [y1, y0];
            }
            let y = y0;
            let p = 2 * dy - dx;
            for (let x = x0; x <= x1; x++) {
                this.setPixel(x, y, rgba);
                if (p >= 0) {
                    y += (y1 > y0 ? 1 : -1); // Increment or decrement y based on the direction
                    p -= 2 * dx;
                }
                p += 2 * dy;
            }
        } else {
            if (y1 < y0) {
                [x0, x1] = [x1, x0];
                [y0, y1] = [y1, y0];
            }
            let x = x0;
            let p = 2 * dx - dy;
            for (let y = y0; y <= y1; y++) {
                this.setPixel(x, y, rgba);
                if (p >= 0) {
                    x += (x1 > x0 ? 1 : -1); // Increment or decrement x based on the direction
                    p -= 2 * dy;
                }
                p += 2 * dx;
            }
        }
        this.context.putImageData(this.imageData, 0, 0);
    }
}
