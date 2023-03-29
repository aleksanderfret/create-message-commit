import { CreateScopeOrTicketFn } from './types.js';

export const createScopeOrTicket: CreateScopeOrTicketFn = (
  config,
  parsedScopeOrTicket
) => {
  const { globalScope, ticketKey, ticketSeparator } = config;

  const hasBreakingChange = parsedScopeOrTicket.endsWith('!');

  if (globalScope) {
    return `(${globalScope})${hasBreakingChange ? '!' : ''}`;
  }

  if (!ticketKey) {
    return '';
  }

  let newScopeOrTicket = '';

  if (!ticketSeparator) {
    if (parsedScopeOrTicket !== ticketKey) {
      throw new Error(
        `Invalid ticket name: ${parsedScopeOrTicket} doesn't match ${ticketKey}`
      );
    }

    newScopeOrTicket = parsedScopeOrTicket;
  }

  const [parsedTickeKey, parsedTicketNumber] =
    parsedScopeOrTicket.split(ticketSeparator);

  if (parsedTickeKey !== ticketKey) {
    throw new Error(
      `Invalid ticket name: ${parsedTickeKey} doesn't match ${ticketKey}`
    );
  }

  newScopeOrTicket = `${parsedTickeKey.toLowerCase()}${ticketSeparator}${parsedTicketNumber}`;

  const finalTicket = hasBreakingChange
    ? newScopeOrTicket.slice(0, -1)
    : newScopeOrTicket;

  return `(${finalTicket})${hasBreakingChange ? '!' : ''}`;
};
