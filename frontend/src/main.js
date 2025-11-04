import { drawFrame } from './render.js';
import { generateFood } from './food.js';
import { bindInput } from './input.js';

// console.log('[main.js] script running');

function initialize() {
  // console.log('[main] initialize start');
  bindInput();
  generateFood();
  drawFrame();
  // console.log('[main] initialize done');
}

window.addEventListener('DOMContentLoaded', () => {
  // console.log('[main] DOMContentLoaded');
  initialize();
});
