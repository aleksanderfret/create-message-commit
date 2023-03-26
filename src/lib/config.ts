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
  branchDescriptionChars: string;
  branchNameFeedback: string;
  branchNamePattern: string;
  branchSeparator: string;
  changeType: T[];
  scope: string;
  skipBranches: K[];
  ticketNumberMaxLength: number;
  ticketNumberMinLength: number;
  ticketKey: string;
  ticketSeparator: string;
}

export interface GitNames {
  gitNames: Partial<Config>;
}

export const configName = 'createCommitMessage';
const ticketKey = 'ticket';
const scope = '';
const ticketSeparator = '-';
const ticketNumberMinLength = 1;
const ticketNumberMaxLength = 0;
const branchMinLength = 4;
const branchMaxLength = 92;
const skipBranches: SkipBranches[] = ['master', 'main', 'dev', 'test'];
const branchSeparator = '/';
const branchDescriptionChars = '[a-z0-9_-]';
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
  branchDescriptionChars,
  branchMaxLength,
  branchMinLength,
  branchNameFeedback: '',
  branchNamePattern: '',
  branchSeparator,
  changeType,
  scope,
  skipBranches: [...skipBranches, '(no branch)'],
  ticketKey,
  ticketNumberMaxLength,
  ticketNumberMinLength,
  ticketSeparator,
};
