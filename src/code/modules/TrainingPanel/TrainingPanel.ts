import { GameConfig } from "../../data/GameConfig";
import { onKey, GameObject, Text } from "kontra";

let lastMove = "";
let lastWrite = 0;

export const toggleTrainingPanel = () => {
  onKey("t", () => {
    GameConfig.showTrainingData = !GameConfig.showTrainingData;
  });
};

export const isTrainingPanelEnabled = () => {
  return GameConfig.showTrainingData ? true : false;
};

const TrainingPanelText = Text({
  text: `Attack frame: \nFrame advantage: \nDamage: `,
  x: 2,
  y: 2,
  color: "white",
  font: "7px monospace",
});

const TrainingPanelMoveList = Text({
  text: "",
  x: -68,
  y: 40,
  color: "white",
  font: "7px monospace",
});

export const addMoveToTrainingPanel = (moves: string[]) => {
  const moveList: string = moves.join(" ");
  const oldMoves = TrainingPanelMoveList.text;

  if (lastWrite > 0) {
    lastWrite--;
  }

  if (moves.length > 0) {
    if (moveList !== lastMove) {
      TrainingPanelMoveList.text = `${moveList}\n${oldMoves}`;
      lastWrite = 8;
    } else {
      if (lastWrite === 0) {
        TrainingPanelMoveList.text = `${moveList}\n${oldMoves}`;
        lastWrite = 8;
      }
    }
  }

  lastMove = moveList;
  movesToAddToTraining = [];
};

export let movesToAddToTraining: string[] = [];

export const TrainingPanel = GameObject({
  x: 70,
  y: 2,
  width: 88,
  height: 26,
  children: [TrainingPanelText, TrainingPanelMoveList],
});
