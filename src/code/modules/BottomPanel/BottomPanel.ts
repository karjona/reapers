import { GameObject, getContext } from "kontra";
import { canvas } from "../../data/Instances";

export const BottomPanel = GameObject({
  x: 0,
  y: 132,
  width: canvas.width,
  height: 20,
  render: function () {
    const context = getContext();
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, 20);
  },
});
