import { loadImage, GameLoop } from "kontra";

import {
  toggleTrainingPanel,
  isTrainingPanelEnabled,
  TrainingPanel,
} from "./code/modules/TrainingPanel/TrainingPanel";
import Fighter, { Position } from "./code/types/Fighter";

window.addEventListener("DOMContentLoaded", async () => {
  const player1img = await loadImage("./player1.webp");
  const player1 = new Fighter(Position.Left, player1img);

  const player2img = await loadImage("./player2.webp");
  const player2 = new Fighter(Position.Right, player2img);

  const gameloop = GameLoop({
    update: function () {
      player1.update();
      player2.update();
      toggleTrainingPanel();
      TrainingPanel.update();
    },
    render: function () {
      player1.render();
      player2.render();
      if (isTrainingPanelEnabled()) {
        TrainingPanel.render();
      }
    },
  });

  gameloop.start();
});
