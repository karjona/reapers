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
  leftFighterXStartPosition,
  rightFighterXStartPosition,
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
import { GameConfig } from "../data/GameConfig";
import PlaySfx from "../../sounds/PlaySfx";
import { emptyHit } from "../../sounds/sfx";

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
  recoil = 0;

  health = fighterHealth;
  roundsWon = 0;

  movingLeft = false;
  movingRight = false;
  canMove = true;

  position: Position;

  hitboxColor = "yellow";

  sprite: Sprite;
  hurtbox: GameObject;
  hitbox: GameObject;

  constructor(position: Position) {
    this.position = position;

    this.sprite = Sprite({
      x: this.position === Position.Left ? -18 : -24,
    });

    this.hurtbox = GameObject({});

    this.hitbox = GameObject({
      width: fighterWidth,
      height: fighterHeight,
      x:
        position === Position.Left
          ? leftFighterXStartPosition
          : rightFighterXStartPosition,
      y: fighterYStartPosition,
      children: [this.sprite],
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
          frames: [0, 1],
          frameRate: 1,
        },
        jabStartup: {
          frames: 2,
        },
        jabActive: {
          frames: 3,
        },
        jabRecovery: {
          frames: 2,
        },
        guard: {
          frames: 4,
        },
        hit: {
          frames: 5,
        },
        ko: {
          frames: 6,
        },
      },
    });

    this.sprite.animations = spriteSheet.animations;
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

      if (this.canMove === false) {
        this.stop();
      }

      if (this.movingLeft) {
        movesToAddToTraining.unshift("⬅️");
      }

      if (this.movingRight) {
        movesToAddToTraining.unshift("➡️");
      }
    }

    if (this.position === Position.Right) {
      this.movingRight = ["g"].some(keyPressed);
      this.movingLeft = ["d"].some(keyPressed);

      if (this.movingLeft && this.canMove) {
        this.move(Position.Left);
      } else if (this.movingRight && this.canMove) {
        this.move(Position.Right);
      } else {
        this.stop();
      }
    }
  }

  private handleAttack() {
    if (this.position === Position.Left) {
      onKey("k", () => {
        PlaySfx(emptyHit);
        if (GameConfig.fightersCanAct) {
          movesToAddToTraining.push("🗡");
          TrainingData.attackFrames = Jab.startup + Jab.active + Jab.recovery;
          this.attack(Jab);
        }
      });
    }

    if (this.position === Position.Right) {
      onKey("y", () => {
        if (GameConfig.fightersCanAct) {
          TrainingData.attackFrames = Jab.startup + Jab.active + Jab.recovery;
          this.attack(Jab);
        }
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
        this.hurtbox = GameObject({
          width: this.doingAttack.width,
          height: this.doingAttack.height,
          y: this.doingAttack.y,
          ttl: this.doingAttack.active,
          x: this.hitbox.width,
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
          this.sprite.playAnimation("jabActive");
        }
        this.hitbox.addChild(this.hurtbox);
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
        this.sprite.playAnimation("jabRecovery");
        this.recoveryFrames--;
      }
    }

    if (
      this.attackingFrames === 0 &&
      !this.canMove &&
      GameConfig.fightersCanAct == true
    ) {
      this.canMove = true;
      this.hitboxColor = "yellow";
      this.attackAlreadyHit = false;
      this.sprite.playAnimation("idle");
    }

    if (this.hurtbox.ttl === 0) {
      this.hitbox.removeChild(this.hurtbox);
      this.hurtbox = GameObject({});
      this.doingAttack = null;
    }
  }

  private handleStun() {
    if (this.recoil > 0) {
      this.recoil--;
      if (this.position == Position.Left) {
        this.hitbox.x -= 1;
        if (this.hitbox.x < 0) {
          this.hitbox.x = 0;
        }
      } else {
        this.hitbox.x += 1;
        if (this.hitbox.x + this.hitbox.width > canvas.width) {
          this.hitbox.x = canvas.width - this.hitbox.width;
        }
      }
    }

    if (this.stun > 0) {
      this.sprite.playAnimation("hit");
      this.stun--;
      if (this.stun === 0) {
        this.canMove = true;
        this.hitboxColor = "yellow";
        this.sprite.playAnimation("idle");
      }
    }
  }

  private move(position: Position) {
    if (this.canMove) {
      if (position === Position.Left) {
        this.hitbox.dx = -fighterWalkSpeed;
      } else {
        this.hitbox.dx = fighterWalkSpeed;
      }

      if (this.hitbox.x <= 0 && position === Position.Left) {
        this.hitbox.dx = 0;
      }

      if (
        this.hitbox.x >= canvas.width - fighterWidth &&
        position === Position.Right
      ) {
        this.hitbox.dx = 0;
      }
    }
  }

  private stop() {
    this.hitbox.dx = 0;
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
      this.sprite.playAnimation("jabStartup");
    }
  }

  update() {
    if (this.position === Position.Left) {
      addMoveToTrainingPanel(movesToAddToTraining);
    }

    this.handleMovement();
    this.handleAttack();
    this.handleStun();
    this.hitbox.update();
    this.hurtbox.update();
    this.sprite.update();
  }

  render() {
    this.hitbox.render();
  }
}
