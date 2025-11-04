import { state } from './state.js';

// Sets the snake's direction based on keyboard input
export function setDirectionByKey(key) {
  const map = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  };

  // Ignore invalid keys, do nothing if no key is pressed

  if (!map[key]) return;

  const next = map[key];
  // Prevent reversing direction directly
  const opposite = { up: 'down', down: 'up', left: 'right', right: 'left' };
  const tryingToReverse = opposite[next] === state.direction;

  if (tryingToReverse && state.snake.length > 1) {
    return;
  }
  // set new direction
  state.direction = next;
}

// Moves the snake in the current direction; calls onEat callback if food is eaten
export function moveSnake(onEat) {
  const currentHead = state.snake[0];

  const newHead = { x: currentHead.x, y: currentHead.y };

  switch (state.direction) {
    case 'up':
      newHead.y -= 1;
      break;
    case 'down':
      newHead.y += 1;
      break;
    case 'left':
      newHead.x -= 1;
      break;
    case 'right':
      newHead.x += 1;
      break;
    default:
      break;
  }

  // console.log('moveSnake: newHead', newHead, 'food', state.food);

  state.snake.unshift(newHead);

  const ateFood = state.food && newHead.x === state.food.x && newHead.y === state.food.y;
  if (ateFood) {
    if (typeof onEat === 'function') onEat();
  } else {
    state.snake.pop();
  }
}

export function increaseSpeed() {
  // increase speed by decreasing the interval time
  const d = state.gameSpeedMs;
  if (d > 150) {
    state.gameSpeedMs = d - 5;
  } else if (d > 100) {
    state.gameSpeedMs = d - 3;
  } else if (d > 50) {
    state.gameSpeedMs = d - 2;
  } else if (d > 25) {
    state.gameSpeedMs = d - 1;
  }
}

export function hitSelfOrWall() {
  const head = state.snake[0];
  const max = state.gridSize;
  // Check wall collisions
  if (head.x < 1 || head.x >= max + 1 || head.y < 1 || head.y >= max + 1) {
    return true;
  }
  // Check self collisions
  for (let i = 1; i < state.snake.length; i++) {
    const segment = state.snake[i];
    if (head.x === segment.x && head.y === segment.y) {
      return true;
    }
  }
  return false;
}
