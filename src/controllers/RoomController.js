import Room from "../models/Room.js";

export default class RoomController {
  constructor(canvas) {
    this.room = new Room();
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  startDrawing() {
    this.isDrawing = true;
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

    if (this.room.previewLine) {
      const { start, end } = this.room.previewLine;
      this.context.setLineDash([5, 5]);
      this.context.beginPath();
      this.context.moveTo(start.x, start.y);
      this.context.lineTo(end.x, end.y);
      this.context.stroke();
      this.context.setLineDash([]);
    }
  }
}
