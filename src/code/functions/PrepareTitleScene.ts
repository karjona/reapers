import { GameObject, Sprite, Text, loadImage } from "kontra";
import { titleScene, renderText } from "../data/Instances";
import logo from "/src/images/background/reapers.webp";

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

  const cursor = Text({
    x: 38,
    y: 130,
    text: "🔥",
    color: "white",
    font: "8px monospace",
  });

  const pressKeyText = GameObject({
    x: 50,
    y: 132,
    render: function () {
      renderText("PRESS K TO START", 0, 0, 5, "cyan");
    },
  });

  titleScene.add([
    titleSceneBackground,
    titleSprite,
    destinyText,
    reapersText,
    cursor,
    pressKeyText,
  ]);

  titleScene.update = function () {
    titleScene.objects.forEach((object) => {
      // @ts-ignore
      object.update();
    });
  };

  titleScene.render = function () {
    titleScene.objects.forEach((object) => {
      // @ts-ignore
      object.render();
    });
  };
}
