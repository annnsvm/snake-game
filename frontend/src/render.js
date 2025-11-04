import { dom } from './dom.js';
import { drawFood } from './food.js';

import { state } from './state.js';
import { createElement, setPosition, pad3 } from './utils.js';

export function drawFrame() {
  dom.board.innerHTML = '';
  drawFood(dom.board);
  drawSnake(dom.board);
}

function drawSnake(board) {
  state.snake.forEach((seg) => {
    const element = createElement('div', 'snake');
    setPosition(element, seg);
    board.appendChild(element);
  });
}

export function updateScore() {
  // console.log('updateScore called', state.snake);
  const current = state.snake.length - 1;
  // console.log('current score:', current);
  dom.score.textContent = pad3(current);
}

export function updateHighScore() {
  const current = state.snake.length - 1;
  if (current > state.highScore) {
    state.highScore = current;
    dom.highScoreText.textContent = pad3(state.highScore);
  }
  dom.highScoreText.style.display = 'block';
}

export function clearBoard() {
  const board = dom.board;
  if (board) {
    board.innerHTML = '';
  }
}
