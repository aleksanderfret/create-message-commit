import { exec as childProcessExec } from 'child_process';
import util from 'util';

import { logError } from './logger.js';
import { GetActiveBranchNameFn } from './types.js';

const exec = util.promisify(childProcessExec);

export const getActiveBranchName: GetActiveBranchNameFn = async () => {
  try {
    const { stderr, stdout: branches } = await exec('git branch');

    if (stderr) {
      throw new Error(stderr);
    }

    const branchName =
      branches
        .split('\n')
        .find((branch: string) => branch.trim().charAt(0) === '*') || '';

    return branchName.trim().substring(2);
  } catch (error) {
    const { message: errorMessage } = (error || {}) as Error;
    logError(
      'Getting branch name failed.',
      `Error Msg: ${errorMessage || error}`
    );

    process.exit(1);
  }
};
