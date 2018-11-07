export default class GroundGenerator {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.spaceDestroyed = 50;
    this.startX = 0;
    this.startY = Math.floor(Math.random() * ((this.canvas.height - (this.canvas.height / 3)) - (this.canvas.height - 50)) + (this.canvas.height - 50));
    this.endX = this.canvas.width;
    /* --------------Esto es para despues-------------- */

    // this.endY = Math.random() * ((this.canvas.height - 50) - (this.canvas.height + 50)) + (this.canvas.height + 50);
  }

  drawGround() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(this.endX, this.startY);
    this.ctx.lineWidth = 20;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  destroyGround(blowIt) {
    this.ctx.clearRect(blowIt, this.startY, this.spaceDestroyed, 5);
  }
}
