import { GameConfig } from "../../data/GameConfig";
import { init, onKey, Text } from "kontra";

init();

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

export const TrainingPanel = Text({
  text: `Training Panel`,
  x: 10,
  y: 10,
  color: "white",
  font: "7px monospace",
});
