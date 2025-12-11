module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.js'],
  injectGlobals: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    './src/food.js': {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};
