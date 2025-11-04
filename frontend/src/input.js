import { dom } from './dom.js';
import { startGame } from './game.js';
import { setDirectionByKey } from './snake.js';
import { state } from './state.js';

export function bindInput() {
  dom.logo.addEventListener('click', () => {
    startGame();
  });
  dom.board.addEventListener('click', () => {
    startGame();
  });
  window.addEventListener('keydown', (e) => {
    if (!state.gameStarted && (e.key === ' ' || e.key === 'Space')) {
      startGame();
    } else {
      setDirectionByKey(e.key);
    }
  });
}
