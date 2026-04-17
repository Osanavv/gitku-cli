const { spawnSync } = require('child_process');

function git(...args) {
  const result = spawnSync('git', args.flat(), { stdio: ['inherit', 'pipe', 'pipe'] });
  const stdout = result.stdout ? result.stdout.toString() : '';
  const stderr = result.stderr ? result.stderr.toString() : '';

  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);

  if (result.status !== 0) {
    const err = new Error();
    err.stderr = stderr + stdout;
    throw err;
  }

  return stdout;
}

function gitOut(...args) {
  const result = spawnSync('git', args.flat());
  if (result.status !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
}

function currentBranch() {
  try { return gitOut('branch', '--show-current') || 'main'; } catch (_) { return 'main'; }
}

function remoteExists(name) {
  return spawnSync('git', ['remote']).stdout.toString().trim().split('\n').includes(name);
}

function validateBranchName(name) {
  if (!name || name.trim() === '') return 'Branch name cannot be empty.';
  if (/\s/.test(name)) return 'Branch name cannot contain spaces.';
  if (!/^[a-zA-Z0-9._\-\/]+$/.test(name)) return 'Branch name can only contain letters, numbers, dots, dashes, or slashes.';
  if (name.startsWith('.') || name.endsWith('.')) return 'Branch name cannot start or end with a dot.';
  if (name.includes('..')) return 'Branch name cannot contain "..".';
  return null;
}

function hasStagedFiles() {
  try {
    const out = gitOut('diff', '--cached', '--name-only');
    return out.trim().length > 0;
  } catch (_) {
    return false;
  }
}

module.exports = { git, gitOut, currentBranch, remoteExists, validateBranchName, hasStagedFiles };