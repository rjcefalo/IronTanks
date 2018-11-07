/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
import CollitionGravity from './CollitionGravity.js';

export default class Bullet {
  constructor(id, player, bullet, bulletPosX, bulletPosY, angle,  V) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.modelo = new Image();
    if (player == 1) { this.modelo.src = '../images/Vector/bulletPlayer1.svg'; } else { this.modelo.src = '../images/Vector/bulletPlayer2.svg'; }
    this.bulletPosX = bulletPosX;
    this.bulletPosY = bulletPosY;
    this.velocidad = V;
    this.vX = V * Math.cos(angle * Math.PI / 180);
    this.vY = -V * Math.abs(Math.sin(angle * Math.PI / 180));
    this.gravity = 0.20;
  }

  draw() {
    this.ctx.drawImage(
      this.modelo,
      this.bulletPosX,
      this.bulletPosY,
      this.modelo.width * 2,
      this.modelo.height * 2,
    );
  }

  move() {
    this.bulletPosX += this.vX;
    this.vY += this.gravity;
    this.bulletPosY += this.vY;
  }
}
