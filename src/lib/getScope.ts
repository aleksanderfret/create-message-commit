import { GetScopeFn } from './types.js';

const getScope: GetScopeFn = (config, isCommitMsg = false) => {
  let scopeOrTicket = '';

  if (config.globalScope) {
    scopeOrTicket = `${config.globalScope}${config.branchSeparator}`;
  } else if (config.ticketKey) {
    scopeOrTicket = `${config.ticketKey}${config.ticketSeparator}[0-9]{${
      config.ticketNumberMinLength
    },${config.ticketNumberMaxLength ? config.ticketNumberMaxLength : ''}}!?${
      config.branchSeparator
    }`;
  }

  return isCommitMsg ? `(${scopeOrTicket})` : scopeOrTicket;
};

export default getScope;
