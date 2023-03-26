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
  gitConventionalNames: Partial<Config>;
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

export const defaultConfig: Config = {
  branchMaxLength,
  branchMinLength,
  branchNameChars,
  branchNameFeedback: '',
  branchNamePattern: '',
  branchSeparator,
  changeType,
  skipBranches: [...skipBranches, '(no branch)'],
  ticketNumberMaxLength,
  ticketNumberMinLength,
  ticketPrefix,
  ticketSeparator,
};
