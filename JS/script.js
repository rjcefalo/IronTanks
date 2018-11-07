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

    const intervalo = setInterval(() => {
      background.draw();
      ground.drawGround();
      players[0].draw();
      players[1].draw();

      if (!CollitionGravity(
        players[0].playerPosY,
        players[0].modelo.height * 2,
        ground.startY,
      )
      ) {
        players[0].gravity();
      }

      if (!CollitionGravity(
        players[1].playerPosY,
        players[1].modelo.height * 2,
        ground.startY,
      )
      ) {
        players[1].gravity();
      }

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

      $('#stop').click(() => {
        clearInterval(intervalo);
      });
    }, 1000 / 60);
  }
};
