interface GameConfig {
  showTrainingData: boolean;
  fightersCanAct: boolean;
  readyTimer: number;
}

const DefaultGameConfig: GameConfig = {
  showTrainingData: false,
  fightersCanAct: false,
  readyTimer: 0,
};

export const GameConfig: GameConfig = DefaultGameConfig;
