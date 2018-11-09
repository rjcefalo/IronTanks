/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import Background from './Background.js';
import GroundGenerator from './GroundGenerator.js';
import Player from './Player.js';
import Collition from './Collition.js';
import CollitionGravity from './CollitionGravity.js';
import Winner from './Winner.js';

const GameConfig = {
  totalPointsWin: 20,
};

window.onload = function () {
  $('#game-board').html(
    `<canvas id="ironcanvas" height="${window.innerHeight - 50}" width="${window.innerWidth}"></canvas>`,
  );
  $('#start').click(() => {
    StartGame();
  });

  function StartGame() {
    const music = new Audio('./sounds/mortal-kombat-theme-song-original.ogg');
    music.play();
    const background = new Background('ironcanvas');
    const ground = new GroundGenerator('ironcanvas');
    const players = [
      new Player('ironcanvas', 1, 'greenTank1'),
      new Player('ironcanvas', 2, 'blueTank1'),
    ];
    players[0].startTurn();


    const intervalo = setInterval(() => {
      background.draw();
      ground.drawGround();
      players[0].setOpponent(players[1]);
      players[1].setOpponent(players[0]);
      players.forEach((player) => {
        player.draw();

        if (!CollitionGravity(
          player.playerPosY,
          player.modelo.height * 3,
          ground.startY,
        )
        ) {
          player.gravity();
        }

        if (player.bullets.length > 0 && player.opponent != null && Collition(player.bullets[0].bulletPosX, player.bullets[0].bulletPosY, player.bullets[0].modelo.width * 3, player.bullets[0].modelo.height * 3,
          player.opponent.playerPosX, player.opponent.playerPosY, player.opponent.modelo.width * 3, player.opponent.modelo.height * 3)) {
          player.addPoints();
        }

        if (player.points >= GameConfig.totalPointsWin) {
          Winner('ironcanvas', player.playerType);
        }
      });

      if (players.length == 2) {
        if (players[0].turn == true) {
          players[0].setListener();

          if (players[0].turn == false) {
            players[1].startTurn();
          }
        } else if (players[1].turn == true) {
          players[1].setListener();

          if (players[1].turn == false) {
            players[0].startTurn();
          }
        }
      }
      $('#stop').click(() => {
        music.pause();
        clearInterval(intervalo);
      });
    }, 1000 / 60);
  }
};
