import { GameLoop } from "kontra";
import { GameConfig } from "./code/data/GameConfig";
import PrepareFightScene from "./code/functions/PrepareFightScene";

import {
  player1,
  player2,
  fightScene,
  rematchScene,
} from "./code/data/Instances";
import { LoadAssets } from "./code/functions/LoadAssets";
import { Scene } from "./code/types/Scene";

window.addEventListener("DOMContentLoaded", async () => {
  const { player1Image, player2Image } = await LoadAssets();
  player1.addSpriteSheet(player1Image);
  player2.addSpriteSheet(player2Image);
  PrepareFightScene();

  const gameloop = GameLoop({
    update: function (dt) {
      if (GameConfig.currentScene === Scene.Fight) {
        fightScene.update(dt);
      } else {
        rematchScene.update(dt);
      }
    },
    render: function () {
      if (GameConfig.currentScene === Scene.Fight) {
        fightScene.render();
      } else {
        rematchScene.render();
      }
    },
  });

  gameloop.start();
});
