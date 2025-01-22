import Room from "../models/Room.js";

export default class RoomController {
  constructor(canvas) {
    this.room = new Room();
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.snapRadius = 8;
  }

  startDrawing() {
    this.room.points = [];
    this.room.previewLine = null;
    this.clearCanvas();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRoom() {
    this.clearCanvas();
    const points = this.room.points;

    if (points.length > 1) {
      this.context.beginPath();
      this.context.moveTo(points[0].x, points[0].y);
      points.forEach((point) => this.context.lineTo(point.x, point.y));
      this.context.stroke();
    }
    if (this.room.previewLine && points.length > 0) {
      const { start, end } = this.room.previewLine;
      this.context.setLineDash([5, 5]);
      this.context.beginPath();
      this.context.moveTo(start.x, start.y);
      this.context.lineTo(end.x, end.y);
      this.context.stroke();
      this.context.setLineDash([]);

      this.context.fillStyle = "green";
      this.context.fillRect(
        this.room.previewLine.end.x - 3,
        this.room.previewLine.end.y - 3,
        6,
        6
      );
    }
    points.forEach((point) => {
      this.context.fillStyle = "green";
      this.context.fillRect(point.x - 3, point.y - 3, 6, 6);
    });
  }
  snapToAxes(x, y) {
    let snappedX = x;
    let snappedY = y;

    for (const point of this.room.points) {
      if (Math.abs(x - point.x) <= this.snapRadius) {
        snappedX = point.x;
      }
      if (Math.abs(y - point.y) <= this.snapRadius) {
        snappedY = point.y;
      }
    }

    return { x: snappedX, y: snappedY };
  }

  updatePreviewLineWithSnap(x, y) {
    if (this.room.points.length === 0) return;

    const snappedCoords = this.snapToAxes(x, y);
    this.room.previewLine = {
      start: this.room.points[this.room.points.length - 1],
      end: snappedCoords,
    };
  }
}
