import {
  init,
  Sprite,
  GameLoop,
  initKeys,
  keyPressed,
  onKey,
  collides,
  loadImage,
  GameObject,
  Text,
} from "kontra";

window.addEventListener("DOMContentLoaded", async () => {
  const { canvas } = init();
  initKeys();

  const playerWidth = 24;
  const playerHeight = 40;
  const playerWalkSpeed = 1;
  const groundLevel = 120;
  const player1CanMove = true;
  const player2CanMove = true;

  let renderHitboxes = false;

  let player1: Sprite, player2: Sprite;
  let player1hitbox: GameObject, player2hitbox: GameObject;

  let debugText = Text({
    text: `Hitboxes: ${renderHitboxes}`,
    x: 10,
    y: 10,
    color: "white",
    font: "10px monospace",
    update: function () {
      onKey("h", () => {
        renderHitboxes = !renderHitboxes;
        this.text = `Hitboxes: ${renderHitboxes}`;
      });
    },
  });

  const player1img = await loadImage("./player1.webp");
  player1 = Sprite({
    x: -18,
    image: player1img,
  });

  player1hitbox = GameObject({
    width: playerWidth,
    height: playerHeight,
    x: Math.round(canvas.width / 3) - Math.round(playerWidth / 2),
    y: groundLevel - playerHeight,
    children: [player1],
    render: function (this: GameObject) {
      if (renderHitboxes) {
        this.context.strokeStyle = "yellow";
        this.context.lineWidth = 2;
        this.context.strokeRect(0, 0, this.width, this.height);
      }
    },
  });

  const player2img = await loadImage("./player2.webp");
  player2 = Sprite({
    image: player2img,
  });

  player2hitbox = GameObject({
    width: playerWidth,
    height: playerHeight,
    x: Math.round((canvas.width * 2) / 3) - Math.round(playerWidth / 2),
    y: groundLevel - playerHeight,
    children: [player2],
    render: function (this: GameObject) {
      if (renderHitboxes) {
        this.context.strokeStyle = "yellow";
        this.context.lineWidth = 2;
        this.context.strokeRect(0, 0, this.width, this.height);
      }
    },
  });

  const gameloop = GameLoop({
    update: function () {
      const player1IsMovingRight = ["arrowright", "d"].some(keyPressed);
      const player1IsMovingLeft = ["arrowleft", "a"].some(keyPressed);
      player1hitbox.dx =
        player1IsMovingLeft && player1CanMove
          ? -playerWalkSpeed
          : player1IsMovingRight && player1CanMove
          ? playerWalkSpeed
          : 0;

      if (collides(player1hitbox, player2hitbox)) {
        player2hitbox.dx = player1IsMovingRight ? playerWalkSpeed : 0;
        if (player1IsMovingRight && player1CanMove) {
          if (player2hitbox.x + player2hitbox.width >= canvas.width) {
            player1hitbox.dx = 0;
          }
        }
      }

      debugText.update();
      player1hitbox.update();
      player2hitbox.update();

      if (player1hitbox.x + player1hitbox.width > canvas.width) {
        player1hitbox.x = canvas.width - playerWidth;
      } else if (player1hitbox.x < 0) {
        player1hitbox.x = 0;
      }

      if (player2hitbox.x + player2hitbox.width > canvas.width) {
        player2hitbox.x = canvas.width - playerWidth;
      } else if (player2hitbox.x < 0) {
        player2hitbox.x = 0;
      }
    },
    render: function () {
      player1hitbox.render();
      player2hitbox.render();
      debugText.render();
    },
  });

  gameloop.start();
});
