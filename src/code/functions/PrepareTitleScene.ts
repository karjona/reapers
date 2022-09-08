import { GameObject, Sprite, loadImage, onKey, offKey } from "kontra";
import PlaySfx from "../../sounds/PlaySfx";
import { menuSfx } from "../../sounds/Sfx";
import { GameConfig } from "../data/GameConfig";
import { fightScene, titleScene, renderText } from "../data/Instances";
import { Scene } from "../types/Scene";
import ResetFight from "./ResetFight";
import logo from "/src/images/background/reapers.webp";

let pressKeyFlash = 0;
let pressKeyLabel = "";
let fightSceneDelay = 0;

export default async function PrepareTitleScene() {
  const titleSceneBackground = GameObject({
    x: 0,
    y: 0,
    width: 160,
    height: 152,
    render: function (this: GameObject) {
      this.context.fillStyle = "black";
      this.context.fillRect(this.x, this.y, this.width, this.height);
    },
  });

  const titleSprite = Sprite({
    x: 3,
    y: 5,
    width: 154,
    height: 75,
    image: await loadImage(logo),
  });

  const destinyText = GameObject({
    x: 18,
    y: 84,
    render: function () {
      renderText("TOURNAMENT OF", 0, 0, 10, "white");
      renderText("DESTINY", 11, 13, 20, "grey");
      renderText("DESTINY", 10, 12, 20, "white");
    },
  });

  const reapersText = GameObject({
    x: 14,
    y: 33,
    render: function () {
      renderText("THE REAPERS", 0, 0, 15, "darkred");
      renderText("THE REAPERS", 1, 1, 15, "red");
    },
  });

  const pressKeyText = GameObject({
    x: 50,
    y: 132,
    render: function () {
      renderText(pressKeyLabel, 0, 0, 5, "orangered");
    },
  });

  titleScene.add([
    titleSceneBackground,
    titleSprite,
    destinyText,
    reapersText,
    pressKeyText,
  ]);

  titleScene.update = function () {
    titleScene.objects.forEach((object) => {
      // @ts-ignore
      if (object.opacity < 1) {
        // @ts-ignore
        object.opacity += 0.01;
      }
      // @ts-ignore
      object.update();
    });

    if (pressKeyFlash <= 60) {
      pressKeyLabel = "";
      pressKeyFlash++;
    } else if (pressKeyFlash >= 61 && pressKeyFlash <= 120) {
      pressKeyLabel = "PRESS K TO START";
      pressKeyFlash++;
    } else {
      pressKeyFlash = 0;
    }

    if (fightSceneDelay <= 120 && fightSceneDelay >= 1) {
      fightSceneDelay++;
      pressKeyLabel = "";
    }

    if (fightSceneDelay === 121) {
      titleScene.destroy();
      GameConfig.currentScene = Scene.Fight;

      ResetFight(true);
      fightScene.show();

      pressKeyFlash = 0;
      pressKeyLabel = "";
      fightSceneDelay = 0;
    }

    onKey("k", () => {
      offKey("k");
      PlaySfx(menuSfx);
      fightSceneDelay++;
    });
  };

  titleScene.render = function () {
    // @ts-ignore
    this.objects.forEach((object) => {
      // @ts-ignore
      object.render();
    });
  };
}
