import { Scene } from "../types/Scene";

interface GameConfig {
  showTrainingData: boolean;
  fightersCanAct: boolean;
  readyTimer: number;
  roundWinTimer: number;
  koLabelFlashTimer: number;
  winScreenOpacity: number;
  matchWon: boolean;
  whoWon: string | null;
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
  whoWon: null,
  currentScene: Scene.Title,
};

export const GameConfig: GameConfig = DefaultGameConfig;
