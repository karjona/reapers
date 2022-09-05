import { GameLoop } from "kontra";
import { GameConfig } from "./code/data/GameConfig";
import PrepareTitleScene from "./code/functions/PrepareTitleScene";

import {
  player1,
  player2,
  fightScene,
  rematchScene,
  fightBackground,
  titleScene,
} from "./code/data/Instances";
import { LoadAssets } from "./code/functions/LoadAssets";
import { Scene } from "./code/types/Scene";

window.addEventListener("DOMContentLoaded", async () => {
  const { player1Image, player2Image, fightBgImage } = await LoadAssets();
  player1.addSpriteSheet(player1Image);
  player2.addSpriteSheet(player2Image);
  fightBackground.image = fightBgImage;
  await PrepareTitleScene();
  titleScene.show();

  const gameloop = GameLoop({
    update: function (dt) {
      if (GameConfig.currentScene === Scene.Fight) {
        fightScene.update(dt);
      } else if (GameConfig.currentScene === Scene.Rematch) {
        rematchScene.update(dt);
      } else {
        titleScene.update(dt);
      }
    },
    render: function () {
      if (GameConfig.currentScene === Scene.Fight) {
        fightScene.render();
      } else if (GameConfig.currentScene === Scene.Rematch) {
        rematchScene.render();
      } else {
        titleScene.render();
      }
    },
  });

  gameloop.start();
});
