import { GameConfig } from "../data/GameConfig";
import {
  getReadyTextTimer,
  fightTextTimer,
  roundWinTextTimer,
} from "../data/Constants";
import { setAnnouncerText } from "../modules/AnnouncerText/AnnouncerText";
import { player1, player2 } from "../data/Instances";
import { WinSequence } from "./WinSequence";
import ResetFight from "./ResetFight";

export default function CheckGameState(dt: number) {
  if (player1.health > 0 && player2.health > 0) {
    if (
      GameConfig.fightersCanAct === false &&
      GameConfig.readyTimer > fightTextTimer
    ) {
      setAnnouncerText("");
      GameConfig.fightersCanAct = true;
    }

    if (
      GameConfig.fightersCanAct === false &&
      GameConfig.readyTimer > getReadyTextTimer
    ) {
      setAnnouncerText("FIGHT!");
    }

    if (GameConfig.fightersCanAct === false && GameConfig.readyTimer === 0) {
      setAnnouncerText("GET READY");
    }
    GameConfig.readyTimer += dt;
  } else {
    if (GameConfig.roundWinTimer === 0) {
      player1.canMove = false;
      player2.canMove = false;
      GameConfig.fightersCanAct = false;
      WinSequence(player1.health > 0 ? player1 : player2);
    }

    if (GameConfig.roundWinTimer >= roundWinTextTimer) {
      ResetFight();
    }
    GameConfig.roundWinTimer += dt;
  }
}
