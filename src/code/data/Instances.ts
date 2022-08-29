import { init, initKeys, getContext, Scene, Sprite } from "kontra";
import { initFont, font } from "tinyfont";
import Fighter, { Position } from "../objects/Fighter";

export const { canvas } = init("game");
initKeys();

export const renderText = initFont(font, getContext());

export const player1 = new Fighter(Position.Left);
export const player2 = new Fighter(Position.Right);

export const fightBackground = Sprite({
  x: 0,
  y: 33,
});

export const fightScene = Scene({
  id: "fightScene",
});

export const rematchScene = Scene({
  id: "rematchScene",
});
