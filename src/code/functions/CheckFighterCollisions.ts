import { collides } from "kontra";
import { canvas, player1, player2 } from "../data/Instances";
import { fighterWalkSpeed, parrySuccessStun } from "../data/Constants";
import { GameConfig } from "../data/GameConfig";
import PlaySfx from "../../sounds/PlaySfx";
import { hitSfx, koSfx, parrySfx } from "../../sounds/Sfx";

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

  // Player hits
  if (
    collides(player1.hurtbox, player2.hitbox) ||
    collides(player2.hurtbox, player1.hitbox)
  ) {
    const whoIsHurt = collides(player1.hurtbox, player2.hitbox)
      ? player2
      : player1;
    const whoIsAttacking = collides(player1.hurtbox, player2.hitbox)
      ? player1
      : player2;

    if (whoIsAttacking.doingAttack) {
      if (!whoIsAttacking.attackAlreadyHit && !whoIsHurt.isParrying) {
        whoIsHurt.hitboxColor = "red";
        // Player is KO
        if (whoIsAttacking.doingAttack.damage >= whoIsHurt.health) {
          whoIsHurt.sprite.playAnimation("ko");
          PlaySfx(koSfx);
          whoIsAttacking.attackAlreadyHit = true;
          GameConfig.fightersCanAct = false;
          whoIsHurt.health = 0;
          whoIsAttacking.roundsWon += 1;
          // Player received hit and takes damage
        } else {
          whoIsHurt.sprite.playAnimation("hit");
          PlaySfx(hitSfx);
          whoIsHurt.recoil = 10;
          whoIsHurt.health -= whoIsAttacking.doingAttack.damage;
          whoIsHurt.canMove = false;
          whoIsHurt.stun =
            whoIsAttacking.attackingFrames +
            whoIsAttacking.doingAttack.advantage;
          whoIsAttacking.attackAlreadyHit = true;
        }
        // Player parries attack
      } else if (!whoIsAttacking.attackAlreadyHit && whoIsHurt.isParrying) {
        PlaySfx(parrySfx);
        whoIsHurt.sprite.playAnimation("idle");
        whoIsHurt.hitboxColor = "yellow";
        whoIsHurt.canMove = true;
        whoIsHurt.parryFrames = 0;
        whoIsHurt.isParrying = false;

        whoIsAttacking.recoil = 10;
        whoIsAttacking.stun = parrySuccessStun;
        whoIsAttacking.startupFrames = 0;
        whoIsAttacking.activeFrames = 0;
        whoIsAttacking.recoveryFrames = 0;
        whoIsAttacking.doingAttack = null;
        whoIsAttacking.attackAlreadyHit = false;
        whoIsAttacking.sprite.playAnimation("hit");
      }
    }
  }
}
