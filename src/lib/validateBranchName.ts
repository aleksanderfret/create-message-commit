/* eslint-disable no-console */
import { getConfig } from './getConfig.js';
import { getActiveBranchName } from './getActiveBranchName.js';

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
        console.info(
          '\x1b[32m%s\x1b[0m',
          'Result: "passed"\n' +
            `Branch Name: "${branchName}" \n` +
            `Pattern:"${branchPattern.toString()}" \n`
        );
        process.exitCode = 0;
      } else {
        console.error(
          '\x1b[31m%s\x1b[0m',
          'Result: "failed" \n' +
            `Error Msg: ${branchNameFeedback} \n` +
            `Branch Name: "${branchName}" \n` +
            `Pattern:"${branchPattern.toString()}" \n`
        );
        process.exit(1);
      }
    } catch (error) {
      const { message: errorMessage } = (error || {}) as Error;

      console.error(
        '\x1b[31m%s\x1b[0m',
        'Result: "Not able to check active branch" \n' +
          `Error Msg: ${errorMessage || error} \x1b[0m \n\n`
      );
    }
  }
};

export default validateBranchName;
