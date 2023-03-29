import { getCommitMessagePattern } from './getCommitMessagePattern.js';
import getScope from './getScope.js';
import { CommitMessageBuilderFn } from './types.js';

export const buildCommitMessagePattern: CommitMessageBuilderFn = config => {
  const change = `(${config.changeType.join('|')}){1}${config.branchSeparator}`;

  const scopeOrTicket = getScope(config, true);

  const msgPattern = getCommitMessagePattern(config);

  return scopeOrTicket && change
    ? `^(${change}${
        scopeOrTicket ? `(${scopeOrTicket})` : ''
      }!?: ${msgPattern})$`
    : '';
};
