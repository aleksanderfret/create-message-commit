import { getConfig } from './getConfig.js';
import { getActiveBranchName } from './getActiveBranchName.js';
import { logError, logSuccess } from './logger.js';
import { ValidateBranchNameFn } from './types.js';
import { isOneOfBranches } from './isOneOfBranches.js';

export const validateBranchName: ValidateBranchNameFn =
  async configFileName => {
    const config = getConfig(configFileName);

    if (config) {
      try {
        const { branchNamePattern, branchNameFeedback, branchesToSkip } =
          config;
        const branchName = await getActiveBranchName();

        if (isOneOfBranches(branchName, branchesToSkip)) {
          return;
        }

        const branchPattern = new RegExp(branchNamePattern, 'g');

        const match = branchPattern.test(branchName);

        if (match) {
          logSuccess(
            'Result: "passed"',
            `Branch Name: "${branchName}`,
            `Pattern: "${branchPattern.toString()}"`
          );
          process.exitCode = 0;
        } else {
          logError(
            'Result: "failed"',
            `Error Msg: "${branchNameFeedback}"`,
            `Branch Name: "${branchName}"`,
            `Pattern: "${branchPattern.toString()}"`
          );
          process.exit(1);
        }
      } catch (error) {
        const { message: errorMessage } = (error || {}) as Error;

        logError(
          'Result: "Not able to check active branch"',
          `Error Msg: "${errorMessage || error}"`
        );
      }
    }
  };

export default validateBranchName;
