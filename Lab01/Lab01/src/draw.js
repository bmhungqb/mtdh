class Draw {
    constructor(context, width, height) {
        this.context = context;
        this.imageData = context.createImageData(width, height);
        this.firstPoint = null;
        this.now = [-1, -1];
        this.width = width;
        this.height = height;
    }

    getPixelIndex(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height)
            return -1;
        return (x + y * this.width) << 2;
    }

    setPixel(x, y, rgba) {
        const pixelIndex = this.getPixelIndex(x, y);
        if (pixelIndex === -1) return;
        for (let i = 0; i < 4; i++) {
            this.imageData.data[pixelIndex + i] = rgba[i];
        }
    }

    drawPoint(p, rgba) {
        const x = p[0];
        const y = p[1];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                this.setPixel(x + i, y + j, rgba);
            }
        }
        this.context.putImageData(this.imageData, 0, 0);
    }
}

export { Draw };