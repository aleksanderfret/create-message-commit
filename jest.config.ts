import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts', '!src/__tests__/*.*'],
  coverageDirectory: 'coverage',
  displayName: 'create-commit-message',
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/__tests__'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;
