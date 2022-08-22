import { GameConfig } from "../../data/GameConfig";
import { onKey, GameObject, Text } from "kontra";

export const toggleTrainingPanel = () => {
  onKey("t", () => {
    GameConfig.showTrainingData = !GameConfig.showTrainingData;
  });
};

export const isTrainingPanelEnabled = () => {
  if (GameConfig.showTrainingData) {
    return true;
  } else {
    return false;
  }
};

const TrainingPanelText = Text({
  text: `Attack frame: \nFrame advantage: \nDamage: `,
  x: 2,
  y: 2,
  color: "white",
  font: "7px monospace",
});

export const TrainingPanel = GameObject({
  x: 70,
  y: 2,
  width: 88,
  height: 26,
  children: [TrainingPanelText],
});
