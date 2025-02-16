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
  getCenter() {
    if (this.points.length === 0) {
      return { x: 0, y: 0 };
    }

    let sumX = 0,
      sumY = 0;
    this.points.forEach((point) => {
      sumX += point.x;
      sumY += point.y;
    });
    const centerX = sumX / this.points.length;
    const centerY = sumY / this.points.length;
    console.log("Room center:", centerX, centerY);
    return { x: centerX, y: centerY };
  }

  isPointInside(point) {
    let inside = false;
    const { x, y } = point;
    const points = this.points;

    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x,
        yi = points[i].y;
      const xj = points[j].x,
        yj = points[j].y;

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }
}
