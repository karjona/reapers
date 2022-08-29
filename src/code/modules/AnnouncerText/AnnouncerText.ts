import { GameObject } from "kontra";
import { renderText } from "../../data/Instances";

let label = "";

export const AnnouncerText = GameObject({
  x: 64,
  y: 75,
  render: function () {
    renderText(label, 0, 0, 5, "white");
  },
});

export function setAnnouncerText(text: string) {
  label = text;
}
