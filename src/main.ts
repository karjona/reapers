import { GameLoop, onKey } from "kontra";
import { GameConfig } from "./code/data/GameConfig";
import PrepareFightScene from "./code/functions/PrepareFightScene";

import {
  player1,
  player2,
  fightScene,
  rematchScene,
  fightBackground,
} from "./code/data/Instances";
import { LoadAssets } from "./code/functions/LoadAssets";
import { Scene } from "./code/types/Scene";
import PlayMusic from "./sounds/PlayMusic";

window.addEventListener("DOMContentLoaded", async () => {
  const { player1Image, player2Image, fightBgImage } = await LoadAssets();
  player1.addSpriteSheet(player1Image);
  player2.addSpriteSheet(player2Image);
  fightBackground.image = fightBgImage;
  PrepareFightScene();
  onKey("m", () => {
    PlayMusic();
  });

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
