import { canvas } from "../../data/Instances";
import { GameObject } from "kontra";
import { renderText } from "../../data/Instances";

let label = "";

export const AnnouncerText = GameObject({
  x: 0,
  y: 70,
  render: function () {
    renderText(label, 0, 0, 5, "white");
  },
});

export function setAnnouncerText(text: string) {
  const textWidth = text.length * 5;
  const labelXCoord = Math.round(canvas.width / 2 - textWidth / 2);
  AnnouncerText.x = labelXCoord;
  label = text;
}
