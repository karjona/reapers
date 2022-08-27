import { canvas } from "../data/Instances";
import {
  Sprite,
  GameObject,
  SpriteSheet,
  keyPressed,
  onKey,
  getContext,
} from "kontra";
import {
  fighterHealth,
  fighterHeight,
  fighterWidth,
  fighterWalkSpeed,
  fighterYStartPosition,
} from "../data/Constants";
import { Attack } from "../types/Attack";
import { Jab } from "../data/Attacks";
import {
  movesToAddToTraining,
  isTrainingPanelEnabled,
  addMoveToTrainingPanel,
  TrainingData,
} from "../modules/TrainingPanel/TrainingPanel";

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

  movingLeft = false;
  movingRight = false;
  canMove = true;

  position: Position;

  hitboxColor = "yellow";

  #sprite: Sprite;
  #hurtbox: GameObject;
  #hitbox: GameObject;

  constructor(position: Position) {
    this.position = position;

    this.#sprite = Sprite({
      x: this.position === Position.Left ? -18 : 0,
    });

    this.#hurtbox = GameObject({});

    this.#hitbox = GameObject({
      width: fighterWidth,
      height: fighterHeight,
      x:
        position === Position.Left
          ? Math.round(canvas.width / 3) - Math.round(fighterWidth / 2)
          : Math.round((canvas.width * 2) / 3) - Math.round(fighterWidth / 2),
      y: fighterYStartPosition,
      children: [this.#sprite],
      properties: {
        type: "fighterHitbox",
      },
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

  addSpriteSheet(image: HTMLImageElement) {
    const spriteSheet = SpriteSheet({
      image: image,
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

    this.#sprite.animations = spriteSheet.animations;
  }

  private handleMovement() {
    if (this.position === Position.Left) {
      this.movingRight = ["arrowright"].some(keyPressed);
      this.movingLeft = ["arrowleft"].some(keyPressed);

      if (this.movingLeft && this.canMove) {
        this.move(Position.Left);
      } else if (this.movingRight && this.canMove) {
        this.move(Position.Right);
      } else {
        this.stop();
      }

      if (this.movingLeft) {
        movesToAddToTraining.unshift("⬅️");
      }

      if (this.movingRight) {
        movesToAddToTraining.unshift("➡️");
      }
    }
  }

  private handleAttack() {
    if (this.position === Position.Left) {
      onKey("z", () => {
        movesToAddToTraining.push("🗡");
        TrainingData.attackFrames = Jab.startup + Jab.active + Jab.recovery;
        this.attack(Jab);
      });
    }

    if (this.attackingFrames > 0) {
      this.attackingFrames--;
      if (this.position === Position.Left) {
        TrainingData.attackFrames = this.attackingFrames;
      }

      if (this.startupFrames > 0) {
        this.startupFrames--;
      }

      if (
        this.doingAttack &&
        this.startupFrames === 0 &&
        this.activeFrames > 0 &&
        this.activeFrames === this.doingAttack.active
      ) {
        this.#hurtbox = GameObject({
          width: this.doingAttack.width,
          height: this.doingAttack.height,
          y: this.doingAttack.y,
          ttl: this.doingAttack.active,
          x: this.#hitbox.width,
          render: function (this: GameObject) {
            if (isTrainingPanelEnabled()) {
              const context = getContext();
              context.strokeStyle = "red";
              context.lineWidth = 2;
              context.strokeRect(0, 0, this.width, this.height);
            }
          },
        });
        if (this.doingAttack === Jab) {
          this.#sprite.playAnimation("jabActive");
        }
        this.#hitbox.addChild(this.#hurtbox);
        this.activeFrames--;
      }

      if (
        this.doingAttack &&
        this.activeFrames > 0 &&
        this.activeFrames < this.doingAttack.active
      ) {
        this.activeFrames--;
      }

      if (this.recoveryFrames > 0 && this.activeFrames === 0) {
        this.hitboxColor = "lightgrey";
        this.#sprite.playAnimation("jabRecovery");
        this.recoveryFrames--;
      }
    }

    if (this.attackingFrames === 0 && !this.canMove) {
      this.canMove = true;
      this.hitboxColor = "yellow";
      this.attackAlreadyHit = false;
      this.#sprite.playAnimation("idle");
    }

    if (this.#hurtbox.ttl === 0) {
      this.#hitbox.removeChild(this.#hurtbox);
      this.#hurtbox = GameObject({});
      this.doingAttack = null;
    }
  }

  private move(position: Position) {
    if (this.canMove) {
      if (position === Position.Left) {
        this.#hitbox.dx = -fighterWalkSpeed;
      } else {
        this.#hitbox.dx = fighterWalkSpeed;
      }
    }
  }

  private stop() {
    this.#hitbox.dx = 0;
  }

  private attack(attack: Attack) {
    if (this.attackingFrames === 0) {
      const attackLength = attack.startup + attack.active + attack.recovery;
      this.doingAttack = attack;
      this.startupFrames = attack.startup;
      this.activeFrames = attack.active;
      this.recoveryFrames = attack.recovery;
      this.attackingFrames = attackLength;
      this.hitboxColor = "blue";
      this.canMove = false;
      this.#sprite.playAnimation("jabStartup");
    }
  }

  update() {
    if (this.position === Position.Left) {
      addMoveToTrainingPanel(movesToAddToTraining);
    }

    this.handleMovement();
    this.handleAttack();
    this.#hitbox.update();
    this.#hurtbox.update();
  }

  render() {
    this.#hitbox.render();
  }
}
