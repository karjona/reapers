interface GameConfig {
  showTrainingData: boolean;
  fightersCanAct: boolean;
  readyTimer: number;
  roundWinTimer: number;
  koLabelFlashTimer: number;
}

const DefaultGameConfig: GameConfig = {
  showTrainingData: false,
  fightersCanAct: false,
  readyTimer: 0,
  roundWinTimer: 0,
  koLabelFlashTimer: 0,
};

export const GameConfig: GameConfig = DefaultGameConfig;
