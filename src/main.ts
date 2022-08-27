import { GameLoop } from "kontra";

import {
  toggleTrainingPanel,
  isTrainingPanelEnabled,
  TrainingPanel,
} from "./code/modules/TrainingPanel/TrainingPanel";

import { player1, player2 } from "./code/data/Instances";
import { LoadAssets } from "./code/functions/LoadAssets";
import CheckFighterCollisions from "./code/functions/CheckFighterCollisions";

window.addEventListener("DOMContentLoaded", async () => {
  const { player1Image, player2Image } = await LoadAssets();
  player1.addSpriteSheet(player1Image);
  player2.addSpriteSheet(player2Image);

  const gameloop = GameLoop({
    update: function () {
      player1.update();
      player2.update();
      CheckFighterCollisions();
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
