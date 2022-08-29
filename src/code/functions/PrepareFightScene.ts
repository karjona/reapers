import { fightScene, player1, player2 } from "../data/Instances";
import { TopPanel } from "../modules/TopPanel/TopPanel";
import { BottomPanel } from "../modules/BottomPanel/BottomPanel";
import { AnnouncerText } from "../modules/AnnouncerText/AnnouncerText";
import { WinScreen } from "../modules/WinScreen/WinScreen";
import { GameConfig } from "../data/GameConfig";
import CheckGameState from "./CheckGameState";
import CheckFighterCollisions from "./CheckFighterCollisions";

export default function PrepareFightScene() {
  fightScene.add([
    player1,
    player2,
    TopPanel,
    BottomPanel,
    AnnouncerText,
    WinScreen,
  ]);

  fightScene.update = function (dt) {
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
