export default class Background {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.bgX = 0;
    this.bgY = 0;
    this.modelo = new Image();
    this.modelo.src = '../images/bg.png';
  }

  draw() {
    this.ctx.drawImage(
      this.modelo,
      this.bgX,
      this.bgY,
      this.canvas.width,
      this.canvas.height,
    );
  }
}
