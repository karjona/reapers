import { fighterHeight, groundLevel, roundsToWin } from "../data/Constants";
import { player1, player2 } from "../data/Instances";
import Fighter, { Position } from "../objects/Fighter";
import { setAnnouncerText } from "../modules/AnnouncerText/AnnouncerText";
import { GameConfig } from "../data/GameConfig";

// make the fighter go from sky level to ground and bounce while moving backwards
export function bounceOfGround(fighter: Fighter) {
  const shadowMovement = fighter.roundEndBounces === 0 ? 1.6 : 0;
  if (fighter.hitbox.y < groundLevel - fighterHeight) {
    fighter.hitbox.dy = 2;
    fighter.hitbox.x += fighter.position === Position.Left ? -1 : 1;
    fighter.shadow.y -= shadowMovement;
  } else {
    if (fighter.roundEndBounces < 3) {
      fighter.hitbox.dy -= 10;
      fighter.roundEndBounces++;
    } else {
      fighter.hitbox.dy = 0;
    }
  }
}

// shoot the player off screen when they have lost the match
function shootOfScreen(fighter: Fighter) {
  fighter.hitbox.dx += fighter.position === Position.Left ? -5 : 5;
}

export function WinSequence(whoWon: Fighter) {
  if (whoWon.roundsWon !== roundsToWin) {
    whoWon === player1
      ? setAnnouncerText("PLAYER 1 WINS!")
      : setAnnouncerText("PLAYER 2 WINS!");
    bounceOfGround(whoWon === player1 ? player2 : player1);
  } else {
    shootOfScreen(whoWon === player1 ? player2 : player1);
    GameConfig.matchWon = true;
  }
}
