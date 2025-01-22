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

  isSofaInsideRoom() {
    const corners = this.getSofaCorners();
    // console.log(corners);
    return corners.every((corner) => this.room.isPointInside(corner));
  }

  getSofaCorners() {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    const corners = [
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight },
    ];

    return corners.map((corner) => {
      const xRotated =
        corner.x * Math.cos(this.rotation) - corner.y * Math.sin(this.rotation);
      const yRotated =
        corner.x * Math.sin(this.rotation) + corner.y * Math.cos(this.rotation);
      return {
        x: this.x + halfWidth + xRotated,
        y: this.y + halfHeight + yRotated,
      };
    });
  }
  alignToWall() {
    const closestWall = this.getClosestWall();
    if (closestWall) {
      this.rotation = this.getWallAngle(closestWall) + 180;
    }
  }

  getClosestWall() {
    const walls = this.room.points.map((point, i) => {
      const nextPoint = this.room.points[(i + 1) % this.room.points.length];
      return { start: point, end: nextPoint };
    });

    let closestWall = null;
    let minDistance = Infinity;

    const sofaCenter = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };

    for (const wall of walls) {
      const distance = this.getDistanceToWall(wall, sofaCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestWall = wall;
      }
    }
    return closestWall;
  }

  getWallAngle(wall) {
    const deltaX = wall.end.x - wall.start.x;
    const deltaY = wall.end.y - wall.start.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }

  getDistanceToWall(wall, point) {
    const { start, end } = wall;

    const vectorToPointX = point.x - start.x;
    const vectorToPointY = point.y - start.y;
    const wallVectorX = end.x - start.x;
    const wallVectorY = end.y - start.y;

    const dotProduct =
      vectorToPointX * wallVectorX + vectorToPointY * wallVectorY;
    const wallLengthSquared =
      wallVectorX * wallVectorX + wallVectorY * wallVectorY;

    let projectionFactor;
    if (wallLengthSquared) {
      projectionFactor = dotProduct / wallLengthSquared;
    } else {
      projectionFactor = -1;
    }

    let closestPointOnWall;
    if (projectionFactor < 0) {
      closestPointOnWall = start;
    } else if (projectionFactor > 1) {
      closestPointOnWall = end;
    } else {
      closestPointOnWall = {
        x: start.x + projectionFactor * wallVectorX,
        y: start.y + projectionFactor * wallVectorY,
      };
    }
    const distanceX = point.x - closestPointOnWall.x;
    const distanceY = point.y - closestPointOnWall.y;

    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  }
}
