import {
  Config,
  defaultConfig,
  GitConventionalNames,
} from 'src/config/index.js';
import { readJSON } from './readJSON.js';

export type GetConfigFn = (configFileName?: string | null) => Config;

export const getConfig: GetConfigFn = configFileName => {
  if (!configFileName) {
    console.info(
      '\x1b[33m Custom config was not provided. Using defualt config... \x1b[0m'
    );
  }

  const { cwd } = process;
  const root = cwd();

  if (configFileName) {
    try {
      const parsedConfig = readJSON<GitConventionalNames>(
        `${root}/package.json`
      );

      if (!parsedConfig) {
        throw new Error(`Config "${configFileName}" was not found.`);
      }

      const { gitConventionalNames } = parsedConfig;

      if (!gitConventionalNames) {
        throw new Error('Config was not provided.');
      }

      return gitConventionalNames;
    } catch (e) {
      const { message: errorMessage } = (e || {}) as Error;
      console.error(
        '\x1b[31m%s\x1b[0m',
        'Result: "Config not found" \n' +
          `Error Msg: ${errorMessage || e} \x1b[0m \n\n`
      );

      process.exit(1);
    }
  } else {
    return defaultConfig;
  }
};
