import { GameObject, getContext } from "kontra";
import { fighterHealth } from "../data/Constants";
import Fighter, { Position } from "./Fighter";

export default class HealthBar {
  owner: Fighter;

  healthBar: GameObject;
  currentHealthBar: GameObject;

  constructor(owner: Fighter) {
    this.owner = owner;

    function calcHealthWidth(currentHealth: number) {
      const percentage = (fighterHealth - currentHealth) / fighterHealth;
      return percentage * 64;
    }

    this.currentHealthBar = GameObject({
      x: this.owner.position === Position.Left ? 0 : 64,
      y: 0,
      width: 0,
      height: 4,
      render: function (this: GameObject) {
        const context = getContext();
        context.fillStyle = "red";
        context.fillRect(0, 0, this.width, this.height);
      },
      update: () => {
        this.owner.position === Position.Left
          ? (this.currentHealthBar.width = calcHealthWidth(this.owner.health))
          : (this.currentHealthBar.width = -calcHealthWidth(this.owner.health));
      },
    });

    this.healthBar = GameObject({
      x: this.owner.position === Position.Left ? 8 : 90,
      y: 18,
      width: 64,
      height: 4,
      children: [this.currentHealthBar],
      render: function (this: GameObject) {
        const context = getContext();
        context.fillStyle = "yellow";
        context.fillRect(0, 0, this.width, this.height);
      },
    });
  }
}
