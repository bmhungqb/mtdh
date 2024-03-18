import { Draw } from "./draw.js";

export class DDA_painter extends Draw {
    draw(p0, p1, rgba) {
        let x0 = p0[0];
        let y0 = p0[1];
        let x1 = p1[0];
        let y1 = p1[1];
        const dx = x1 - x0;
        const dy = y1 - y0;
        if (dx === 0 && dy === 0) return;

        if (Math.abs(dy) <= Math.abs(dx)) {
            if (x1 < x0) {
                [x0, x1] = [x1, x0];
                [y0, y1] = [y1, y0];
            }
            const k = dy / dx;
            let y = y0;
            for (let x = x0; x <= x1; x++) {
                this.setPixel(x, Math.floor(y + 0.5), rgba);
                y += k;
            }
        } else {
            if (y1 < y0) {
                [x0, x1] = [x1, x0];
                [y0, y1] = [y1, y0];
            }
            const k = dx / dy;
            let x = x0;
            for (let y = y0; y <= y1; y++) {
                this.setPixel(Math.floor(x + 0.5), y, rgba);
                x += k;
            }
        }
        this.context.putImageData(this.imageData, 0, 0);
    }
}