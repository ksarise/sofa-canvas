import Room from "../models/Room.js";

export default class RoomController {
  constructor(canvas) {
    this.room = new Room();
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.cursorPoint = null;
  }

  startDrawing() {
    this.room.startDrawing();
    this.cursorPoint = null;
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
      this.context.strokeStyle = "black";
      this.context.lineWidth = 2;
      this.context.stroke();
    }

    const previewLine = this.room.previewLine;
    if (previewLine) {
      this.context.setLineDash([5, 5]);
      this.context.beginPath();
      this.context.moveTo(previewLine.start.x, previewLine.start.y);
      this.context.lineTo(previewLine.end.x, previewLine.end.y);
      this.context.strokeStyle = "black";
      this.context.lineWidth = 1;
      this.context.stroke();
      this.context.setLineDash([]);
    }

    if (this.room.isDrawing) {
      points.forEach((point) => {
        this.context.fillStyle = "green";
        this.context.fillRect(point.x - 3, point.y - 3, 6, 6);
      });
    }

    if (this.cursorPoint && this.room.isDrawing) {
      this.context.fillStyle = "green";
      this.context.fillRect(
        this.cursorPoint.x - 3,
        this.cursorPoint.y - 3,
        6,
        6
      );
    }

    if (this.room.isDrawingComplete() && points.length > 2) {
      this.fillRoomBackground(points);
    }
  }

  fillRoomBackground(points) {
    if (points.length < 3) return;
    this.context.fillStyle = "lightgray";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(points[0].x, points[0].y);
    points.forEach((point) => this.context.lineTo(point.x, point.y));
    this.context.closePath();
    this.context.clip();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  onCanvasClick(x, y) {
    if (this.room.isDrawingComplete()) return;

    this.room.addPoint(x, y);
    this.drawRoom();
  }

  onCanvasMouseMove(x, y) {
    if (this.room.isDrawingComplete()) return;
    this.cursorPoint = { x, y };
    this.room.updatePreviewLine(x, y);
    this.drawRoom();
  }
}
