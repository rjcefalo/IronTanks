/* eslint-disable import/extensions */
import Background from './Background.js';
import GroundGenerator from './GroundGenerator.js';
import Player from './Player.js';

window.onload = function () {
  $('#game-board').html('<canvas id="ironcanvas" height="500" width="800"></canvas>');
  const background = new Background('ironcanvas');
  const ground = new GroundGenerator('ironcanvas');
  const players = [new Player('ironcanvas', 1, 'greenTank1'), new Player('ironcanvas', 2, 'blueTank1')];
  let counter = 0;

  const intervalo = setInterval(() => {
    background.draw();
    ground.drawGround();
    players[0].draw();
    players[1].draw();
    counter++;
    if (counter == 50) clearInterval(intervalo);
  }, 1000 / 60);
};
