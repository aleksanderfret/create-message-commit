import fs from 'fs';

const {
  existsSync,
  promises: { rm },
} = fs;

const paths = process.argv.slice(2);
const { cwd } = process;

if (!paths.length) {
  throw new Error("paths wasn't specified");
}

const removeDistDirectory = async (dir: string) => {
  const path = `${cwd()}/${dir}`;
  try {
    if (existsSync(path)) {
      await rm(path, { recursive: true });
    }
  } catch (error) {
    console.error(error);
  }
};

Promise.all(paths.map(path => removeDistDirectory(path)));
