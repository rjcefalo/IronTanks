/* eslint-disable import/extensions */
import Background from './Background.js';
import GroundGenerator from './GroundGenerator.js';
import Player from './Player.js';
import Collition from './Collition.js';
import CollitionGravity from './CollitionGravity.js';

window.onload = function () {
  $('#game-board').html(
    '<canvas id="ironcanvas" height="500" width="800"></canvas>',
  );
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
    if (
      !CollitionGravity(
        players[0].playerPosY,
        players[0].modelo.height * 2,
        ground.startY,
      )
    ) {
      players[0].gravity();
    }

    players[1].draw();
    if (
      !CollitionGravity(
        players[1].playerPosY,
        players[1].modelo.height * 2,
        ground.startY,
      )
    ) {
      players[1].gravity();
    }
    $('#stop').click(() => {
      clearInterval(intervalo);
    });
  }, 1000 / 60);
};
