import Background from './Background.js';

window.onload = function () {
  $('#game-board').html('<canvas id="ironcanvas" height="500" width="800"></canvas>');
  const background = new Background('ironcanvas');
  let counter = 0;
  const intervalo = setInterval(() => {
    background.draw();
    counter++;
    if (counter == 50) clearInterval(intervalo);
  }, 1000 / 60);
};
