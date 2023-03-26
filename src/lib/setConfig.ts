import { Config, defaultConfig } from './config.js';
import { filterConfig } from './filterConfig.js';

export const setConfig = (customConfig: Partial<Config> = {}) => {
  const config = { ...defaultConfig, ...filterConfig(customConfig) };

  const branches = `^(${config.skipBranches.join('|')}){1}$`;

  const change = `(${config.changeType.join('|')}){1}${config.branchSeparator}`;

  let scopeOrTicket = '';

  if (config.scope) {
    scopeOrTicket = `${config.scope}${config.branchSeparator}`;
  } else if (config.ticketKey) {
    scopeOrTicket = `${config.ticketKey}${config.ticketSeparator}[0-9]{${
      config.ticketNumberMinLength
    },${config.ticketNumberMaxLength ? config.ticketNumberMaxLength : ''}}!?${
      config.branchSeparator
    }`;
  }

  const description = `${config.branchDescriptionChars}{${config.branchMinLength},${config.branchMaxLength}}`;

  const pattern = `${branches}|^(${change}${scopeOrTicket}${description})$`;

  config.branchNamePattern = pattern;
  config.branchNameFeedback =
    config.branchNameFeedback ||
    `Branch name should follow the pattern: '${pattern}'`;

  return config;
};
