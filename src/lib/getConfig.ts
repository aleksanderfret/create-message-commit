import { Config, GitNames } from './config.js';
import { readJSON } from './readJSON.js';
import { setConfig } from './setConfig.js';

export type GetConfigFn = (configFileName?: string | null) => Config;

export const getConfig: GetConfigFn = configFileName => {
  try {
    const { cwd } = process;
    const root = cwd();

    if (!configFileName) {
      const parsedConfig = readJSON<GitNames>(`${root}/package.json`);

      const { gitNames } = parsedConfig || {};

      if (!gitNames) {
        console.info(
          '\x1b[33m Custom config file was not provided. Using defualt config... \x1b[0m'
        );

        return setConfig();
      }

      return setConfig(gitNames);
    }

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
    console.error(
      '\x1b[31m%s\x1b[0m',
      'Result: "Config not found" \n' +
        `Error Msg: ${errorMessage || e} \x1b[0m \n\n`
    );

    process.exit(1);
  }
};
