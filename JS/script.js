/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import Background from './Background.js';
import GroundGenerator from './GroundGenerator.js';
import Player from './Player.js';
import Collition from './Collition.js';
import CollitionGravity from './CollitionGravity.js';

window.onload = function () {
  $('#game-board').html(
    `<canvas id="ironcanvas" height="${window.innerHeight - 50}" width="${window.innerWidth}"></canvas>`,
  );
  $('#start').click(() => {
    StartGame();
  });

  function StartGame() {
    const background = new Background('ironcanvas');
    const ground = new GroundGenerator('ironcanvas');
    const players = [
      new Player('ironcanvas', 1, 'greenTank1'),
      new Player('ironcanvas', 2, 'blueTank1'),
    ];

    players[0].startTurn();

    players[0].setOpponent(players[1]);
    players[1].setOpponent(players[0]);

    const intervalo = setInterval(() => {
      background.draw();
      ground.drawGround();
      players.forEach((player) => {
        player.draw();
      });
      // players[0].draw();
      // players[1].draw();
      players.forEach((player) => {
        if (!CollitionGravity(
          player.playerPosY,
          player.modelo.height * 2,
          ground.startY,
        )
        ) {
          player.gravity();
        }
      });

      players.forEach((player) => {
        if (player.bullets.length > 0) {
          if (player.opponent != null) {
            if (Collition(player.bullets[0].bulletPosX, player.bullets[0].bulletPosY, player.bullets[0].modelo.width, player.bullets[0].modelo.height,
              player.opponent.playerPosX, player.opponent.playerPosY, player.opponent.modelo.width, player.opponent.modelo.height)) {
              if (player.playerType === 1) { player.opponent = null; players.pop(); alert('player 1 won'); }
              if (player.playerType === 2) { player.opponent = null; players.shift(); alert('player 2 won'); }
            }
          }
        }
      });
      // if (!CollitionGravity(
      //   players[0].playerPosY,
      //   players[0].modelo.height * 2,
      //   ground.startY,
      // )
      // ) {
      //   players[0].gravity();
      // }

      // if (!CollitionGravity(
      //   players[1].playerPosY,
      //   players[1].modelo.height * 2,
      //   ground.startY,
      // )
      // ) {
      //   players[1].gravity();
      // }
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
        clearInterval(intervalo);
      });
    }, 1000 / 60);
  }
};
