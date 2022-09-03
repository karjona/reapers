import { fightScene, player1, player2, rematchScene } from "../data/Instances";
import {
  fighterHealth,
  fighterYStartPosition,
  leftFighterXStartPosition,
  rightFighterXStartPosition,
} from "../data/Constants";
import { Position } from "../objects/Fighter";
import { GameObject } from "kontra";
import { GameConfig } from "../data/GameConfig";
import { Scene } from "../types/Scene";

export default function ResetFight(rematch = false) {
  const fighters = [player1, player2];
  fighters.forEach((fighter) => {
    // reset all player properties to default
    fighter.doingAttack = null;
    fighter.attackAlreadyHit = false;
    fighter.attackingFrames = 0;
    fighter.startupFrames = 0;
    fighter.activeFrames = 0;
    fighter.recoveryFrames = 0;
    fighter.stun = 0;
    fighter.recoil = 0;
    fighter.health = fighterHealth;
    fighter.movingLeft = false;
    fighter.movingRight = false;
    fighter.canMove = true;
    fighter.hitboxColor = "yellow";
    fighter.roundEndBounces = 0;

    // move all players back to start position
    fighter.position === Position.Left
      ? (fighter.hitbox.x = leftFighterXStartPosition)
      : (fighter.hitbox.x = rightFighterXStartPosition);
    fighter.hitbox.y = fighterYStartPosition;
    fighter.shadow.y = 0;

    // reset all player animations to idle
    fighter.sprite.playAnimation("idle");

    // reset all player hutboxes to default
    fighter.hitbox.removeChild(fighter.hurtbox);
    fighter.hurtbox = GameObject({});

    if (rematch) {
      // reset round wins
      fighter.roundsWon = 0;
    }
  });

  // show get ready
  GameConfig.readyTimer = 0;

  if (rematch) {
    // switch scenes
    rematchScene.destroy();
    GameConfig.currentScene = Scene.Fight;
    GameConfig.matchWon = false;
    GameConfig.whoWon = null;
    GameConfig.winScreenOpacity = 0;
    GameConfig.koLabelFlashTimer = 0;
    fightScene.show();
  }
}
