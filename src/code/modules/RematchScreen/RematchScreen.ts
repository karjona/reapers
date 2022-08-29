import { GameObject, getContext, onKey, Text } from "kontra";
import { GameConfig } from "../../data/GameConfig";
import { canvas, renderText } from "../../data/Instances";

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

function handleCursor() {
  if (cursor.x === 12) {
    console.log("go again");
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
  update: function () {
    onKey("arrowright", () => {
      moveCursor();
    });

    onKey("arrowleft", () => {
      moveCursor();
    });

    onKey("k", () => {
      handleCursor();
    });
  },
});
