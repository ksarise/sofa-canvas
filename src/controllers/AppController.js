import RoomController from "./RoomController.js";

export default class AppController {
  constructor(canvas) {
    this.canvas = canvas;
    this.RoomController = new RoomController(canvas);
    this.initListeners();
  }

  initListeners() {
    this.canvas.addEventListener("click", this.onClick.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  startDrawing() {
    this.RoomController.startDrawing();
  }

  onClick(event) {
    const { offsetX, offsetY } = event;

    if (this.RoomController.isDrawing) {
      this.RoomController.room.addPoint(offsetX, offsetY);
      this.RoomController.drawRoom();
    }
  }

  onMouseMove(event) {
    const { offsetX, offsetY } = event;

    if (this.RoomController.isDrawing) {
      this.RoomController.room.updatePreviewLine(offsetX, offsetY);
      this.RoomController.drawRoom();
    }
  }
}
