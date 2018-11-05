import Background from './Background.js';
import GroundGenerator from './GroundGenerator.js';

window.onload = function () {
  $('#game-board').html('<canvas id="ironcanvas" height="500" width="800"></canvas>');
  const background = new Background('ironcanvas');
  const ground = new GroundGenerator('ironcanvas');
  let counter = 0;

  const intervalo = setInterval(() => {
    background.draw();
    ground.drawGround();
    counter++;
    if (counter == 50) clearInterval(intervalo);
  }, 1000 / 60);
};
