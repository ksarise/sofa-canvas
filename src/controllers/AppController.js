import RoomController from "./RoomController.js";
import SofaController from "./SofaController.js";

export default class AppController {
  constructor(canvas) {
    this.canvas = canvas;
    this.RoomController = new RoomController(canvas);
    this.SofaController = new SofaController(canvas, this.RoomController);
    this.initListeners();
  }

  initListeners() {
    this.canvas.addEventListener("click", this.onClick.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  startDrawing() {
    this.RoomController.startDrawing();
    this.SofaController.resetSofa();
  }

  onClick(event) {
    const { offsetX, offsetY } = event;
    if (
      this.RoomController.room.isDrawingComplete() &&
      this.SofaController.sofa
    ) {
      this.SofaController.onCanvasClick(offsetX, offsetY);
    } else if (!this.RoomController.room.isDrawingComplete()) {
      this.RoomController.onCanvasClick(offsetX, offsetY);
      if (this.RoomController.room.isDrawingComplete()) {
        this.SofaController.spawnSofa();
      }
    }
  }

  onMouseMove(event) {
    const { offsetX, offsetY } = event;
    this.RoomController.onCanvasMouseMove(offsetX, offsetY);
    if (this.SofaController.sofa) {
      this.SofaController.onCanvasMouseMove(offsetX, offsetY);
    }
  }
}
