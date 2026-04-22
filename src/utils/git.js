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

function gitTry(...args) {
  const result = spawnSync('git', args.flat());
  if (result.status !== 0) return null;
  return result.stdout.toString().trim();
}

function currentBranch() {
  try { return gitOut('branch', '--show-current') || 'main'; } catch (_) { return 'main'; }
}

function remoteExists(name) {
  return spawnSync('git', ['remote']).stdout.toString().trim().split('\n').includes(name);
}

function validateBranchName(name) {
  if (!name || name.trim() === '') return 'Nama branch tidak boleh kosong.';
  if (/\s/.test(name)) return 'Nama branch tidak boleh mengandung spasi.';
  if (!/^[a-zA-Z0-9._\-\/]+$/.test(name)) return 'Nama branch hanya boleh huruf, angka, titik, strip, atau slash.';
  if (name.startsWith('.') || name.endsWith('.')) return 'Nama branch tidak boleh diawali atau diakhiri titik.';
  if (name.includes('..')) return 'Nama branch tidak boleh mengandung ".."';
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

function isGitRepo() {
  const result = spawnSync('git', ['rev-parse', '--is-inside-work-tree']);
  return result.status === 0;
}

function getRecentCommits(n = 10) {
  try {
    const out = gitOut('log', `--pretty=format:%H|%s|%an|%ar`, `-${n}`);
    if (!out) return [];
    return out.split('\n').map(line => {
      const [hash, subject, author, time] = line.split('|');
      return { hash: hash?.slice(0, 7), subject, author, time };
    });
  } catch (_) {
    return [];
  }
}

function getStashList() {
  try {
    const out = gitOut('stash', 'list');
    if (!out) return [];
    return out.split('\n').filter(Boolean);
  } catch (_) {
    return [];
  }
}

module.exports = {
  git, gitOut, gitTry, currentBranch, remoteExists,
  validateBranchName, hasStagedFiles, isGitRepo,
  getRecentCommits, getStashList
};