export type ChangeType =
  | 'build'
  | 'fix'
  | 'feat'
  | 'chore'
  | 'ci'
  | 'docs'
  | 'perf'
  | 'refactor'
  | 'style'
  | 'test';

export type SkipBranches =
  | 'master'
  | 'main'
  | 'dev'
  | 'develop'
  | 'test'
  | '(no branch)';

export interface Config<T = ChangeType, K = SkipBranches> {
  branchMaxLength: number;
  branchMinLength: number;
  branchNameChars: string;
  branchNameFeedback: string;
  branchNamePattern: string;
  branchSeparator: string;
  changeType: T[];
  skipBranches: K[];
  ticketNumberMaxLength: number;
  ticketNumberMinLength: number;
  ticketPrefix: string;
  ticketSeparator: string;
}

export interface GitConventionalNames {
  gitConventionalNames: Config;
}

export const configName = 'createCommitMessage';
const ticketPrefix = 'ticket';
const ticketSeparator = '-';
const ticketNumberMinLength = 1;
const ticketNumberMaxLength = 0;
const branchMinLength = 4;
const branchMaxLength = 92;
const skipBranches: SkipBranches[] = ['master', 'main', 'dev', 'test'];
const branchSeparator = '/';
const branchNameChars = '[a-z0-9_-]';
const changeType: ChangeType[] = [
  'build',
  'fix',
  'feat',
  'chore',
  'ci',
  'docs',
  'perf',
  'refactor',
  'style',
  'test',
];
const pattern = `^(${skipBranches.join('|')}){1}$|^((${changeType.join(
  '|'
)}){1}${branchSeparator}${ticketPrefix}${ticketSeparator}[0-9]${ticketNumberMinLength},${
  ticketNumberMaxLength ? '' : ticketNumberMaxLength
}}!?${branchSeparator}${branchNameChars}{${branchMinLength},${branchMaxLength}})$`;

export const defaultConfig: Config = {
  branchMaxLength,
  branchMinLength,
  branchNameChars,
  branchNameFeedback: `Branch name should follow the pattern: '${pattern}'`,
  branchNamePattern: pattern,
  branchSeparator,
  changeType,
  skipBranches: [...skipBranches, '(no branch)'],
  ticketNumberMaxLength,
  ticketNumberMinLength,
  ticketPrefix,
  ticketSeparator,
};
