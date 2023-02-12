import fs from 'fs';

import { defaultConfig } from './config';
import { GitMesssageConfig } from './types';

const getConfig = (configName?: string): GitMesssageConfig => {
  if (!configName) {
    console.info(
      '\x1b[33m Custom config name was not provided. Using defualt config... \x1b[0m'
    );
  }

  const { cwd } = process;
  const root = cwd();

  if (configName) {
    try {
      const configFile = fs.readFileSync(`${root}/packag.json`, 'utf8');

      const parsedConfigFile = configFile ? JSON.parse(configFile) : null;
      const scriptConfig = parsedConfigFile[configName];

      if (!scriptConfig) {
        throw new Error(`Config "${configName}" was not provided.`);
      }

      return scriptConfig as GitMesssageConfig;
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

export default getConfig;
