import {
  Color,
  GetColorFn,
  GetColorSetFn,
  GetLogFn,
  GetLogHeaderFn,
  LogColorMatcherFn,
  Logger,
  LoggerFactoryFn,
  LoggerHeading,
  ResetColorFn,
} from './types.js';

const getFrontColor: GetColorFn = color => {
  switch (color) {
    case Color.White:
    default:
      return '\x1b[37m';
    case Color.Black:
      return '\x1b[30m';
    case Color.Red:
      return '\x1b[31m';
    case Color.Yellow:
      return '\x1b[33m';
    case Color.Blue:
      return '\x1b[34m';
    case Color.Green:
      return '\x1b[32m';
  }
};

const getBackColor: GetColorFn = color => {
  switch (color) {
    case Color.Black:
    default:
      return '\x1b[40m';
    case Color.White:
      return '\x1b[47m';
    case Color.Red:
      return '\x1b[41m';
    case Color.Yellow:
      return '\x1b[43m';
    case Color.Blue:
      return '\x1b[44m';
    case Color.Green:
      return '\x1b[42m';
  }
};

const resetColor: ResetColorFn = () => '\x1b[0m';

const getHeader: GetLogHeaderFn = type => {
  switch (type) {
    case Logger.Info:
      return LoggerHeading.Info;
    case Logger.Error:
      return LoggerHeading.Error;
    case Logger.Success:
      return LoggerHeading.Success;
    case Logger.Warning:
      return LoggerHeading.Warning;
    default:
      return LoggerHeading.Log;
  }
};

const getLog: GetLogFn = type => {
  const { error, info, log, warn } = console;

  switch (type) {
    case Logger.Info:
      return info;
    case Logger.Warning:
      return warn;
    case Logger.Error:
      return error;
    case Logger.Success:
    case Logger.Log:
    default:
      return log;
  }
};

const matchTypeToColor: LogColorMatcherFn = type => {
  switch (type) {
    case Logger.Info:
      return Color.Blue;
    case Logger.Error:
      return Color.Red;
    case Logger.Success:
      return Color.Green;
    case Logger.Warning:
      return Color.Yellow;
    default:
      return Color.White;
  }
};

const getColorSet: GetColorSetFn = (type, isHeader) => {
  const color = matchTypeToColor(type);
  const fg = isHeader ? getFrontColor(Color.Black) : getFrontColor(color);
  const bg = isHeader ? getBackColor(color) : '';

  return `${fg}${bg}`;
};

const createLogger: LoggerFactoryFn =
  type =>
  (message, ...strings) => {
    const { group, groupEnd } = console;
    const log = getLog(type);

    const headerColor = getColorSet(type, true);
    const logColor = getColorSet(type, false);

    log(headerColor, getHeader(type), resetColor());

    if (strings.length) {
      group(logColor, message);
    } else {
      log(logColor, message);
    }

    if (strings.length) {
      strings.forEach(string => {
        log(logColor, string);
      });
    }

    groupEnd();
    resetColor();
    log('\n', resetColor());
  };

export const logSuccess = createLogger(Logger.Success);
export const logError = createLogger(Logger.Error);
export const logWarning = createLogger(Logger.Warning);
export const logInfo = createLogger(Logger.Info);
