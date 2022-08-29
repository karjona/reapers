import { GameConfig } from "../../data/GameConfig";
import { renderText } from "../../data/Instances";
import { onKey, GameObject, Text } from "kontra";

let lastMove = "";
let lastWrite = 0;

interface TrainingData {
  attackFrames: number;
  frameAdvantage: number;
  damage: number;
}

export const TrainingData: TrainingData = {
  attackFrames: 0,
  frameAdvantage: 0,
  damage: 0,
};

const moveList: string[] = [];

export const toggleTrainingPanel = () => {
  onKey("t", () => {
    GameConfig.showTrainingData = !GameConfig.showTrainingData;
  });
};

export const isTrainingPanelEnabled = () => {
  return GameConfig.showTrainingData ? true : false;
};

const TrainingPanelText = GameObject({
  x: 2,
  y: 2,
  render: function () {
    renderText(`ATTACK FRAMES: ${TrainingData.attackFrames}`, 0, 0, 5, "white");
    renderText(
      `FRAME ADVANTAGE: ${TrainingData.frameAdvantage}`,
      0,
      6,
      5,
      "white"
    );
    renderText(`DAMAGE: ${TrainingData.damage}`, 0, 12, 5, "white");
  },
});

/*
const TrainingPanelMoveList = Text({
  text: `${moveList.join("\n")}`,
  x: -68,
  y: 36,
  font: "8px monospace",
});
*/

export const TrainingPanelMoveList = GameObject({});

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

  if (moveList.length > 10) {
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
