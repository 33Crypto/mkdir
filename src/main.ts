const core = require('@actions/core');
const io = require('@actions/io');

export async function run() {
  try {
    const directory = core.getInput('directory', {required: true});
    await io.mkdirP(directory);
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (require.main === module) {
  run();
}
