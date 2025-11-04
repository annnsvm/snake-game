import { startGame } from './game.js';
import { setDirectionByKey } from './snake';
import { state } from './state.js';

export function bindInput() {
  window.addEventListener('keydown', (e) => {
    if (!state.gameStarted && (e.key === ' ' || e.key === 'Space')) {
      startGame();
    } else {
      setDirectionByKey(e.key);
    }
  });
}
