import Point from "./Point.js";

export default class Room {
  constructor() {
    this.points = [];
    this.previewLine = null;
  }

  addPoint(x, y) {
    const newPoint = new Point(x, y);
    this.points.push(newPoint);
  }

  updatePreviewLine(x, y) {
    if (this.points.length === 0) return;

    this.previewLine = {
      start: this.points[this.points.length - 1],
      end: { x, y },
    };
  }
}
