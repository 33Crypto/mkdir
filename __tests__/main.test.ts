jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  setFailed: jest.fn()
}));

jest.mock('@actions/io', () => ({
  mkdirP: jest.fn()
}));

const core = require('@actions/core');
const io = require('@actions/io');
const {run} = require('../src/main');

describe('mkdir action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    core.getInput.mockReturnValue('LOCK33');
  });

  it('creates the requested directory', async () => {
    await run();

    expect(core.getInput).toHaveBeenCalledWith('directory', {required: true});
    expect(io.mkdirP).toHaveBeenCalledWith('LOCK33');
    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('reports directory creation errors', async () => {
    io.mkdirP.mockRejectedValue(new Error('creation failed'));

    await run();

    expect(core.setFailed).toHaveBeenCalledWith('creation failed');
  });
});
