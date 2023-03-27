enum Logger {
  Info,
  Error,
  Warning,
  Success,
  Log,
}

enum Color {
  White,
  Black,
  Red,
  Yellow,
  Blue,
  Green,
}

const getFrontColor = (color: Color) => {
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

const getBackColor = (color: Color) => {
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
const resetColor = () => '\x1b[0m';

const getHeader = (type: Logger) => {
  switch (type) {
    case Logger.Info:
      return 'INFO';
    case Logger.Error:
      return 'ERROR';
    case Logger.Success:
      return 'SUCCESS';
    case Logger.Warning:
      return 'WARNING';
    default:
      return 'LOG';
  }
};

const getLog = (type: Logger) => {
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

const matchTypeToColor = (type: Logger): Color => {
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

const getColorSet = (isHeader: boolean) => (type: Logger) => {
  const color = matchTypeToColor(type);
  const fg = isHeader ? getFrontColor(Color.Black) : getFrontColor(color);
  const bg = isHeader ? getBackColor(color) : '';

  return `${fg}${bg}`;
};

const getHeaderColor = getColorSet(true);
const getLogColor = getColorSet(false);

const createLogger =
  (type: Logger) =>
  (message: string, ...strings: string[]) => {
    const { group, groupEnd } = console;
    const log = getLog(type);

    const headerColor = getHeaderColor(type);
    const logColor = getLogColor(type);

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
