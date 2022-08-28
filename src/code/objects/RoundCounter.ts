import { GameObject, Text } from "kontra";
import Fighter, { Position } from "./Fighter";

export default class RoundCounter {
  owner: Fighter;
  roundCounter: GameObject;

  private drawRoundCircles() {
    return this.owner.roundsWon === 0
      ? "⚪️ ⚪️"
      : this.owner.roundsWon === 1
      ? "🟢 ⚪️"
      : "🟢 🟢";
  }

  updateRoundCounter() {
    this.roundCounter.text = this.drawRoundCircles();
  }

  constructor(owner: Fighter) {
    this.owner = owner;
    this.roundCounter = Text({
      x: owner.position === Position.Left ? 8 : 142,
      y: 24,
      text: this.drawRoundCircles(),
      font: "4px monospace",
      update: () => {
        this.updateRoundCounter();
      },
    });
  }
}
