import Sofa from "../models/Sofa.js";

export default class SofaController {
  constructor(canvas, roomController) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.roomController = roomController;
    this.sofa = null;
  }

  spawnSofa() {
    const room = this.roomController.room;

    if (room.isDrawingComplete() && !this.sofa) {
      this.sofa = new Sofa("./sofa.png", room, () => {
        this.drawScene();
      });
      this.sofa.setInitialPosition();
      this.drawScene();
    }
  }
  resetSofa() {
    this.sofa = null;
    this.drawScene();
  }

  drawScene() {
    this.roomController.drawRoom();

    if (this.sofa) {
      this.sofa.draw(this.context);
    }
  }
  onCanvasClick(x, y) {
    if (!this.sofa) return;
    if (
      x >= this.sofa.x &&
      x <= this.sofa.x + this.sofa.width &&
      y >= this.sofa.y &&
      y <= this.sofa.y + this.sofa.height
    ) {
      this.sofa.isDragging = !this.sofa.isDragging;
    }
  }
  onCanvasMouseMove(x, y) {
    if (this.sofa && this.sofa.isDragging) {
      const previousX = this.x;
      const previousY = this.y;
      this.sofa.x = x - this.sofa.width / 2;
      this.sofa.y = y - this.sofa.height / 2;
      // console.log(this.sofa.isSofaInsideRoom());
      if (!this.sofa.isSofaInsideRoom()) {
        this.x = previousX;
        this.y = previousY;
        return;
      }
      this.sofa.alignToWall();
      this.roomController.fillRoomBackground(this.roomController.room.points);
      this.drawScene();
    }
  }
}
