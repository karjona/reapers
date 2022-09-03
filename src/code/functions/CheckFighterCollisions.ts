import { collides } from "kontra";
import { canvas, player1, player2 } from "../data/Instances";
import { fighterWalkSpeed } from "../data/Constants";
import { GameConfig } from "../data/GameConfig";

export default function CheckFighterCollisions() {
  // Player collisions
  if (collides(player1.hitbox, player2.hitbox)) {
    // Player 1 is moving, player 2 is not
    if (player1.hitbox.dx != 0 && player2.hitbox.dx === 0) {
      // Push player 2 back
      if (player2.hitbox.x + player2.hitbox.width < canvas.width) {
        player2.hitbox.x += fighterWalkSpeed;
      }

      // Don't let player 1 move past player 2 in corner
      if (player2.hitbox.x + player2.hitbox.width === canvas.width) {
        player1.hitbox.x -= fighterWalkSpeed;
      }

      // Player 2 is moving, player 1 is not
    } else if (player2.hitbox.dx != 0 && player1.hitbox.dx === 0) {
      // Push player 1 back
      if (player1.hitbox.x > 0) {
        player1.hitbox.x -= fighterWalkSpeed;
      }

      // Don't let player 2 move past player 1 in corner
      if (player1.hitbox.x === 0) {
        player2.hitbox.x += fighterWalkSpeed;
      }

      // Both players are colliding, and both are moving or aren't moving at all
    } else {
      // If both players are pushing each other, don't move them
      if (player1.hitbox.dx > 0 && player2.hitbox.dx < 0) {
        player1.hitbox.x += -fighterWalkSpeed;
        player2.hitbox.x += fighterWalkSpeed;
      }
    }
  }

  // Player 1 hits player 2
  if (collides(player1.hurtbox, player2.hitbox)) {
    player2.hitboxColor = "red";
    if (player1.doingAttack) {
      if (!player1.attackAlreadyHit) {
        if (player1.doingAttack.damage >= player2.health) {
          player2.sprite.playAnimation("ko");
          player1.attackAlreadyHit = true;
          GameConfig.fightersCanAct = false;
          player2.health = 0;
          player1.roundsWon += 1;
        } else {
          player2.sprite.playAnimation("hit");
          player2.recoil = 10;
          player2.health -= player1.doingAttack.damage;
          player2.canMove = false;
          player2.stun =
            player1.attackingFrames + player1.doingAttack.advantage;
          player1.attackAlreadyHit = true;
        }
      }
    }
  }
}
