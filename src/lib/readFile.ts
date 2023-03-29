import fs from 'fs';

import { ReadFileFn } from './types.js';

const { readFileSync } = fs;

export const readFile: ReadFileFn = path => readFileSync(path, 'utf8');
