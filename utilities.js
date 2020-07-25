function animate() {
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  ctx5.clearRect(0, 0, canvas.width, canvas.height);
  handleRipples();
  ctx.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
  handleParticles();
  frogger.draw();
  frogger.update();
  ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
  handleObstacles();
  handleScoreBoard();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("keydown", function (e) {
  keys = [];
  keys[e.keyCode] = true;
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    frogger.jump();
  }
});

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  frogger.moving = false;
  frogger.frameX = 0;
});

function scored() {
  score++;
  gameSpeed += 0.05;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

function handleScoreBoard() {
  ctx5.fillStyle = "black";
  ctx5.strokeStyle = "black";
  ctx5.font = "15px Verdana";
  ctx5.strokeText("Score", 265, 15);
  ctx5.font = "40px Verdana";
  ctx5.fillText(score, 274, 50);
  ctx5.font = "15px Verdana";
  ctx5.strokeText(`Collisions: ${collisionsCount}`, 30, 15);
  ctx5.strokeText(`Game Speed: ${gameSpeed.toFixed(2)}`, 30, 35);
}

function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function resetGame() {
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
  score = 0;
  collisionsCount++;
  gameSpeed = 1;
}
