import { canvas } from "./Instances";

export const fighterWidth = 24;
export const fighterHeight = 40;
export const fighterWalkSpeed = 1;

export const fighterHealth = 100;

export const groundLevel = 120;
export const leftFighterXStartPosition =
  Math.round(canvas.width / 3) - Math.round(fighterWidth / 2);
export const rightFighterXStartPosition =
  Math.round((canvas.width * 2) / 3) - Math.round(fighterWidth / 2);
export const fighterYStartPosition = groundLevel - fighterHeight;
