import { DDA_painter } from "./dda.js";
import { Bresenham_painter } from "./bresenham.js";
import { Midpoint_painter } from "./midpoint.js";
// Initialize canvas and context
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Set canvas width and height
const width = 1200;
const height = 500;
canvas.width = width;
canvas.height = height;

// Define RGBA colors
const bgRgba = [240, 240, 200, 255];
const pointRgba = [0, 0, 255, 255];
const lineRgba = [0, 0, 0, 255];
const vlineRgba = [255, 0, 0, 255];

// Create DDA_painter instance
let painter = new DDA_painter(context, width, height);

let state = 0;

// Function to get canvas position
function getPosOnCanvas(x, y) {
    const bbox = canvas.getBoundingClientRect();
    return [
        Math.floor(x - bbox.left * (canvas.width / bbox.width) + 0.5),
        Math.floor(y - bbox.top * (canvas.height / bbox.height) + 0.5)
    ];
}

// Function to handle click events
function doOnclick(e) {
    const p = getPosOnCanvas(e.clientX, e.clientY);
    if (state === 0) {
        painter.drawPoint(p, pointRgba);
        painter.firstPoint = p
        state = 1;
    } else if (state === 1) {
        painter.drawPoint(p, pointRgba);
        painter.draw(painter.firstPoint, p, lineRgba);
        state = 0;
    }
}
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    painter.imageData = context.createImageData(width, height);
}
// Add click event listener to the canvas
canvas.addEventListener("click", doOnclick);

document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("options");

    selectElement.addEventListener("change", function () {
        let selectedAlgorithm = this.value;
        clear();
        if (selectedAlgorithm == "dda") {
            painter = new DDA_painter(context, width, height);

        }
        else if (selectedAlgorithm == "midpoint") {
            painter = new Midpoint_painter(context, width, height);
        }
        else {
            painter = new Bresenham_painter(context, width, height);
        }
    });
});

document.getElementById("clearButton").addEventListener("click", clear);