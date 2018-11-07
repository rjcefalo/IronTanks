/* eslint-disable import/extensions */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-arrow-callback */
import Bullet from './Bullet.js';
import CollitionGravity from './CollitionGravity.js';

export default class Player {
  constructor(id, playerType, player) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.ctxShoot = this.canvas.getContext('2d');
    this.modelo = new Image();
    this.modelo.src = `../images/Vector/${player}.svg`;
    this.bullets = [];
    this.bulletSpeed = 0;
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
    this.showAngle();
    this.showGas();
    this.showForce();
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
        this.bulletSpeed += 0.1;
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
          this.fuel -= 1;
        }
      }
      if (e.keyCode == 39) {
        if (this.fuel > 0) {
          this.playerPosX += 2;
          this.fuel -= 1;
        }
      }
    }.bind(this);

    document.onkeyup = function (e) {
      e.preventDefault();
      if (e.keyCode == 32) {
        this.shoot();
        this.resetBulletSpeed();
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
      this.bullets.pop();
      this.endTurn();
      this.resetFuel();
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
          this.bulletSpeed,
        ),
      );
    }
  }

  startTurn() {
    this.turn = true;
  }

  endTurn() {
    this.turn = false;
  }

  showAngle() {
    this.ctx.font = '18px Arial';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 4;
    if (this.playerType == 1) {
      this.ctx.strokeText(`Angle: ${this.angle}º`, this.playerPosX, this.playerPosY + 50);
      this.ctx.fillText(`Angle: ${this.angle}º`, this.playerPosX, this.playerPosY + 50);
    } else {
      this.ctx.strokeText(`Angle: ${this.angle - 180}º`, this.playerPosX, this.playerPosY + 50);
      this.ctx.fillText(`Angle: ${this.angle - 180}º`, this.playerPosX, this.playerPosY + 50);
    }
  }

  showGas() {
    this.ctx.font = '18px Arial';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(`Fuel: ${this.fuel}%`, this.playerPosX, this.playerPosY + 94);
    this.ctx.fillText(`Fuel: ${this.fuel}%`, this.playerPosX, this.playerPosY + 94);
  }

  showForce() {
    this.ctx.font = '18px Arial';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(`Force: ${this.bulletSpeed.toFixed(0)} m/sec`, this.playerPosX, this.playerPosY + 72);
    this.ctx.fillText(`Force: ${this.bulletSpeed.toFixed(0)} m/sec`, this.playerPosX, this.playerPosY + 72);
  }

  resetFuel() {
    this.fuel = 100;
  }

  resetBulletSpeed() {
    this.bulletSpeed = 0;
  }
}
