const { spawnSync } = require('child_process');
const { colorize, colors } = require('../utils/colors');

function gitOut(...args) {
  const result = spawnSync('git', args.flat());
  if (result.status !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
}

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

async function peta(args) {
  const detail = args.includes('--detail');

  console.log('\n🌿 Pohon Cabang:\n');

  try {
    if (detail) {
      git('log', '--graph', '--all', '--decorate', '--oneline', '--date=short', '--format=%C(auto)%h%C(reset) %C(dim)%ad%C(reset) %C(cyan)%an%C(reset) %s', '-30');
    } else {
      git('log', '--graph', '--all', '--decorate', '--oneline', '--color=always', '-25');
    }

    console.log('');

    const branches = gitOut('branch', '-a').split('\n').filter(b => b.trim());
    const currentBranch = gitOut('branch', '--show-current') || 'main';

    console.log(colorize('📍 Branch aktif: ', 'cyan') + colorize(currentBranch, 'green'));
    console.log(colorize('📊 Total cabang: ', 'cyan') + branches.length);
    console.log('');

  } catch (err) {
    console.error('❌ Gagal menampilkan pohon cabang.\n');
  }
}

async function pohon(args) {
  return peta(args);
}

module.exports = { peta, pohon };
