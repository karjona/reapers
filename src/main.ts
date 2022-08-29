import { GameLoop } from "kontra";

import {
  toggleTrainingPanel,
  isTrainingPanelEnabled,
  TrainingPanel,
} from "./code/modules/TrainingPanel/TrainingPanel";

import { player1, player2 } from "./code/data/Instances";
import { LoadAssets } from "./code/functions/LoadAssets";
import CheckFighterCollisions from "./code/functions/CheckFighterCollisions";
import { TopPanel } from "./code/modules/TopPanel/TopPanel";
import { GameConfig } from "./code/data/GameConfig";
import CheckGameState from "./code/functions/CheckGameState";
import { AnnouncerText } from "./code/modules/AnnouncerText/AnnouncerText";

window.addEventListener("DOMContentLoaded", async () => {
  const { player1Image, player2Image } = await LoadAssets();
  player1.addSpriteSheet(player1Image);
  player2.addSpriteSheet(player2Image);

  const gameloop = GameLoop({
    update: function (dt) {
      player1.update();
      player2.update();
      CheckFighterCollisions();
      TopPanel.update();
      toggleTrainingPanel();
      TrainingPanel.update();
      if (GameConfig.fightersCanAct === false) {
        CheckGameState(dt);
      }
      AnnouncerText.update();
    },
    render: function () {
      TopPanel.render();
      player1.render();
      player2.render();
      if (isTrainingPanelEnabled()) {
        TrainingPanel.render();
      }
      AnnouncerText.render();
    },
  });

  gameloop.start();
});
