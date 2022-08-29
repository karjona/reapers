import { GameConfig } from "../data/GameConfig";
import { fightScene, rematchScene } from "../data/Instances";
import { RematchScreen } from "../modules/RematchScreen/RematchScreen";
import { Scene } from "../types/Scene";

export default function PrepareRematchScene() {
  fightScene.hide();
  GameConfig.currentScene = Scene.Rematch;
  rematchScene.add([RematchScreen]);
  rematchScene.show();
}
