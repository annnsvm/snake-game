// Generates a random integer between 1 and n (inclusive)
export const rand1to = (n) => Math.floor(Math.random() * n) + 1;

export function createElement(tag, className) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
}

export function setPosition(element, position) {
  element.setProperty('grid-column', position.x);
  element.setProperty('grid-row', position.y);
}

// Pads a number to at least 3 digits with leading zeros
export const pad3 = (n) => String(n).padStart(3, '0');
