import { GameObject, getContext } from "kontra";
import { canvas, renderText } from "../../data/Instances";

const winText = GameObject({
  x: 60,
  y: 70,
  render: function () {
    renderText("PLAYER 1 WINS", 0, 0, 5, "black");
  },
});

const loreText = GameObject({
  x: 2,
  y: 100,
  render: function () {
    renderText("BLAH BLAH BLAH BLAH BLAH BLAH BLAH", 0, 0, 5, "black");
  },
});

export const RematchScreen = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  children: [winText, loreText],
  render: function () {
    const context = getContext();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  },
});
