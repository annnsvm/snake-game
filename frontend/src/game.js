// "life cycle of the game" start, i.e. functions that control the game flow

import { state, resetState } from './state.js';
import { dom } from './dom.js';
import { moveSnake, hitSelfOrWall, increaseSpeed } from './snake.js';
import { drawFrame, drawSnake } from './render.js';
import { generateFood } from './food.js';

export function startGame() {
  if (state.gameStarted) return; // prevent multiple starts
  state.gameStarted = true;

  dom.instructionText.style.display = 'none';
  dom.logo.style.display = 'none';

  if (!state.food) {
    generateFood();
  }

  runLoop();
}

export function endGame() {
  clearInterval(state.intervalId);
  state.intervalId = null;
  state.gameStarted = false;

  dom.instructionText.style.display = 'block';
  dom.logo.style.display = 'block';
}

function onEat() {
  generateFood();
  increaseSpeed();
  clearInterval(state.intervalId);
  runLoop();
}

function tick() {
  moveSnake(onEat);

  if (hitSelfOrWall()) {
    // update high score if needed
    updateHighScore();
    // stop game
    endGame();
    // reset state for a new game
    resetState();
    // generate new food
    generateFood();
    // updated score to 000
    updateScore();
    return;
  }
  //   if all fine redraw frame
  drawFrame();
}

// starts the game loop with setInterval
function runLoop() {
  clearInterval(state.intervalId); // Clear any existing interval
  state.intervalId = setInterval(tick, state.gameSpeedMs);
}
