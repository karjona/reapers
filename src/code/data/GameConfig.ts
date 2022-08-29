interface GameConfig {
  showTrainingData: boolean;
  fightersCanAct: boolean;
  readyTimer: number;
  roundWinTimer: number;
  koLabelFlashTimer: number;
  winScreenOpacity: number;
  matchWon: boolean;
}

const DefaultGameConfig: GameConfig = {
  showTrainingData: false,
  fightersCanAct: false,
  readyTimer: 0,
  roundWinTimer: 0,
  koLabelFlashTimer: 0,
  winScreenOpacity: 0,
  matchWon: false,
};

export const GameConfig: GameConfig = DefaultGameConfig;
