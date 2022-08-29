import { GameObject, getContext } from "kontra";
import { canvas, renderText } from "../../data/Instances";
import HealthBar from "../../objects/HealthBar";
import { player1, player2 } from "../../data/Instances";
import RoundCounter from "../../objects/RoundCounter";

const player1HealthBar = new HealthBar(player1);
const player2HealthBar = new HealthBar(player2);

const player1RoundCounter = new RoundCounter(player1);
const player2RoundCounter = new RoundCounter(player2);

let koLabelColor = "white";

const nomiquielLabel = GameObject({
  x: 0,
  y: 0,
  render: function () {
    renderText("NOMIQUIEL", 7, 12, 5, "white");
  },
});

const omiquielLabel = GameObject({
  x: 0,
  y: 0,
  render: function () {
    renderText("OMIQUIEL", 119, 12, 5, "white");
  },
});

const koLabel = GameObject({
  x: 0,
  y: 0,
  render: function () {
    renderText("KO", 71, 15, 10, koLabelColor);
  },
});

export function toggleKOColor() {
  koLabelColor === "white" ? (koLabelColor = "red") : (koLabelColor = "white");
}

export const TopPanel = GameObject({
  x: 0,
  y: 0,
  width: canvas.width,
  height: 32,
  children: [
    player1HealthBar.healthBar,
    player2HealthBar.healthBar,
    player1RoundCounter.roundCounter,
    player2RoundCounter.roundCounter,
    nomiquielLabel,
    omiquielLabel,
    koLabel,
  ],
  render: function () {
    const context = getContext();
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, 32);
  },
});
