import { Config, GitConventionalNames } from './config.js';
import { readJSON } from './readJSON.js';
import { setConfig } from './setConfig.js';

export type GetConfigFn = (configFileName?: string | null) => Config;

export const getConfig: GetConfigFn = configFileName => {
  if (!configFileName) {
    console.info(
      '\x1b[33m Custom config file was not provided. Using defualt config... \x1b[0m'
    );

    //TODO check by default in package.json file for config

    return setConfig();
  }

  try {
    const { cwd } = process;
    const root = cwd();

    const parsedConfig = readJSON<GitConventionalNames>(`${root}/package.json`);

    if (!parsedConfig) {
      throw new Error(`Config file: "${configFileName}" was not found.`);
    }

    const { gitConventionalNames } = parsedConfig;

    if (!gitConventionalNames) {
      throw new Error(`Config was not found in "${configFileName}".`);
    }

    return setConfig(gitConventionalNames);
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
