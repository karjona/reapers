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

import { Attack, Jab, Strong } from "./attacks";

window.addEventListener("DOMContentLoaded", async () => {
  const { canvas } = init();
  initKeys();

  const playerWidth = 24;
  const playerHeight = 40;
  const playerWalkSpeed = 1;
  const groundLevel = 120;
  let player1CanMove = true;

  let player1Attack: Attack | null = null;
  let player1Attacking = 0;
  let player1Startup = 0;
  let player1Active = 0;
  let player1Recovery = 0;

  let renderHitboxes = true;

  let player1hitboxcolor = "yellow";

  let player2hitboxcolor = "yellow";

  let player1: Sprite, player2: Sprite;
  let player1hitbox: GameObject,
    player2hitbox: GameObject,
    player1Hurtbox: GameObject,
    player2Hurtbox: GameObject;

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

  player1Hurtbox = GameObject({});

  player1hitbox = GameObject({
    width: playerWidth,
    height: playerHeight,
    x: Math.round(canvas.width / 3) - Math.round(playerWidth / 2),
    y: groundLevel - playerHeight,
    children: [player1],
    render: function (this: GameObject) {
      if (renderHitboxes) {
        this.context.strokeStyle = player1hitboxcolor;
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
        this.context.strokeStyle = player2hitboxcolor;
        this.context.lineWidth = 2;
        this.context.strokeRect(0, 0, this.width, this.height);
      }
    },
  });

  const gameloop = GameLoop({
    update: function () {
      // reset game state
      onKey("r", () => {
        player1hitbox.x =
          Math.round(canvas.width / 3) - Math.round(playerWidth / 2);
        player2hitbox.x =
          Math.round((canvas.width * 2) / 3) - Math.round(playerWidth / 2);
        renderHitboxes = true;
        player1CanMove = true;
      });

      onKey("z", () => {
        if (player1Attacking === 0) {
          const attackLength = Jab.startup + Jab.active + Jab.recovery;
          player1Attack = Jab;
          player1Startup = Jab.startup;
          player1Active = Jab.active;
          player1Recovery = Jab.recovery;
          player1Attacking = attackLength;
          player1hitboxcolor = "blue";
          player1CanMove = false;
        }
      });

      if (player1Attacking > 0) {
        player1Attacking--;

        if (player1Startup > 0) {
          player1Startup--;
        }

        if (
          player1Attack &&
          player1Startup === 0 &&
          player1Active > 0 &&
          player1Active === player1Attack.active
        ) {
          player1Hurtbox = GameObject({
            width: player1Attack.width,
            height: player1Attack.height,
            y: player1Attack.y,
            ttl: player1Attack.active,
            x: player1hitbox.width,
            render: function (this: GameObject) {
              if (renderHitboxes) {
                this.context.strokeStyle = "red";
                this.context.lineWidth = 2;
                this.context.strokeRect(0, 0, this.width, this.height);
              }
            },
          });
          player1hitbox.addChild(player1Hurtbox);
          player1Active--;
        }

        if (
          player1Attack &&
          player1Active > 0 &&
          player1Active < player1Attack.active
        ) {
          player1Active--;
        }

        if (player1Recovery > 0 && player1Active === 0) {
          player1hitboxcolor = "lightgrey";
          player1Recovery--;
        }
      }

      if (player1Attacking === 0 && !player1CanMove) {
        player1CanMove = true;
        player1hitboxcolor = "yellow";
      }

      if (player1Hurtbox.ttl === 0) {
        player1hitbox.removeChild(player1Hurtbox);
        player1Hurtbox = GameObject({});
        player1Attack = null;
      }

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

      if (collides(player1Hurtbox, player2hitbox)) {
        player2hitboxcolor = "red";
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
