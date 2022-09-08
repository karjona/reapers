export const fighterWidth = 24;
export const fighterHeight = 40;
export const fighterWalkSpeed = 1;

export const fighterHealth = 100;

export const parryWindow = 20;
export const parrySelfStun = 60;
export const parrySuccessStun = 120;

export const leftFighterXStartPosition = 30;
export const rightFighterXStartPosition = 106;
export const skyLevel = 100;
export const groundLevel = 130;
export const fighterYStartPosition = skyLevel - fighterHeight;

export const roundsToWin = 2;
export const getReadyTextTimer = 1;
export const fightTextTimer = 1.5;
export const roundWinTextTimer = 3;
export const fadeToWhiteTimer = 1;

export const fighterSpritesheet = {
  idle: {
    frames: [0, 1],
    frameRate: 1,
  },
  jabStartup: {
    frames: 2,
  },
  jabActive: {
    frames: 3,
  },
  jabRecovery: {
    frames: 2,
  },
  guard: {
    frames: 4,
  },
  hit: {
    frames: 5,
  },
  ko: {
    frames: 6,
  },
};
