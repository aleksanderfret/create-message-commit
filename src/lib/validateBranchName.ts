import { getConfig } from './getConfig.js';
import { getActiveBranchName } from './getActiveBranchName.js';
import { logError, logSuccess } from './logger.js';

type ValidateBranchNameFn = (
  fileName: Parameters<typeof getConfig>[0]
) => Promise<void>;

export const validateBranchName: ValidateBranchNameFn = async fileName => {
  const config = getConfig(fileName);

  if (config) {
    try {
      const { branchNamePattern, branchNameFeedback } = config;
      const branchName = await getActiveBranchName();

      if (branchName.includes('no branch')) {
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
