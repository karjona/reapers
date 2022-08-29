import { GameConfig } from "../data/GameConfig";
import { getReadyTextTimer, fightTextTimer } from "../data/Constants";
import { setAnnouncerText } from "../modules/AnnouncerText/AnnouncerText";

export default function GetReady(dt: number) {
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
}
