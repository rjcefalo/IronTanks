export default function Winner(id, winner) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  ctx.font = '80px Sigmar One';
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'yellow';
  ctx.lineWidth = 60;
  ctx.textAlign = 'center';
  ctx.strokeText(
    `PLAYERS ${winner} WINS`,
    canvas.width / 2,
    canvas.height / 2,
  );
  ctx.fillText(
    `PLAYERS ${winner} WINS`,
    canvas.width / 2,
    canvas.height / 2,
  );
}
