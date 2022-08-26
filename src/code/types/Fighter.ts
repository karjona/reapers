import { Sprite, GameObject, SpriteSheet, getContext } from "kontra";
import {
  fighterHealth,
  fighterHeight,
  fighterWidth,
  fighterYStartPosition,
  leftFighterXStartPosition,
  rightFighterXStartPosition,
} from "../data/Constants";
import { Attack } from "./Attack";
import { isTrainingPanelEnabled } from "../modules/TrainingPanel/TrainingPanel";

export enum Position {
  Left,
  Right,
}

export default class Fighter {
  doingAttack: Attack | null = null;
  attackAlreadyHit = false;
  attackingFrames = 0;
  startupFrames = 0;
  activeFrames = 0;
  recoveryFrames = 0;

  stun = 0;
  hitStunned = 0;

  health = fighterHealth;

  canMove = true;

  position: Position;

  hitboxColor = "yellow";

  #spriteSheet: SpriteSheet;
  #sprite: Sprite;
  #hurtbox: GameObject;
  #hitbox: GameObject;

  constructor(position: Position, spriteSheet: HTMLImageElement) {
    this.position = position;

    this.#spriteSheet = SpriteSheet({
      image: spriteSheet,
      frameWidth: 60,
      frameHeight: 37,
      animations: {
        idle: {
          frames: 0,
        },
        jabStartup: {
          frames: 1,
        },
        jabActive: {
          frames: 2,
        },
        jabRecovery: {
          frames: 1,
        },
      },
    });

    this.#sprite = Sprite({
      x: this.position === Position.Left ? -18 : 0,
      animations: this.#spriteSheet.animations,
    });

    this.#hurtbox = GameObject({});

    this.#hitbox = GameObject({
      width: fighterWidth,
      height: fighterHeight,
      x:
        position === Position.Left
          ? leftFighterXStartPosition
          : rightFighterXStartPosition,
      y: fighterYStartPosition,
      children: [this.#sprite],
      render: () => {
        if (isTrainingPanelEnabled()) {
          const context = getContext();
          context.strokeStyle = this.hitboxColor;
          context.lineWidth = 2;
          context.strokeRect(0, 0, fighterWidth, fighterHeight);
        }
      },
    });
  }

  update() {
    this.#hitbox.update();
    this.#hurtbox.update();
  }

  render() {
    this.#hitbox.render();
  }
}
