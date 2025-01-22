import Sofa from "../models/Sofa.js";

export default class SofaController {
  constructor(canvas, roomController) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.roomController = roomController;
    this.sofa = null;
    this.isHovering = false;
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
    this.canvas.style.cursor = "default";
  }

  drawScene() {
    this.roomController.drawRoom();

    if (this.sofa) {
      this.sofa.draw(this.context);
    }
  }

  onCanvasClick(x, y) {
    if (!this.sofa) return;

    if (this.isHoveringSofa(x, y)) {
      this.sofa.isDragging = !this.sofa.isDragging;
      this.canvas.style.cursor = this.sofa.isDragging ? "grabbing" : "pointer";
    }
  }

  onCanvasMouseMove(x, y) {
    const isHoveringNow = this.isHoveringSofa(x, y);
    if (this.isHovering !== isHoveringNow && !this.sofa.isDragging) {
      this.isHovering = isHoveringNow;
      this.canvas.style.cursor = isHoveringNow ? "pointer" : "default";
    }
    if (this.sofa && this.sofa.isDragging) {
      this.sofa.x = x - this.sofa.width / 2;
      this.sofa.y = y - this.sofa.height / 2;

      if (!this.sofa.isSofaInsideRoom()) return;

      this.sofa.alignToWall();
      const closestWall = this.sofa.getClosestWall();

      if (closestWall) {
        this.sofa.snapToWall(closestWall, x, y);
      }

      this.roomController.fillRoomBackground(this.roomController.room.points);
      this.drawScene();
      return;
    }
  }

  isHoveringSofa(x, y) {
    if (!this.sofa) return false;

    return (
      x >= this.sofa.x &&
      x <= this.sofa.x + this.sofa.width &&
      y >= this.sofa.y &&
      y <= this.sofa.y + this.sofa.height
    );
  }
}
