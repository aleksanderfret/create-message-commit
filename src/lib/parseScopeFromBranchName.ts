import { ParseScopefromBranchFn } from './types.js';

export const parseScopeFromBranchName: ParseScopefromBranchFn = (
  name,
  separator
) => {
  const parts = name.split(separator);

  let parsedType = '';
  let parsedScope = '';

  if (parts.length === 3) {
    [parsedType, parsedScope] = parts;
  } else {
    [parsedType] = parts;
  }

  return [parsedType, parsedScope];
};
