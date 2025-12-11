if (typeof global.structuredClone !== 'function') {
  const { structuredClone } = require('util');
  const fallbackClone = (value) => JSON.parse(JSON.stringify(value));
  global.structuredClone = structuredClone || fallbackClone;
}
