import getConfig from './getConfig';

const { argv } = process;

const cliArguments = argv.slice(2);
const [configName] = cliArguments;

const a = getConfig(configName);

console.log(a);
