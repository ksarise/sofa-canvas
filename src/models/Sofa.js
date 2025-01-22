export default class Sofa {
  constructor(imageSrc, room, onLoadCallback) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = onLoadCallback;

    this.room = room;
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 30;
    this.rotation = 0;
    this.isDragging = false;
  }

  setInitialPosition() {
    const center = this.room.getCenter();
    this.x = center.x - this.width / 2;
    this.y = center.y - this.height / 2;
  }

  draw(context) {
    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate((this.rotation * Math.PI) / 180);
    context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    context.restore();
  }
}
