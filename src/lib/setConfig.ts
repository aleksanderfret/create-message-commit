import { Config, defaultConfig } from './config.js';
import { filterConfig } from './filterConfig.js';

export const setConfig = (customConfig: Partial<Config> = {}) => {
  const config = { ...defaultConfig, ...filterConfig(customConfig) };

  const branches = `^(${config.skipBranches.join('|')}){1}$`;

  const change = `(${config.changeType.join('|')}){1}${config.branchSeparator}`;

  const ticket = `${config.ticketPrefix}${config.ticketSeparator}[0-9]{${
    config.ticketNumberMinLength
  },${config.ticketNumberMaxLength ? config.ticketNumberMaxLength : ''}}!?${
    config.branchSeparator
  }`;

  const name = `${config.branchNameChars}{${config.branchMinLength},${config.branchMaxLength}}`;

  const pattern = `${branches}|^(${change}${ticket}${name})$`;

  config.branchNamePattern = pattern;
  config.branchNameFeedback = `Branch name should follow the pattern: '${pattern}'`;

  return config;
};
