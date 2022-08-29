import { GameConfig } from "../data/GameConfig";
import { fightScene, player1, rematchScene } from "../data/Instances";
import { RematchScreen } from "../modules/RematchScreen/RematchScreen";
import Fighter from "../objects/Fighter";
import { Scene } from "../types/Scene";

export default function PrepareRematchScene(whoWon: Fighter) {
  fightScene.hide();
  GameConfig.whoWon = whoWon === player1 ? "PLAYER 1" : "PLAYER 2";
  GameConfig.currentScene = Scene.Rematch;
  rematchScene.add([RematchScreen]);
  rematchScene.show();
}
