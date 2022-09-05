import {
  GameObject,
  getContext,
  onKey,
  Text,
  Sprite,
  SpriteSheet,
} from "kontra";
import { fighterSpritesheet } from "../../data/Constants";
import { GameConfig } from "../../data/GameConfig";
import { canvas, renderText } from "../../data/Instances";
import { LoadAssets } from "../../functions/LoadAssets";
import ResetFight from "../../functions/ResetFight";

const flashCursorMaxTimer = 1;
let flashCursorTimer = 0;
let currentCursorFlash = 0;
let cursorCanMove = true;

let fightersAnimationFrame = 0;
const winningFighter = Sprite({
  width: 60,
  height: 37,
});
const losingFighter = Sprite({
  width: 60,
  height: 37,
});

let loreTextContentPhrase1 = "";
let loreTextContentPhrase2 = "";

const rematchText = GameObject({
  x: 24,
  y: 130,
  render: function () {
    renderText(`REMATCH`, 0, 0, 5, "black");
  },
});

const exitText = GameObject({
  x: 84,
  y: 130,
  render: function () {
    renderText(`EXIT TO MENU`, 0, 0, 5, "black");
  },
});

const cursor = Text({
  x: 12,
  y: 128,
  text: "🔥",
  color: "black",
  font: "8px monospace",
});

const winText = GameObject({
  x: 20,
  y: 20,
  render: function () {
    renderText(`${GameConfig.whoWon} WINS!`, 1, 1, 10, "grey");
    renderText(`${GameConfig.whoWon} WINS!`, 0, 0, 10, "black");
  },
});

const loreText = GameObject({
  x: 3,
  y: 40,
  render: function () {
    renderText(loreTextContentPhrase1, 0, 0, 5, "black");
    renderText(loreTextContentPhrase2, 0, 8, 5, "black");
  },
});

function moveCursor() {
  cursor.x === 12 ? (cursor.x = 72) : (cursor.x = 12);
}

function handleCursor(dt: number) {
  if (cursor.x === 12 && flashCursorTimer === 0) {
    cursorCanMove = false;
    flashCursorTimer += dt;
  }
}

function flashCursor(dt: number) {
  if (flashCursorTimer > 0 && flashCursorTimer < flashCursorMaxTimer) {
    if (currentCursorFlash === 0) {
      currentCursorFlash++;
      cursor.text === "🔥" ? (cursor.text = "") : (cursor.text = "🔥");
    }

    if (currentCursorFlash > 0 && currentCursorFlash < 8) {
      currentCursorFlash++;
    }

    if (currentCursorFlash === 8) {
      currentCursorFlash = 0;
    }

    flashCursorTimer += dt;
  }

  if (flashCursorTimer >= flashCursorMaxTimer) {
    flashCursorTimer = 0;
    currentCursorFlash = 0;
    cursorCanMove = true;
    cursor.text = "🔥";

    ResetFight(true);
    fightersAnimationFrame = 0;
    loreTextContentPhrase1 = "";
    loreTextContentPhrase2 = "";
    RematchScreen.removeChild(winningFighter, losingFighter);
  }
}

function prepareSpriteSheet(img: HTMLImageElement) {
  const spriteSheet = SpriteSheet({
    image: img,
    frameWidth: 60,
    frameHeight: 37,
    animations: fighterSpritesheet,
  });

  return spriteSheet;
}

async function prepareAnimateFightersRematchScreen(whoWon: string | null) {
  // set lore text
  if (whoWon === "PLAYER 1") {
    loreTextContentPhrase1 = "NOMIQUIEL CARRIES ON GIVING THEIR";
    loreTextContentPhrase2 = "BREATH TO THE LIVING WORLDS";
  } else {
    loreTextContentPhrase1 = "OMIQUIEL BEGINS THEIR DEADLY FEAST";
    loreTextContentPhrase2 = "OF THE LIVING REALMS";
  }

  // prepare fighters for animation
  winningFighter.x = whoWon === "PLAYER 1" ? -60 : canvas.width;
  winningFighter.y = 70;
  await LoadAssets().then((assets) => {
    const spritesheet = prepareSpriteSheet(
      whoWon === "PLAYER 1" ? assets.player1Image : assets.player2Image
    );
    winningFighter.animations = spritesheet.animations;
  });

  losingFighter.x = whoWon === "PLAYER 1" ? 0 : canvas.width;
  losingFighter.y = 70;
  await LoadAssets().then((assets) => {
    const spritesheet = prepareSpriteSheet(
      whoWon === "PLAYER 1" ? assets.player2Image : assets.player1Image
    );
    losingFighter.animations = spritesheet.animations;
  });

  losingFighter.playAnimation("ko");
  losingFighter.dx = whoWon === "PLAYER 1" ? 200 : -200;
  RematchScreen.addChild(winningFighter, losingFighter);

  cursor.x = 12;
  fightersAnimationFrame++;
}

function animateFightersRematchScreen(whoWon: string | null) {
  if (whoWon === "PLAYER 1") {
    if (losingFighter.x >= canvas.width - losingFighter.width) {
      losingFighter.dx = 0;
      winningFighter.dx = 40;
    }

    if (winningFighter.x >= 10) {
      winningFighter.dx = 0;
    }
  } else {
    if (losingFighter.x <= 0) {
      losingFighter.dx = 0;
      winningFighter.dx = -40;
    }

    if (winningFighter.x <= canvas.width - winningFighter.width - 10) {
      winningFighter.dx = 0;
    }
  }

  fightersAnimationFrame++;
}

export const RematchScreen = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  children: [winText, loreText, rematchText, exitText, cursor],
  render: async function () {
    const context = getContext();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (fightersAnimationFrame <= 1) {
      await prepareAnimateFightersRematchScreen(GameConfig.whoWon);
    }
  },
  update: (dt) => {
    onKey("arrowright", () => {
      if (cursorCanMove) {
        moveCursor();
      }
    });

    onKey("arrowleft", () => {
      if (cursorCanMove) {
        moveCursor();
      }
    });

    onKey("k", () => {
      if (cursorCanMove) {
        if (dt !== undefined) {
          handleCursor(dt);
        }
      }
    });

    if (flashCursorTimer > 0) {
      if (dt !== undefined) {
        flashCursor(dt);
      }
    }

    animateFightersRematchScreen(GameConfig.whoWon);
  },
});
