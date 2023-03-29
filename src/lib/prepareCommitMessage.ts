import fs from 'fs';

import { getActiveBranchName } from './getActiveBranchName.js';
import { buildCommitMessagePattern } from './buildCommitMessagePattern.js';
import { getConfig } from './getConfig.js';
import { logError, logInfo, logSuccess } from './logger.js';
import { isOneOfBranches } from './isOneOfBranches.js';
import { PrepareCommitMessageFn } from './types.js';
import { parseScopeFromBranchName } from './parseScopeFromBranchName.js';
import { createScopeOrTicket } from './createScopeOrTicket.js';

export const prepareCommitMessage: PrepareCommitMessageFn = async (
  configFileName,
  messageFile
) => {
  try {
    if (!messageFile) {
      throw new Error('Unable to find message file.');
    }

    const message = fs.readFileSync(messageFile, 'utf8').trim();

    if (!message) {
      throw new Error('Unable to read message file.');
    }
    const config = getConfig(configFileName);

    //TODO parse scope from the commit message not from global config
    // and use it if no ticket or global scope provided
    const {
      branchesToSkip,
      commitMessagePattern,
      mainBranches,
      branchSeparator,
      branchNamePattern,
    } = config;

    const commitpattern = buildCommitMessagePattern(config);

    const commitRegExp = commitpattern ? new RegExp(commitpattern, 'g') : null;

    if (commitRegExp && commitRegExp.test(message)) {
      logInfo(
        'Result: "passed"',
        'Current commit message already match the pattern.',
        message
      );

      return;
    }

    //TODO provide option to create a message without branch
    // pattern and branch validation only base on config,
    const branchName = await getActiveBranchName();

    if (isOneOfBranches(branchName, branchesToSkip)) {
      return;
    }

    if (isOneOfBranches(branchName, mainBranches)) {
      // TODO if commiting directly to main branches is allowed
      // validate if match default pattern without scope/ticket
    }

    const branchPattern = new RegExp(branchNamePattern, 'g');

    const match = branchPattern.test(branchName);

    if (!match) {
      throw new Error(
        `Branch name ${branchName} doesn't follow the pattern ${branchNamePattern}`
      );
    }

    const [parsedType, parsedScope] = parseScopeFromBranchName(
      branchName,
      branchSeparator
    );

    const newScopeOrTicket = createScopeOrTicket(config, parsedScope);

    const messagePrefix = `${parsedType.toLowerCase()}${newScopeOrTicket}`;

    const messageRegExp = new RegExp(commitMessagePattern, 'g');

    if (!messageRegExp.test(message)) {
      throw new Error(
        `Commit message: ${message} does not follow the patter: ${commitMessagePattern}`
      );
    }

    const newMessage = `${messagePrefix}: ${message}`;

    fs.writeFileSync(messageFile, newMessage);

    logSuccess(
      'Result: "created"',
      `Commit Name: "${newMessage}"`,
      `Pattern:"${commitpattern.toString()}"`
    );
  } catch (error) {
    const { message: errorMessage } = (error || {}) as Error;
    logError('Result: "failed"', `Error Msg: ${errorMessage || error}`);
    process.exit(1);
  }
};
