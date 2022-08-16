import { init, Sprite, GameLoop, initKeys, keyPressed, collides } from "kontra";

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
    const player1IsMovingRight = ["arrowright", "d"].some(keyPressed);
    const player1IsMovingLeft = ["arrowleft", "a"].some(keyPressed);
    player1.dx = player1IsMovingLeft
      ? -playerWalkSpeed
      : player1IsMovingRight
      ? playerWalkSpeed
      : 0;

    if (collides(player1, player2)) {
      player2.dx = player1IsMovingRight ? playerWalkSpeed : 0;
      if (player1IsMovingRight) {
        if (player2.x + player2.width >= canvas.width) {
          player1.dx = 0;
        }
      }
    }

    player1.update();
    player2.update();

    if (player1.x + player1.width > canvas.width) {
      player1.x = canvas.width - playerWidth;
    } else if (player1.x < 0) {
      player1.x = 0;
    }

    if (player2.x + player2.width > canvas.width) {
      player2.x = canvas.width - playerWidth;
    } else if (player2.x < 0) {
      player2.x = 0;
    }
  },
  render: function () {
    player1.render();
    player2.render();
  },
});

gameloop.start();
