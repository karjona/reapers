import { init, initKeys, getContext } from "kontra";
import { initFont, font } from "tinyfont";
import Fighter, { Position } from "../types/Fighter";

export const { canvas } = init("game");
initKeys();

export const renderText = initFont(font, getContext());
export const player1 = new Fighter(Position.Left);
export const player2 = new Fighter(Position.Right);
