import Point from "./Point.js";

export default class Room {
  constructor() {
    this.points = [];
    this.isDrawing = false;
    this.previewLine = null;
    this.snapRadius = 8;
  }

  startDrawing() {
    this.isDrawing = true;
    this.points = [];
    this.previewLine = null;
  }

  addPoint(x, y) {
    const newPoint = new Point(x, y);
    const closestPoint = this.findClosestPoint(newPoint);
    if (closestPoint) {
      if (Math.abs(newPoint.x - closestPoint.x) <= this.snapRadius) {
        newPoint.x = closestPoint.x;
      }
      if (Math.abs(newPoint.y - closestPoint.y) <= this.snapRadius) {
        newPoint.y = closestPoint.y;
      }
    }
    if (
      this.points.length > 1 &&
      newPoint.isCloseTo(this.points[0], this.snapRadius)
    ) {
      this.isDrawing = false;
      this.points.push(this.points[0]);
      return;
    }
    this.points.push(newPoint);
  }

  updatePreviewLine(x, y) {
    if (!this.isDrawing || this.points.length === 0) return;
    const newPoint = new Point(x, y);
    const closestPoint = this.findClosestPoint(newPoint);
    if (closestPoint) {
      if (Math.abs(newPoint.x - closestPoint.x) <= this.snapRadius) {
        newPoint.x = closestPoint.x;
      }
      if (Math.abs(newPoint.y - closestPoint.y) <= this.snapRadius) {
        newPoint.y = closestPoint.y;
      }
    }
    this.previewLine = {
      start: this.points[this.points.length - 1],
      end: newPoint,
    };
  }

  findClosestPoint(point) {
    return this.points.find(
      (p) =>
        Math.abs(point.x - p.x) <= this.snapRadius ||
        Math.abs(point.y - p.y) <= this.snapRadius
    );
  }

  isDrawingComplete() {
    return !this.isDrawing;
  }
}
