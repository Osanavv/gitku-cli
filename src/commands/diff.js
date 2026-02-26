const { spawnSync } = require('child_process');
const { colorize } = require('../utils/colors');

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

async function beda(args) {
  const siap = args.includes('--siap');
  const target = args.find(a => !a.startsWith('--'));

  console.log('\n🔄 Perbandingan perubahan:\n');

  if (siap) {
    console.log(colorize('(File yang sudah di-stage)', 'cyan'));
    git('diff', '--cached', '--color=always');
  } else if (target) {
    console.log(colorize(`(File/cabang: ${target})`, 'cyan'));
    
    const branches = gitOut('branch', '-a').split('\n').map(b => b.replace('*', '').trim());
    const isBranch = branches.some(b => b.includes(target) || b === target);
    
    if (isBranch) {
      git('diff', target, '--color=always');
    } else {
      git('diff', '--color=always', '--', target);
    }
  } else {
    console.log(colorize('(File yang belum di-stage)', 'cyan'));
    git('diff', '--color=always');
  }

  console.log('');
}

async function info() {
  console.log('\n📊 Statistik Repository:\n');

  try {
    const totalCommits = gitOut('rev-list', '--count', 'HEAD');
    const branches = gitOut('branch').split('\n').filter(b => b.trim());
    const currentBranch = gitOut('branch', '--show-current') || 'main';
    const totalFiles = gitOut('ls-files').split('\n').filter(f => f.trim()).length;
    
    let remote = '';
    try {
      remote = gitOut('remote', 'get-url', 'origin');
    } catch (_) {
      remote = 'Tidak ada';
    }

    const contributors = gitOut('shortlog', '-sne', 'HEAD').split('\n').filter(c => c.trim()).length;
    
    const lastCommit = gitOut('log', '-1', '--pretty=%ar');
    const lastAuthor = gitOut('log', '-1', '--pretty=%an');

    let totalSize = 0;
    try {
      totalSize = parseInt(gitOut('count-objects', '-v').match(/size:\s*(\d+)/)?.[1] || '0');
    } catch (_) {}

    console.log(`   ${colorize('Total Commit', 'cyan')}    : ${colorize(totalCommits, 'bold')}`);
    console.log(`   ${colorize('Total Cabang', 'cyan')}    : ${colorize(branches.length, 'bold')}`);
    console.log(`   ${colorize('Total File', 'cyan')}      : ${colorize(totalFiles, 'bold')}`);
    console.log(`   ${colorize('Ukuran Repo', 'cyan')}    : ${totalSize} objects`);
    console.log(`   ${colorize('Branch Aktif', 'cyan')}    : ${colorize(currentBranch, 'green')}`);
    console.log(`   ${colorize('Remote', 'cyan')}         : ${remote !== 'Tidak ada' ? remote : colorize('Tidak ada', 'dim')}`);
    console.log('');
    console.log(`   ${colorize('Commit Terakhir', 'cyan')} : ${lastCommit} oleh ${lastAuthor}`);
    console.log(`   ${colorize('Kontributor', 'cyan')}    : ${contributors} orang`);
    console.log('');

  } catch (err) {
    console.error('❌ Gagal mengambil info repository.\n');
  }
}

async function siapa() {
  console.log('\n👥 Daftar Kontributor:\n');

  try {
    const output = gitOut('shortlog', '-sne', 'HEAD');
    const lines = output.split('\n').filter(l => l.trim());

    if (lines.length === 0) {
      console.log('   Belum ada kontributor.\n');
      return;
    }

    lines.forEach((line, i) => {
      const match = line.trim().match(/^\s*(\d+)\s+(.+)/);
      if (match) {
        const [, commits, author] = match;
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  ';
        console.log(`   ${medal} ${colorize(commits.padStart(4), 'cyan')} commit  ${author}`);
      }
    });

    console.log('');
  } catch (err) {
    console.error('❌ Gagal mengambil daftar kontributor.\n');
  }
}

module.exports = { beda, info, siapa };
