import fs from 'fs';

const { readFileSync } = fs;

export type ReadFileParams = Parameters<typeof readFileSync>;
export type ReadFileFn = (path: ReadFileParams[0]) => string;

export const readFile: ReadFileFn = path => readFileSync(path, 'utf8');
