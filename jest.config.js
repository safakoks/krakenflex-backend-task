export default {
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  testEnvironment: 'node',
  verbose: true,
  setupFiles: [
    '<rootDir>/__tests__/testEnvVariables.js',
  ],
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
};
