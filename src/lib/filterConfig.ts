import { entries } from './entries.js';

const predicate = <T>(value: T[keyof T]): boolean =>
  value !== undefined && value !== null && value !== '';

export const filterConfig = <T extends {}>(object: T) =>
  entries(object).reduce(
    (acc, [key, value]) => (predicate(value) ? { ...acc, [key]: value } : acc),
    {} as Partial<T>
  );
