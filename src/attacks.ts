export interface Attack {
  damage: number;
  startup: number;
  active: number;
  recovery: number;
  width: number;
  height: number;
  y: number;
}

export const Jab: Attack = {
  damage: 10,
  startup: 20,
  active: 40,
  recovery: 20,
  width: 16,
  height: 10,
  y: 10,
};

export const Strong: Attack = {
  damage: 20,
  startup: 5,
  active: 8,
  recovery: 8,
  width: 20,
  height: 20,
  y: 2,
};
