import { dom } from './dom';
import { drawFood } from './food';
import { state } from './state';
import { createElement, setPosition, pad3 } from './utils';

function drawSnake(board) {
  state.snake.forEach((seg) => {
    const element = createElement('div', 'snake');
    setPosition(element, seg);
    board.appendChild(element);
  });
}

export function drawFrame() {
  dom.board.innerHTML = '';
  drawFood(dom.board);
  drawSnake(dom.board);
}

export function updateScore() {
  const current = snake.length - 1;
  dom.score.textContent = pad3(current);
}

export function updateHighScore() {
  const current = snake.length - 1;
  if (current > state.highScore) {
    state.highScore = current;
    dom.highScoreText.textContent = pad3(state.highScore);
  }
  dom.highScoreText.style.display = 'block';
}
