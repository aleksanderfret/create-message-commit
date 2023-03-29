import { readFile } from './readFile.js';
import { ReadFileParams } from './types.js';

export const readJSON = <T>(path: ReadFileParams[0]): T | null => {
  const file = readFile(path);

  return file ? (JSON.parse(file) as T) : null;
};

export type ReadJSONFn = typeof readJSON;
