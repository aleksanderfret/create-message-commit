import { exec as childProcessExec } from 'child_process';
import util from 'util';

const exec = util.promisify(childProcessExec);

export type GetActiveBranchNameFn = () => Promise<string>;

export const getActiveBranchName: GetActiveBranchNameFn = async () => {
  const { stderr, stdout: branches } = await exec('git branch');

  if (stderr) {
    throw new Error(stderr);
  }

  const branchName =
    branches
      .split('\n')
      .find((branch: string) => branch.trim().charAt(0) === '*') || '';

  return branchName.trim().substring(2);
};
