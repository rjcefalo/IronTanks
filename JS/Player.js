/* eslint-disable eqeqeq */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line import/extensions
import Bullet from './Bullet.js';

export default class Player {
  constructor(id, playerType, player) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.modelo = new Image();
    this.modelo.src = `../images/Vector/${player}.svg`;
    this.bullets = [];
    if (playerType == 1) {
      this.playerPosX = Math.random() * ((this.canvas.width - this.modelo.width * 2) / 2);
    } else {
      /* ((               max                   ) -         min            ) +        min             ; */
      this.playerPosX = Math.random() * ((this.canvas.width - this.modelo.width * 2) - (this.canvas.width / 2)) + (this.canvas.width / 2);
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
    // this.bullets = this.bullets.filter(function (bullet) {
    //   return bullet.x < this.canvas.width;
    // }.bind(this));

    this.bullets.forEach(function (bullet) {
      bullet.draw();
      bullet.move();
    });
  }

  gravity() {
    this.playerPosY++;
  }

  setListener() {
    document.onkeyup = function (e) {
      e.preventDefault();
      if (e.keyCode == 32) {
        this.shoot();
      }
    }.bind(this);
  }

  shoot() {
    const bullet = new Bullet('ironcanvas', 1, 'bulletPlayer1', this.playerPosX, this.playerPosY);
    this.bullets.push(bullet);
  }
}
