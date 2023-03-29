import { defaultConfig } from './config.js';
import { filterConfig } from './filterConfig.js';
import getScope from './getScope.js';
import { Config } from './types.js';

export const setConfig = (customConfig: Partial<Config> = {}) => {
  const filteredConfig = filterConfig(customConfig);
  const { branchesToSkip = [], ...rest } = filteredConfig;
  const config = { ...defaultConfig, ...rest };

  const branches = `^(${config.mainBranches.join('|')}){1}$`;

  const change = `(${config.changeType.join('|')}){1}${config.branchSeparator}`;
  const description = `${config.branchDescriptionChars}{${config.branchMinLength},${config.branchMaxLength}}`;

  const pattern = `${branches}|^(${change}${getScope(config)}${description})$`;

  config.branchesToSkip = [
    ...new Set(defaultConfig.branchesToSkip.concat(branchesToSkip)),
  ];
  config.branchNamePattern = pattern;
  config.branchNameFeedback =
    config.branchNameFeedback ||
    `Branch name should follow the pattern: '${pattern}'`;

  return config;
};
