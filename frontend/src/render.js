import { dom } from './dom';
import { drawFood } from './food';
import { state } from './state';
import { createElement, setPosition } from './utils';

export function drawSnake(board) {
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
