import { IsOneOfBranchesFn } from './types.js';

export const isOneOfBranches: IsOneOfBranchesFn = (branchName, branchNames) =>
  branchNames.some(branch => branchName.includes(branch));
