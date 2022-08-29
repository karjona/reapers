import { Scene } from "../types/Scene";

interface GameConfig {
  showTrainingData: boolean;
  fightersCanAct: boolean;
  readyTimer: number;
  roundWinTimer: number;
  koLabelFlashTimer: number;
  winScreenOpacity: number;
  matchWon: boolean;
  currentScene: Scene;
}

const DefaultGameConfig: GameConfig = {
  showTrainingData: false,
  fightersCanAct: false,
  readyTimer: 0,
  roundWinTimer: 0,
  koLabelFlashTimer: 0,
  winScreenOpacity: 0,
  matchWon: false,
  currentScene: Scene.Fight,
};

export const GameConfig: GameConfig = DefaultGameConfig;
