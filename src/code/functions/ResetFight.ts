import { player1, player2 } from "../data/Instances";
import {
  fighterHealth,
  leftFighterXStartPosition,
  rightFighterXStartPosition,
} from "../data/Constants";
import { Position } from "../objects/Fighter";
import { GameObject } from "kontra";
import { TrainingData } from "../modules/TrainingPanel/TrainingPanel";
import { GameConfig } from "../data/GameConfig";

export default function ResetFight() {
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

    // move all players back to start position
    fighter.position === Position.Left
      ? (fighter.hitbox.x = leftFighterXStartPosition)
      : (fighter.hitbox.x = rightFighterXStartPosition);

    // reset all player animations to idle
    fighter.sprite.playAnimation("idle");

    // reset all player hutboxes to default
    fighter.hitbox.removeChild(fighter.hurtbox);
    fighter.hurtbox = GameObject({});

    // reset training data
    TrainingData.attackFrames = 0;
    TrainingData.frameAdvantage = 0;
    TrainingData.damage = 0;

    // show get ready
    GameConfig.readyTimer = 0;
  });
}
