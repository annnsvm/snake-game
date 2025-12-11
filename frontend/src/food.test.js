import { generateFood, drawFood } from './food.js';
import { resetState, state } from './state.js';
import { rand1to, createElement, setPosition } from './utils.js';

jest.mock('./utils.js', () => ({
  rand1to: jest.fn(),
  createElement: jest.fn(),
  setPosition: jest.fn(),
}));

describe('food module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetState();
  });

  describe('generateFood', () => {
    it('stores a random position inside the grid', () => {
      rand1to
        .mockReturnValueOnce(2) // x
        .mockReturnValueOnce(5); // y

      generateFood();

      expect(state.food).toEqual({ x: 2, y: 5 });
      expect(rand1to).toHaveBeenCalledTimes(2);
      expect(rand1to).toHaveBeenNthCalledWith(1, state.gridSize);
      expect(rand1to).toHaveBeenNthCalledWith(2, state.gridSize);
    });
  });

  describe('drawFood', () => {
    it('does nothing when the game has not started', () => {
      const board = document.createElement('div');

      drawFood(board);

      expect(createElement).not.toHaveBeenCalled();
      expect(board.childElementCount).toBe(0);
    });

    it('does nothing when there is no food to draw', () => {
      const board = document.createElement('div');
      state.gameStarted = true;

      drawFood(board);

      expect(createElement).not.toHaveBeenCalled();
      expect(board.childElementCount).toBe(0);
    });

    it('appends a positioned food element when the game is running', () => {
      const board = document.createElement('div');
      const mockedFoodElement = document.createElement('div');

      state.gameStarted = true;
      state.food = { x: 7, y: 3 };

      createElement.mockReturnValue(mockedFoodElement);

      drawFood(board);

      expect(createElement).toHaveBeenCalledWith('div', 'food');
      expect(setPosition).toHaveBeenCalledWith(mockedFoodElement, state.food);
      expect(board.childElementCount).toBe(1);
      expect(board.firstChild).toBe(mockedFoodElement);
    });
  });
});
