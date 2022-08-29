import { GameObject, getContext } from "kontra";
import { canvas } from "../../data/Instances";
import { GameConfig } from "../../data/GameConfig";

export const WinScreen = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  render: function () {
    const context = getContext();
    context.fillStyle = `rgba(255, 255, 255, ${GameConfig.winScreenOpacity})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
  },
});
