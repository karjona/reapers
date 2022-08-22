import { GameConfig } from "../../data/GameConfig";
import { onKey, GameObject, Text } from "kontra";

let lastMove = "";
let lastWrite = 0;

const moveList: string[] = [];

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
  text: `${moveList.join("\n")}`,
  x: -68,
  y: 40,
  color: "white",
  font: "7px monospace",
});

export const addMoveToTrainingPanel = (moves: string[]) => {
  function updateMoves(moves: string) {
    moveList.unshift(moves);
    TrainingPanelMoveList.text = `${moveList.join("\n")}`;
    lastWrite = 8;
  }

  const currentMove: string = moves.join(" ");
  if (lastWrite > 0) {
    lastWrite--;
  }

  if (moves.length > 0) {
    if (currentMove !== lastMove) {
      updateMoves(currentMove);
    } else {
      if (lastWrite === 0) {
        updateMoves(currentMove);
      }
    }
  }

  lastMove = currentMove;
  movesToAddToTraining = [];

  if (moveList.length > 12) {
    moveList.pop();
  }
};

export let movesToAddToTraining: string[] = [];

export const TrainingPanel = GameObject({
  x: 70,
  y: 2,
  width: 88,
  height: 26,
  children: [TrainingPanelText, TrainingPanelMoveList],
});
