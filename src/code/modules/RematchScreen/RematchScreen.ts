import { GameObject, getContext, onKey, Text } from "kontra";
import { GameConfig } from "../../data/GameConfig";
import { canvas, renderText } from "../../data/Instances";
import ResetFight from "../../functions/ResetFight";

const flashCursorMaxTimer = 1;
let flashCursorTimer = 0;
let currentCursorFlash = 0;
let cursorCanMove = true;

const rematchText = GameObject({
  x: 24,
  y: 120,
  render: function () {
    renderText(`REMATCH`, 0, 0, 5, "black");
  },
});

const exitText = GameObject({
  x: 84,
  y: 120,
  render: function () {
    renderText(`EXIT TO MENU`, 0, 0, 5, "black");
  },
});

const cursor = Text({
  x: 12,
  y: 118,
  text: "🔥",
  color: "black",
  font: "8px monospace",
});

const winText = GameObject({
  x: 20,
  y: 40,
  render: function () {
    renderText(`${GameConfig.whoWon} WINS!`, 1, 1, 10, "grey");
    renderText(`${GameConfig.whoWon} WINS!`, 0, 0, 10, "black");
  },
});

const loreText = GameObject({
  x: 3,
  y: 60,
  render: function () {
    renderText("BLAH BLAH BLAH BLAH BLAH BLAH BLAH", 0, 0, 5, "black");
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
    ResetFight(true);
    flashCursorTimer = 0;
    currentCursorFlash = 0;
    cursorCanMove = true;
    cursor.text = "🔥";
  }
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
  },
});
