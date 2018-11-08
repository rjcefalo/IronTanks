export default class Background {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.bgX = 0;
    this.bgY = 0;
    this.modelo = new Image();
    this.modelo.src = '../images/bg.jpg';
  }

  draw() {
    this.ctx.drawImage(
      this.modelo,
      this.bgX,
      this.bgY,
      this.canvas.width,
      this.canvas.height,
    );
    this.ctx.font = '50px Sigmar One';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 20;
    this.ctx.textAlign = 'center';
    this.ctx.strokeText(
      'First to get 20 points wins',
      this.canvas.width / 2,
      80,
    );
    this.ctx.fillText(
      'First to get 20 points wins',
      this.canvas.width / 2,
      80,
    );
  }
}
