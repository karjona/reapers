import { GameObject, getContext, onKey, Text, Sprite } from "kontra";
import { fighterHeight, fighterWidth } from "../../data/Constants";
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
  height: fighterHeight,
  width: fighterWidth,
});
const losingFighter = Sprite({
  height: fighterHeight,
  width: fighterWidth,
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
    cursor.x = 12;

    ResetFight(true);
    fightersAnimationFrame = 0;
    loreTextContentPhrase1 = "";
    loreTextContentPhrase2 = "";
  }
}

async function animateFightersRematchScreen(whoWon: string | null) {
  console.log("animate");
  if (fightersAnimationFrame === 0) {
    // set lore text
    if (whoWon === "PLAYER 1") {
      loreTextContentPhrase1 = "NOMIQUIEL CARRIES ON GIVING THEIR";
      loreTextContentPhrase2 = "BREATH TO THE LIVING WORLDS";
    } else {
      loreTextContentPhrase1 = "OMIQUIEL BEGINS THEIR DEADLY FEAST";
      loreTextContentPhrase2 = "OF THE LIVING REALMS";
    }

    console.log("this");
    // prepare fighters for animation
    winningFighter.x = 0;
    winningFighter.y = 70;
    winningFighter.image = await LoadAssets().then((assets) => {
      return whoWon === "PLAYER 1" ? assets.player1Image : assets.player2Image;
    });
    losingFighter.x = 0;
    losingFighter.y = 70;
    losingFighter.image = await LoadAssets().then((assets) => {
      return whoWon === "PLAYER 1" ? assets.player2Image : assets.player1Image;
    });

    RematchScreen.addChild(winningFighter, losingFighter);
  }

  fightersAnimationFrame++;
}

export const RematchScreen = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  children: [winText, loreText, rematchText, exitText, cursor],
  render: function () {
    const context = getContext();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  },
  update: async (dt) => {
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

    await animateFightersRematchScreen(GameConfig.whoWon);
  },
});
