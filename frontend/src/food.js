import { state } from './state';
import { rand1to, createElement, setPosition } from './utils';

export function generateFood() {
  state.food = { x: rand1to(state.gridSize), y: rand1to(state.gridSize) };
}

export function drawFood(board) {
  if (!state.gameStarted || !state.food) return;
  const foodEl = createElement('div', 'food');
  setPosition(foodEl, state.food);
  board.appendChild(foodEl);
}
