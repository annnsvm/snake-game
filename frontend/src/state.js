import { START_SNAKE, START_DIR, START_SPEED_MS, GRID_SIZE } from './constants.js';

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

export function resetState() {
  state.snake = structuredClone(START_SNAKE);
  state.direction = START_DIR;
  state.gameSpeedMs = START_SPEED_MS;
  state.food = null;
  state.gameStarted = false;
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
}
