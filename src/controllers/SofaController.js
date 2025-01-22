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
}
