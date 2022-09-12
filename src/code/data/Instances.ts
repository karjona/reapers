import { init, initKeys, getContext, Scene, GameObject } from "kontra";
import { initFont, font } from "tinyfont";
import Fighter, { Position } from "../objects/Fighter";

export const { canvas } = init("game");
initKeys();

export const renderText = initFont(font, getContext());

export const player1 = new Fighter(Position.Left);
export const player2 = new Fighter(Position.Right);

export const fightBackground = GameObject({
  x: 0,
  y: 0,
  width: 160,
  height: 132,
  render: function (this: GameObject) {
    const context = getContext();
    const gradient = context.createLinearGradient(0, 0, 0, 132);
    gradient.addColorStop(0, "dimgray");
    gradient.addColorStop(1, "darkgray");
    context.fillStyle = gradient;
    context.fillRect(this.x, this.y, this.width, this.height);
  },
});

export const fightScene = Scene({
  id: "fightScene",
});

export const rematchScene = Scene({
  id: "rematchScene",
});

export const titleScene = Scene({
  id: "titleScene",
  onShow: function () {
    // @ts-ignore
    this.objects.forEach((object) => {
      // @ts-ignore
      object.opacity = 0;
    });
  },
});
