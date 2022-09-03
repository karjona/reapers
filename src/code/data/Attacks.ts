import { Attack } from "../types/Attack";

export const Jab: Attack = {
  damage: 10,
  startup: 50,
  active: 40,
  recovery: 40,
  width: 18,
  height: 10,
  y: 10,
  advantage: -1,
};

export const Strong: Attack = {
  damage: 20,
  startup: 5,
  active: 8,
  recovery: 8,
  width: 20,
  height: 20,
  y: 2,
  advantage: 2,
};
