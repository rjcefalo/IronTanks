class Background {
  constructor() {
    this.canvas = document.getElementById('ironcanvas');
    this.ctx = this.canvas.getContext('2d');
    this.bgX = 0;
    this.bgY = 0;
  }

  draw() {
    this.modelo = new Image();
    this.modelo.src = '';
    this.ctx.drawImage(
      this.modelo,
      this.bgX,
      this.bgY,
      this.canvas.width,
      this.canvas.height,
    );
    this.ctx.drawImage(
      this.modelo,
      this.bgX + this.canvas.width,
      this.bgY,
      this.canvas.width,
      this.canvas.height,
    );
  }