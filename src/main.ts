import { init, Sprite, GameLoop, initKeys, keyPressed } from "kontra";

const { canvas } = init();
initKeys();

const playerWidth = 48;
const playerHeight = 48;
const playerWalkSpeed = 1;
const groundLevel = 120;

const player1 = Sprite({
  x: Math.round(canvas.width / 3) - Math.round(playerWidth / 2),
  y: groundLevel - playerHeight,
  color: "red",
  width: playerWidth,
  height: playerHeight,
});

const player2 = Sprite({
  x: Math.round((canvas.width * 2) / 3) - Math.round(playerWidth / 2),
  y: groundLevel - playerHeight,
  color: "pink",
  width: playerWidth,
  height: playerHeight,
});

const gameloop = GameLoop({
  update: function () {
    const isMovingRight = ["arrowright", "d"].some(keyPressed);
    const isMovingLeft = ["arrowleft", "a"].some(keyPressed);
    player1.dx = isMovingLeft
      ? -playerWalkSpeed
      : isMovingRight
      ? playerWalkSpeed
      : 0;

    player1.update();
    player2.update();

    if (player1.x + player1.width > canvas.width) {
      player1.x = canvas.width - playerWidth;
    } else if (player1.x < 0) {
      player1.x = 0;
    }
  },
  render: function () {
    player1.render();
    player2.render();
  },
});

gameloop.start();
