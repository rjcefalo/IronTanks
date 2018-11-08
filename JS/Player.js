/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
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
    this.width = this.modelo.width * 2;
    this.height = this.modelo.height * 2;
    this.bullets = [];
    this.bulletSpeed = 0;
    this.fuel = 100;
    this.turn = false;
    this.playerType = playerType;
    this.points = 0;
    this.opponent = null;

    if (this.playerType == 1) {
      this.playerPosX =
        Math.random() * 400;
      this.angle = 0;
    } else {
      this.playerPosX = Math.random() * ((this.canvas.width - (this.modelo.width * 2)) - (this.canvas.width - 400)) +
        (this.canvas.width - 400);
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
    this.showPoints();
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
      }

      if (e.keyCode == 40) {
        this.angle--;
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
        this.fuel = 0;
        this.resetBulletSpeed();
      }
    }.bind(this);

    if (
      this.bullets.length == 1 &&
      CollitionGravity(
        this.bullets[0].bulletPosY,
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
    let posXStats = 0;
    const posYStats = this.canvas.height - 150;
    if (this.playerType == 2) {
      posXStats = this.canvas.width - 150;
    }
    this.ctx.textAlign = 'left';
    this.ctx.font = '18px Sigmar One';
    this.ctx.strokeStyle = 'black';
    this.showTurn();
    this.ctx.lineWidth = 4;
    if (this.playerType == 1) {
      this.ctx.strokeText(
        `Angle: ${this.angle}º`,
        posXStats,
        posYStats + 50 + 30,
      );
      this.ctx.fillText(
        `Angle: ${this.angle}º`,
        posXStats,
        posYStats + 50 + 30,
      );
    } else {
      this.ctx.strokeText(
        `Angle: ${this.angle - 180}º`,
        posXStats,
        posYStats + 50 + 30,
      );
      this.ctx.fillText(
        `Angle: ${this.angle - 180}º`,
        posXStats,
        posYStats + 50 + 30,
      );
    }
  }

  showGas() {
    let posXStats = 0;
    const posYStats = this.canvas.height - 150;
    if (this.playerType == 2) {
      posXStats = this.canvas.width - 150;
    }
    this.ctx.textAlign = 'left';
    this.ctx.font = '18px Sigmar One';
    this.ctx.strokeStyle = 'black';
    this.showTurn();
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(
      `Fuel: ${this.fuel}%`,
      posXStats,
      posYStats + 94 + 30,
    );
    this.ctx.fillText(
      `Fuel: ${this.fuel}%`,
      posXStats,
      posYStats + 94 + 30,
    );
  }

  showForce() {
    let posXStats = 0;
    const posYStats = this.canvas.height - 150;
    if (this.playerType == 2) {
      posXStats = this.canvas.width - 150;
    }
    this.ctx.textAlign = 'left';
    this.ctx.font = '18px Sigmar One';
    this.ctx.strokeStyle = 'black';
    this.showTurn();
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(
      `Velocity: ${this.bulletSpeed.toFixed(0)}`,
      posXStats,
      posYStats + 72 + 30,
    );
    this.ctx.fillText(
      `Velocity: ${this.bulletSpeed.toFixed(0)}`,
      posXStats,
      posYStats + 72 + 30,
    );
  }

  resetFuel() {
    this.fuel = 100;
  }

  resetBulletSpeed() {
    this.bulletSpeed = 0;
  }

  showTurn() {
    if (this.turn == true) {
      return (this.ctx.fillStyle = 'white');
    }
    if (this.turn == false) {
      return (this.ctx.fillStyle = 'gray');
    }
  }

  setOpponent(opponent) {
    this.opponent = opponent;
  }

  addPoints() {
    this.points++;
  }

  showPoints() {
    let posXStats = 100;
    const posYStats = 150;
    if (this.playerType == 2) {
      posXStats = this.canvas.width - 240;
    }
    this.ctx.font = '25px Sigmar One';
    this.ctx.strokeStyle = 'black';
    this.showTurn();
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(
      `Points: ${this.points}`,
      posXStats,
      posYStats,
    );
    this.ctx.fillText(
      `Points: ${this.points}`,
      posXStats,
      posYStats,
    );
  }

  destroyBullet() {
    if (this.bullets.length == 1) {
      this.bullets.pop();
      this.endTurn();
      this.resetFuel();
    }
  }
}
