import { setDirectionByKey, moveSnake, increaseSpeed, hitSelfOrWall } from './snake.js';
import { resetState, state } from './state.js';

describe('snake module', () => {
  beforeEach(() => {
    resetState();
  });

  describe('setDirectionByKey', () => {
    it('sets direction to up when ArrowUp is pressed', () => {
      state.direction = 'right';
      setDirectionByKey('ArrowUp');
      expect(state.direction).toBe('up');
    });

    it('sets direction to down when ArrowDown is pressed', () => {
      state.direction = 'right';
      setDirectionByKey('ArrowDown');
      expect(state.direction).toBe('down');
    });

    it('sets direction to left when ArrowLeft is pressed', () => {
      state.direction = 'right';
      setDirectionByKey('ArrowLeft');
      expect(state.direction).toBe('left');
    });

    it('sets direction to right when ArrowRight is pressed', () => {
      state.direction = 'up';
      setDirectionByKey('ArrowRight');
      expect(state.direction).toBe('right');
    });

    it('does nothing when an invalid key is pressed', () => {
      state.direction = 'right';
      setDirectionByKey('Enter');
      expect(state.direction).toBe('right');
    });

    it('does nothing when key is undefined', () => {
      state.direction = 'right';
      setDirectionByKey(undefined);
      expect(state.direction).toBe('right');
    });

    it('prevents reversing direction when snake length > 1', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
      setDirectionByKey('ArrowLeft');
      expect(state.direction).toBe('right');
    });

    it('allows reversing direction when snake length === 1', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }];
      setDirectionByKey('ArrowLeft');
      expect(state.direction).toBe('left');
    });

    it('prevents reversing from up to down when snake length > 1', () => {
      state.direction = 'up';
      state.snake = [{ x: 10, y: 10 }, { x: 10, y: 9 }];
      setDirectionByKey('ArrowDown');
      expect(state.direction).toBe('up');
    });

    it('allows changing to perpendicular directions', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
      setDirectionByKey('ArrowUp');
      expect(state.direction).toBe('up');
    });
  });

  describe('moveSnake', () => {
    it('moves snake up when direction is up', () => {
      state.direction = 'up';
      state.snake = [{ x: 10, y: 10 }];
      moveSnake();
      expect(state.snake[0]).toEqual({ x: 10, y: 9 });
    });

    it('moves snake down when direction is down', () => {
      state.direction = 'down';
      state.snake = [{ x: 10, y: 10 }];
      moveSnake();
      expect(state.snake[0]).toEqual({ x: 10, y: 11 });
    });

    it('moves snake left when direction is left', () => {
      state.direction = 'left';
      state.snake = [{ x: 10, y: 10 }];
      moveSnake();
      expect(state.snake[0]).toEqual({ x: 9, y: 10 });
    });

    it('moves snake right when direction is right', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }];
      moveSnake();
      expect(state.snake[0]).toEqual({ x: 11, y: 10 });
    });

    it('removes tail when food is not eaten', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
      state.food = null;
      moveSnake();
      expect(state.snake.length).toBe(2);
      expect(state.snake[0]).toEqual({ x: 11, y: 10 });
      expect(state.snake[1]).toEqual({ x: 10, y: 10 });
    });

    it('keeps tail when food is eaten', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
      state.food = { x: 11, y: 10 };
      const onEat = jest.fn();
      moveSnake(onEat);
      expect(state.snake.length).toBe(3);
      expect(state.snake[0]).toEqual({ x: 11, y: 10 });
      expect(onEat).toHaveBeenCalledTimes(1);
    });

    it('calls onEat callback when food is eaten', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }];
      state.food = { x: 11, y: 10 };
      const onEat = jest.fn();
      moveSnake(onEat);
      expect(onEat).toHaveBeenCalledTimes(1);
    });

    it('does not call onEat when no callback is provided and food is eaten', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }];
      state.food = { x: 11, y: 10 };
      expect(() => moveSnake()).not.toThrow();
    });

    it('does not call onEat when food is not eaten', () => {
      state.direction = 'right';
      state.snake = [{ x: 10, y: 10 }];
      state.food = { x: 5, y: 5 };
      const onEat = jest.fn();
      moveSnake(onEat);
      expect(onEat).not.toHaveBeenCalled();
    });

    it('does not move when direction is not set (default case)', () => {
      state.direction = '';
      state.snake = [{ x: 10, y: 10 }];
      moveSnake();
      expect(state.snake[0]).toEqual({ x: 10, y: 10 });
    });

    it('handles food at exact head position', () => {
      state.direction = 'up';
      state.snake = [{ x: 10, y: 10 }];
      state.food = { x: 10, y: 9 };
      const onEat = jest.fn();
      moveSnake(onEat);
      expect(onEat).toHaveBeenCalledTimes(1);
      expect(state.snake.length).toBe(2);
    });
  });

  describe('increaseSpeed', () => {
    it('decreases gameSpeedMs by 5 when speed is above 150', () => {
      state.gameSpeedMs = 200;
      increaseSpeed();
      expect(state.gameSpeedMs).toBe(195);
    });

    it('decreases gameSpeedMs by 3 when speed is between 100 and 150', () => {
      state.gameSpeedMs = 120;
      increaseSpeed();
      expect(state.gameSpeedMs).toBe(117);
    });

    it('decreases gameSpeedMs by 2 when speed is between 50 and 100', () => {
      state.gameSpeedMs = 75;
      increaseSpeed();
      expect(state.gameSpeedMs).toBe(73);
    });

    it('decreases gameSpeedMs by 1 when speed is between 25 and 50', () => {
      state.gameSpeedMs = 30;
      increaseSpeed();
      expect(state.gameSpeedMs).toBe(29);
    });

    it('does not decrease speed when speed is 25 or below', () => {
      state.gameSpeedMs = 25;
      increaseSpeed();
      expect(state.gameSpeedMs).toBe(25);
    });

    it('does not decrease speed when speed is below 25', () => {
      state.gameSpeedMs = 10;
      increaseSpeed();
      expect(state.gameSpeedMs).toBe(10);
    });
  });

  describe('hitSelfOrWall', () => {
    it('returns true when snake hits left wall', () => {
      state.snake = [{ x: 0, y: 10 }];
      expect(hitSelfOrWall()).toBe(true);
    });

    it('returns true when snake hits right wall', () => {
      state.snake = [{ x: 21, y: 10 }]; // gridSize is 20, so max+1 = 21
      expect(hitSelfOrWall()).toBe(true);
    });

    it('returns true when snake hits top wall', () => {
      state.snake = [{ x: 10, y: 0 }];
      expect(hitSelfOrWall()).toBe(true);
    });

    it('returns true when snake hits bottom wall', () => {
      state.snake = [{ x: 10, y: 21 }]; // gridSize is 20, so max+1 = 21
      expect(hitSelfOrWall()).toBe(true);
    });

    it('returns true when snake hits self', () => {
      state.snake = [
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 11, y: 11 },
        { x: 11, y: 10 },
        { x: 10, y: 10 }, // head collides with this segment
      ];
      expect(hitSelfOrWall()).toBe(true);
    });

    it('returns false when snake is within boundaries and not hitting self', () => {
      state.snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ];
      expect(hitSelfOrWall()).toBe(false);
    });

    it('returns false when snake is at minimum boundary (x=1, y=1)', () => {
      state.snake = [{ x: 1, y: 1 }];
      expect(hitSelfOrWall()).toBe(false);
    });

    it('returns false when snake is at maximum boundary (x=20, y=20)', () => {
      state.snake = [{ x: 20, y: 20 }];
      expect(hitSelfOrWall()).toBe(false);
    });

    it('returns true when snake is just beyond maximum boundary (x=21, y=20)', () => {
      state.snake = [{ x: 21, y: 20 }];
      expect(hitSelfOrWall()).toBe(true);
    });

    it('does not check head against itself (only checks segments 1+)', () => {
      state.snake = [{ x: 10, y: 10 }];
      expect(hitSelfOrWall()).toBe(false);
    });
  });
});
