const { spawnSync } = require('child_process');
const { colorize } = require('../utils/colors');

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

function isGitRepo() {
  const result = spawnSync('git', ['rev-parse', '--is-inside-work-tree']);
  return result.status === 0;
}

function parseStatus() {
  const out = gitTry('status', '--porcelain=v1');
  if (out === null) return { untracked: [], modified: [], deleted: [], staged: [] };

  const untracked = [], modified = [], deleted = [], staged = [];

  for (const line of out.split('\n').filter(Boolean)) {
    const X = line[0];
    const Y = line[1];
    const file = line.slice(3);

    if (X !== ' ' && X !== '?') staged.push(file);
    if (Y === 'M') modified.push(file);
    if (Y === 'D') deleted.push(file);
    if (X === '?' && Y === '?') untracked.push(file);
  }

  return { untracked, modified, deleted, staged };
}

function getAheadBehind(branch, remote) {
  const upstream = `${remote}/${branch}`;
  const ahead = gitTry('rev-list', '--count', `${upstream}..HEAD`);
  const behind = gitTry('rev-list', '--count', `HEAD..${upstream}`);
  return {
    ahead: ahead ? parseInt(ahead) : 0,
    behind: behind ? parseInt(behind) : 0,
  };
}

function hasConflicts() {
  const out = gitTry('diff', '--name-only', '--diff-filter=U');
  return out && out.length > 0;
}

async function statusCerdas() {
  if (!isGitRepo()) {
    console.log('\n' + colorize('📁 Folder ini belum pakai git.', 'yellow'));
    console.log(colorize('   Mau mulai?', 'dim') + ' → gitku mulai\n');
    return;
  }

  const branch = gitTry('branch', '--show-current') || 'main';
  const remote = gitTry('remote') ? 'origin' : null;
  const { untracked, modified, deleted, staged } = parseStatus();
  const konflik = hasConflicts();

  let totalPerubahan = untracked.length + modified.length + deleted.length;
  let headerWarna = totalPerubahan > 0 || staged.length > 0 ? 'cyan' : 'green';

  console.log('\n' + colorize(`📍 Cabang: ${branch}`, headerWarna));

  if (konflik) {
    const konflikFiles = gitTry('diff', '--name-only', '--diff-filter=U').split('\n').filter(Boolean);
    console.log('\n' + colorize('⚔️  Ada konflik yang belum di resolve!', 'red'));
    konflikFiles.forEach(f => console.log(colorize(`   ✖ ${f}`, 'red')));
    console.log(colorize('\n   Buka file di atas, cari tanda <<<<<< dan resolve.', 'dim'));
    console.log(colorize('   Lalu: gitku tandai semua → gitku simpan "resolve konflik"\n', 'dim'));
    return;
  }

  if (staged.length > 0) {
    console.log('\n' + colorize(`✅ ${staged.length} file siap disimpan:`, 'green'));
    staged.slice(0, 5).forEach(f => console.log(colorize(`   + ${f}`, 'green')));
    if (staged.length > 5) console.log(colorize(`   ... dan ${staged.length - 5} lainnya`, 'dim'));
    console.log(colorize('\n   → gitku simpan "pesan kamu"', 'dim'));
  }

  if (totalPerubahan > 0) {
    console.log('');
    if (modified.length > 0) {
      console.log(colorize(`📝 ${modified.length} file diubah:`, 'yellow'));
      modified.slice(0, 4).forEach(f => console.log(colorize(`   ~ ${f}`, 'yellow')));
      if (modified.length > 4) console.log(colorize(`   ... dan ${modified.length - 4} lainnya`, 'dim'));
    }
    if (deleted.length > 0) {
      console.log(colorize(`🗑  ${deleted.length} file dihapus:`, 'red'));
      deleted.slice(0, 4).forEach(f => console.log(colorize(`   - ${f}`, 'red')));
    }
    if (untracked.length > 0) {
      console.log(colorize(`🆕 ${untracked.length} file baru (belum ditandai):`, 'cyan'));
      untracked.slice(0, 4).forEach(f => console.log(colorize(`   ? ${f}`, 'cyan')));
      if (untracked.length > 4) console.log(colorize(`   ... dan ${untracked.length - 4} lainnya`, 'dim'));
    }

    if (staged.length === 0) {
      console.log(colorize('\n   → gitku tandai semua  (lalu gitku simpan "pesan")', 'dim'));
    }
  }

  if (totalPerubahan === 0 && staged.length === 0) {
    console.log(colorize('   Tidak ada perubahan. Semua bersih!', 'green'));
  }

  if (remote) {
    const { ahead, behind } = getAheadBehind(branch, remote);

    if (ahead > 0 && behind > 0) {
      console.log('\n' + colorize(`⚡ ${ahead} commit lebih maju, ${behind} commit ketinggalan dari remote.`, 'magenta'));
      console.log(colorize('   Mungkin ada divergensi. Coba: gitku tarik dulu.', 'dim'));
    } else if (ahead > 0) {
      console.log('\n' + colorize(`📤 ${ahead} commit belum dikirim ke remote.`, 'yellow'));
      console.log(colorize('   → gitku kirim', 'dim'));
    } else if (behind > 0) {
      console.log('\n' + colorize(`📥 ${behind} commit baru tersedia di remote.`, 'cyan'));
      console.log(colorize('   → gitku tarik', 'dim'));
    } else if (totalPerubahan === 0 && staged.length === 0) {
      console.log(colorize('   Sinkron dengan remote ✓', 'dim'));
    }
  }

  const lastCommit = gitTry('log', '-1', '--pretty=%s (%ar)');
  if (lastCommit) {
    console.log('\n' + colorize(`🕓 Commit terakhir: ${lastCommit}`, 'dim'));
  }

  console.log('');
}

module.exports = { statusCerdas };
