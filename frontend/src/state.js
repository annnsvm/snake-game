import { START_SNAKE, START_DIR, START_SPEED_MS, GRID_SIZE } from './constants';

export const state = {
  snake: structuredClone(START_SNAKE),
  gridSize: GRID_SIZE,
  food: null,
  direction: START_DIR,
  gameSpeedMs: START_SPEED_MS,
  highScore: 0,
  intervalId: null,
  gameStarted: false,
};

// reset state after game is over

export const resetState = {
  snake: structuredClone(START_SNAKE),
  gameSpeedMs: START_SNAKE,
  direction: START_DIR,
};
