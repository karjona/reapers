import { collides } from "kontra";
import { canvas, player1, player2 } from "../data/Instances";
import { fighterWalkSpeed } from "../data/Constants";
import { TrainingData } from "../modules/TrainingPanel/TrainingPanel";

export default function CheckFighterCollisions() {
  // Player collisions
  if (collides(player1.hitbox, player2.hitbox)) {
    if (player1.hitbox.dx > 0 && player2.hitbox.dx === 0) {
      if (player2.hitbox.x + player2.hitbox.width < canvas.width) {
        player2.hitbox.x += fighterWalkSpeed;
      }
      if (player2.hitbox.x + player2.hitbox.width === canvas.width) {
        player1.hitbox.x = player1.hitbox.x - 1;
      }
    }
  }

  // Player 1 hits player 2
  if (collides(player1.hurtbox, player2.hitbox)) {
    player2.hitboxColor = "red";
    if (player1.doingAttack) {
      if (!player1.attackAlreadyHit) {
        player2.recoil = 10;
        player2.canMove = false;
        player2.stun = player1.attackingFrames + player1.doingAttack.advantage;
        TrainingData.frameAdvantage = player1.doingAttack.advantage;
        TrainingData.damage = player1.doingAttack.damage;
      }
      player1.attackAlreadyHit = true;
    }
  }
}
