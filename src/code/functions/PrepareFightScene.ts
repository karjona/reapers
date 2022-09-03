import {
  fightBackground,
  fightScene,
  player1,
  player2,
} from "../data/Instances";
import { TopPanel } from "../modules/TopPanel/TopPanel";
import { BottomPanel } from "../modules/BottomPanel/BottomPanel";
import { AnnouncerText } from "../modules/AnnouncerText/AnnouncerText";
import { WinScreen } from "../modules/WinScreen/WinScreen";
import { GameConfig } from "../data/GameConfig";
import CheckGameState from "./CheckGameState";
import CheckFighterCollisions from "./CheckFighterCollisions";
import { toggleTrainingPanel } from "../modules/TrainingPanel/TrainingPanel";

export default function PrepareFightScene() {
  fightScene.add([
    fightBackground,
    player1,
    player2,
    TopPanel,
    BottomPanel,
    AnnouncerText,
    WinScreen,
  ]);

  fightScene.update = function (dt) {
    toggleTrainingPanel();
    CheckFighterCollisions();
    if (GameConfig.fightersCanAct === false) {
      CheckGameState(dt);
    }
    fightScene.objects.forEach((object) => {
      // @ts-ignore
      object.update();
    });
  };

  fightScene.render = function () {
    fightScene.objects.forEach((object) => {
      // @ts-ignore
      object.render();
    });
  };
}
