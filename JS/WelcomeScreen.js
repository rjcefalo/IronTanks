export default class WelcomeScreen {
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
    this.ctx.font = '80px Sigmar One';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'gray';
    this.ctx.lineWidth = 30;
    this.ctx.textAlign = 'center';
    this.ctx.strokeText(
      'Irontanks',
      this.canvas.width / 2,
      this.canvas.height / 3,
    );
    this.ctx.fillText(
      'Irontanks',
      this.canvas.width / 2,
      this.canvas.height / 3,
    );
  }
}
