import { Entries, EntriesFn } from './types.js';

export const entries: EntriesFn = <T extends {}>(obj: T) =>
  Object.entries(obj) as Entries<T>;
