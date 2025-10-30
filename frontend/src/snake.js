import { state } from './state';

// Sets the snake's direction based on keyboard input
export function setDirectionByKey(key) {
  const map = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  };
  if (!map[key]) return;

  const next = map[key];
  // Prevent reversing direction directly
  const opposite = { up: 'down', down: 'up', left: 'right', right: 'left' };
  const tryingToReverse = opposite[next] === state.direction;

  if (tryingToReverse && state.snake.length > 1) {
    return;
  }

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

  const ateFood = state.food && newHead.x === state.food.x && newHead.y === state.food.y;
  if (ateFood) {
    if (typeof onEat === 'function') {
      onEat();
    } else {
      state.snake.pop();
    }
  }

  state.snake.unshift(newHead);
}
