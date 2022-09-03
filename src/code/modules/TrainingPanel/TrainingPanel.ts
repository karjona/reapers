import { GameConfig } from "../../data/GameConfig";
import { onKey } from "kontra";

export const toggleTrainingPanel = () => {
  onKey("t", () => {
    GameConfig.showTrainingData = !GameConfig.showTrainingData;
  });
};

export const isTrainingPanelEnabled = () => {
  return GameConfig.showTrainingData ? true : false;
};
