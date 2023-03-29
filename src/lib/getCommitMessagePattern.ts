import { GetCommitPatternFn } from './types.js';

export const getCommitMessagePattern: GetCommitPatternFn = config => {
  const { commitMessagePattern } = config;

  const start = commitMessagePattern.startsWith('^') ? 1 : 0;
  const end = commitMessagePattern.endsWith('$')
    ? commitMessagePattern.length - start - 1
    : commitMessagePattern.length - start;

  return commitMessagePattern.substring(start, end);
};
