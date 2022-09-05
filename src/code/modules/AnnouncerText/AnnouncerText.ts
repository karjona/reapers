import { canvas } from "../../data/Instances";
import { GameObject } from "kontra";
import { renderText } from "../../data/Instances";

let label = "";

export const AnnouncerText = GameObject({
  x: 0,
  y: 71,
  render: function () {
    renderText(label, 1, 1, 10, "black");
    //renderText(label, 0, 0, 10, "dodgerblue");
    renderText(label, 0, 0, 10, "orangered");
  },
});

export function setAnnouncerText(text: string) {
  label = text;
  const textWidth = text.length * 8;
  const labelXCoord = Math.round(canvas.width / 2 - textWidth / 2);
  AnnouncerText.x = labelXCoord;
}
