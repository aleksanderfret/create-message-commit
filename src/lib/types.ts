import fs from 'fs';

const { readFileSync } = fs;

export enum Logger {
  Info,
  Error,
  Warning,
  Success,
  Log,
}

export enum Color {
  White,
  Black,
  Red,
  Yellow,
  Blue,
  Green,
}

export enum LoggerHeading {
  Info = 'INFO',
  Error = 'ERROR',
  Success = 'SUCCESS',
  Warning = 'WARNING',
  Log = 'LOG',
}
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

export type MainBranches = 'master' | 'main' | 'dev' | 'develop' | 'test';

export type branchesToSkip = 'no branch' | '(no branch)';

export enum ConfigFile {
  PackageJSON = 'package.json',
  GitNames = 'git-names.json',
}

export interface Config<T = ChangeType, K = branchesToSkip, N = MainBranches> {
  branchMaxLength: number;
  branchMinLength: number;
  branchDescriptionChars: string;
  branchNameFeedback: string;
  branchNamePattern: string;
  branchSeparator: string;
  commitMessagePattern: string;
  changeType: T[];
  configFile: ConfigFile;
  mainBranches: (string | N)[];
  globalScope: string;
  branchesToSkip: (string | K)[];
  ticketNumberMaxLength: number;
  ticketNumberMinLength: number;
  ticketKey: string;
  ticketSeparator: string;
}

export interface GitNames {
  gitNames: Partial<Config>;
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type EntriesFn = <T extends {}>(obj: T) => Entries<T>;

export type CommitMessageBuilderFn = (confg: Config) => string;

export type GetActiveBranchNameFn = () => Promise<string>;

export type GetConfigFn = (configFileName?: string | null) => Config;

export type ParseGitParamFn = (args: string[]) => string | undefined;

export type GetCommitPatternFn = (config: Config) => string;

export type GetScopeFn = (config: Config, isCommitMsg?: boolean) => string;

export type GetColorFn = (config: Color) => string;

export type ResetColorFn = () => string;

export type GetLogHeaderFn = (type: Logger) => LoggerHeading;

export type GetLogFn = (type: Logger) => typeof console.log;

export type LogColorMatcherFn = (type: Logger) => Color;

export type GetColorSetFn = (type: Logger, isheader: boolean) => string;

export type LoggerFn = (message: string, ...strings: any[]) => void;

export type LoggerFactoryFn = (type: Logger) => LoggerFn;

export type ReadFileParams = Parameters<typeof readFileSync>;

export type ReadFileFn = (path: ReadFileParams[0]) => string;

export type IsOneOfBranchesFn = (
  branchName: string,
  branchNames: string[]
) => boolean;

export type ValidateBranchNameFn = (
  configFileName?: string | null
) => Promise<void>;

export type PrepareCommitMessageFn = (
  configName?: string | null,
  gitMesasgeFile?: string
) => Promise<void>;

export type ParseScopefromBranchFn = (
  branchName: string,
  separator: string
) => [string, string];

export type CreateScopeOrTicketFn = (config: Config, scope: string) => string;
