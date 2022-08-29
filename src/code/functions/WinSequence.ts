import { roundsToWin } from "../data/Constants";
import { player1 } from "../data/Instances";
import Fighter from "../objects/Fighter";
import { setAnnouncerText } from "../modules/AnnouncerText/AnnouncerText";

export function WinSequence(whoWon: Fighter) {
  if (whoWon.roundsWon !== roundsToWin) {
    whoWon === player1
      ? setAnnouncerText("PLAYER 1 WINS!")
      : setAnnouncerText("PLAYER 2 WINS!");
  }
}
