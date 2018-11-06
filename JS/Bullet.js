export default class Bullet {
  constructor(id, playerType, bullet, bulletPosXIni, bulletPosYIni) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.modelo = new Image();
    this.modelo.src = `../images/Vector/${bullet}.svg`;
    this.bulletPosXIni = bulletPosXIni;
    this.bulletPosYIni = bulletPosYIni;
    this.vX = 8;
    this.vY = -10;
    this.gravity = 0.25;
  }

  draw() {
    this.ctx.drawImage(
      this.modelo,
      this.bulletPosXIni,
      this.bulletPosYIni,
      this.modelo.width * 2,
      this.modelo.height * 2,
    );
  }

  move() {
    this.bulletPosXIni += this.vX;
    this.vY += this.gravity;
    this.bulletPosYIni += this.vY;
  }
}
