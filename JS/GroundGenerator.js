export default class GroundGenerator {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.spaceDestroyed = 50;
    this.startX = 0;
    this.startY = this.canvas.height - (this.canvas.height * 0.27);

    this.endX = this.canvas.width;
  }

  drawGround() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.globalAlpha = 1;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  destroyGround(blowIt) {
    this.ctx.clearRect(blowIt, this.startY, this.spaceDestroyed, 5);
  }
}
