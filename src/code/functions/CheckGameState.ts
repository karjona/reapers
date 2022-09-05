import { GameConfig } from "../data/GameConfig";
import {
  getReadyTextTimer,
  fightTextTimer,
  roundWinTextTimer,
  fadeToWhiteTimer,
} from "../data/Constants";
import { setAnnouncerText } from "../modules/AnnouncerText/AnnouncerText";
import { player1, player2 } from "../data/Instances";
import { bounceOfGround, WinSequence } from "./WinSequence";
import ResetFight from "./ResetFight";
import { toggleKOColor } from "../modules/TopPanel/TopPanel";
import PrepareRematchScene from "./PrepareRematchScene";

export default function CheckGameState(dt: number | undefined) {
  if (dt) {
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
      // One fighter is dead
    } else {
      if (GameConfig.roundWinTimer === 0) {
        player1.canMove = false;
        player2.canMove = false;
        GameConfig.fightersCanAct = false;
        GameConfig.roundWinTimer += dt;
        WinSequence(player1.health > 0 ? player1 : player2);
      }

      if (
        GameConfig.roundWinTimer > 0 &&
        GameConfig.roundWinTimer < roundWinTextTimer &&
        GameConfig.matchWon === false
      ) {
        bounceOfGround(player1.health > 0 ? player2 : player1);
        if (GameConfig.koLabelFlashTimer === 0) {
          GameConfig.koLabelFlashTimer++;
          toggleKOColor();
        } else if (GameConfig.koLabelFlashTimer < 8) {
          GameConfig.koLabelFlashTimer++;
        } else {
          GameConfig.koLabelFlashTimer = 0;
        }
        GameConfig.roundWinTimer += dt;
      }

      if (
        GameConfig.roundWinTimer >= roundWinTextTimer &&
        GameConfig.matchWon === false
      ) {
        GameConfig.roundWinTimer = 0;
        ResetFight();
      }

      if (
        GameConfig.roundWinTimer > 0 &&
        GameConfig.roundWinTimer < fadeToWhiteTimer &&
        GameConfig.matchWon === true
      ) {
        GameConfig.winScreenOpacity =
          (1 / fadeToWhiteTimer) * GameConfig.roundWinTimer;
        GameConfig.roundWinTimer += dt;
      }

      if (
        GameConfig.roundWinTimer >= fadeToWhiteTimer &&
        GameConfig.matchWon === true
      ) {
        PrepareRematchScene(player1.health > 0 ? player1 : player2);
      }
    }
  }
}
