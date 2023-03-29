import { ParseGitParamFn } from './types.js';

export const getGitMessageFileName: ParseGitParamFn = args =>
  args.find(a => /COMMIT_EDITMSG/g.test(a));
