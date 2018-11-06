/* eslint-disable import/extensions */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-arrow-callback */
import Bullet from './Bullet.js';
import CollitionGravity from './CollitionGravity.js';

export default class Player {
  constructor(id, playerType, player) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.modelo = new Image();
    this.modelo.src = `../images/Vector/${player}.svg`;
    this.bullets = [];
    this.bulletSpeedX = 0;
    this.fuel = 100;
    this.turn = true;
    this.playerType = playerType;
    if (this.playerType == 1) {
      this.playerPosX =        Math.random() * ((this.canvas.width - this.modelo.width * 2) / 2);
      this.angle = 0;
    } else {
      /* ((               max                   ) -         min            ) +        min             ; */
      this.playerPosX =        Math.random()
          * (this.canvas.width - this.modelo.width * 2 - this.canvas.width / 2)
        + this.canvas.width / 2;
      this.angle = 180;
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

    this.bullets.forEach(function (bullet) {
      bullet.draw();
      bullet.move();
    });
  }

  gravity() {
    this.playerPosY++;
  }

  setListener() {
    document.onkeydown = function (e) {
      e.preventDefault();
      if (e.keyCode == 32) {
        this.bulletSpeedX += 0.2;
        console.log(this.bulletSpeedX);
      }
      if (e.keyCode == 38) {
        this.angle++;
        console.log(this.angle);
      }
      if (e.keyCode == 40) {
        this.angle--;
        console.log(this.angle);
      }
      if (e.keyCode == 37) {
        if (this.fuel > 0) {
          this.playerPosX -= 2;
          this.fuel -= 2;
        } else {
          alert('out of fuel');
        }
        console.log(`Fuel left ${this.fuel}`);
      }
      if (e.keyCode == 39) {
        if (this.fuel > 0) {
          this.playerPosX += 2;
          this.fuel -= 2;
        } else {
          alert('out of fuel');
        }
        console.log(`Fuel left ${this.fuel}`);
      }
    }.bind(this);

    document.onkeyup = function (e) {
      e.preventDefault();
      if (e.keyCode == 32) {
        this.shoot();
        this.bulletSpeedX = 0;
      }
    }.bind(this);

    if (
      this.bullets.length == 1
      && CollitionGravity(
        this.bullets[0].bulletPosYIni,
        this.bullets[0].modelo.height,
        this.playerPosY + this.modelo.height * 2,
      )
    ) {
      console.log(
        CollitionGravity(
          this.bullets[0].bulletPosYIni,
          this.bullets[0].modelo.height,
          this.playerPosY + this.modelo.height * 2,
        ),
      );
      this.bullets.pop();
      this.endTurn();
      this.fuel = 100;
    }
  }

  shoot() {
    if (this.bullets.length < 1) {
      this.bullets.push(
        new Bullet(
          'ironcanvas',
          this.playerType,
          'bulletPlayer1',
          this.playerPosX,
          this.playerPosY,
          this.angle,
          this.bulletSpeedX,
        ),
      );
    }
  }

  endTurn() {
    this.turn = false;
  }
}
