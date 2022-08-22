import { init, initKeys, getContext } from "kontra";
import { initFont, font } from "tinyfont";

export const { canvas } = init("game");
initKeys();

export const renderText = initFont(font, getContext());
