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

export interface GitMesssageConfig<T = ChangeType, K = SkipBranches> {
  branchFeedback?: string;
  branchMaxLength?: number;
  branchMinLength?: number;
  branchNameChars?: string;
  branchNameFeedback?: string;
  branchNamePattern?: string;
  branchSeparator?: string;
  changeType?: T[];
  skipBranches?: K[];
  ticketNumberMaxLength?: number;
  ticketNumberMinLength?: number;
  ticketPrefix?: string;
  ticketSeparator?: string;
}
