import { drawFrame } from './render';
import { generateFood } from './food';

function initialize() {
  drawFrame();
  generateFood();
}

window.addEventListener('DOMContentLoaded', () => {
  initialize();
});
