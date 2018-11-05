

export default class Player {
  constructor(id, playerType, player) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.modelo = new Image();
    this.modelo.src = `../images/Vector/${player}.svg`;
    if (playerType == 1) {
      this.playerPosX = Math.random() * ((this.canvas.width - 45) / 2);
    } else {
      this.playerPosX = Math.random() * ((this.canvas.width - this.modelo.width) - (this.canvas.width / 2)) + (this.canvas.width / 2);
      // this.ctx.translate(width, 0);
      // this.ctx.scale(-1, 1);
    }
    this.playerPosY = Math.floor(this.canvas.height / 2);
  }

  draw() {
    this.ctx.drawImage(
      this.modelo,
      this.playerPosX,
      this.playerPosY,
      this.modelo.width * 2,
      this.modelo.height * 2,
    );
  }

  gravity() {
    this.playerPosY++;
  }
}
