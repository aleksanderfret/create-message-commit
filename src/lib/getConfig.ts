import { logError, logInfo } from './logger.js';
import { readJSON } from './readJSON.js';
import { setConfig } from './setConfig.js';
import { GetConfigFn, GitNames } from './types.js';

export const getConfig: GetConfigFn = configFileName => {
  try {
    const { cwd } = process;
    const root = cwd();

    if (!configFileName) {
      const parsedConfig = readJSON<GitNames>(`${root}/package.json`);

      const { gitNames } = parsedConfig || {};

      if (!gitNames) {
        logInfo(
          'Custom config file was not provided. The defaultone will be used...'
        );

        return setConfig();
      }

      logInfo(`Reading config from "${root}/package.json"`);

      return setConfig(gitNames);
    }

    logInfo(`Reading config from "${root}/${configFileName}"`);

    const parsedConfig = readJSON<GitNames>(`${root}/${configFileName}`);

    if (!parsedConfig) {
      throw new Error(`Config file: "${configFileName}" was not found.`);
    }

    const { gitNames } = parsedConfig;

    if (!gitNames) {
      throw new Error(`Config was not found in "${configFileName}".`);
    }

    return setConfig(gitNames);
  } catch (e) {
    const { message: errorMessage } = (e || {}) as Error;
    logError('Result: "Config not found"', `Error Msg: ${errorMessage || e}`);

    process.exit(1);
  }
};
