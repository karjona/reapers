import { GameObject, getContext } from "kontra";
import { canvas } from "../../data/Instances";
import HealthBar from "../../objects/HealthBar";
import { player1, player2 } from "../../data/Instances";

const player1HealthBar = new HealthBar(player1);
const player2HealthBar = new HealthBar(player2);

export const TopPanel = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: 32,
  children: [player1HealthBar.healthBar, player2HealthBar.healthBar],
  render: function () {
    const context = getContext();
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, 32);
  },
});
