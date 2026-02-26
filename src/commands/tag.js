const { spawnSync } = require('child_process');
const readline = require('readline');
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

function tanya(pertanyaan) {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(pertanyaan, answer => { rl.close(); resolve(answer.trim()); });
  });
}

async function tanyaYN(pertanyaan) {
  const jawab = await tanya(`${pertanyaan} (y/n): `);
  return jawab.toLowerCase() === 'y';
}

function branchAktif() {
  try { return gitOut('branch', '--show-current') || 'main'; } catch (_) { return 'main'; }
}

async function versi(args) {
  const [sub, nama] = args;

  if (sub === 'baru') {
    if (!nama) {
      console.error('\n❌ Kasih nama versinya.');
      console.error('   Contoh: gitku versi baru v1.0.0\n');
      return;
    }

    const pesan = await tanya('💬 Pesan untuk versi ini (opsional): ');
    console.log(`\n🏷️  Membuat versi "${nama}"...\n`);

    if (pesan) {
      git('tag', '-a', nama, '-m', pesan);
    } else {
      git('tag', nama);
    }

    console.log(`\n✅ Versi "${nama}" dibuat!`);
    console.log('   Kirim ke remote: gitku versi kirim\n');

  } else if (sub === 'hapus') {
    if (!nama) {
      console.error('\n❌ Kasih nama versi yang mau dihapus.');
      console.error('   Contoh: gitku versi hapus v1.0.0\n');
      return;
    }

    const yakin = await tanyaYN(`⚠️  Yakin mau hapus versi "${nama}"?`);
    if (!yakin) { console.log('Dibatalkan.\n'); return; }

    console.log(`\n🗑️  Menghapus versi "${nama}"...\n`);
    git('tag', '-d', nama);
    console.log(`\n✅ Versi "${nama}" dihapus!\n`);

  } else if (sub === 'kirim') {
    console.log('\n📤 Mengirim semua versi ke remote...\n');
    git('push', '--tags');
    console.log('\n✅ Semua versi terkirim!\n');

  } else {
    console.log('\n🏷️  Daftar Versi:\n');

    try {
      const tags = gitOut('tag', '-l').split('\n').filter(t => t.trim());

      if (tags.length === 0) {
        console.log('   Belum ada versi yang dibuat.');
        console.log('   Buat baru: gitku versi baru v1.0.0\n');
        return;
      }

      tags.forEach(tag => {
        try {
          const date = gitOut('log', '-1', '--format=%ar', tag);
          const msg = gitOut('log', '-1', '--format=%s', tag);
          console.log(`   ${colorize(tag, 'green')} - ${colorize(date, 'dim')} - ${msg}`);
        } catch (_) {
          console.log(`   ${colorize(tag, 'green')}`);
        }
      });

      console.log('');
    } catch (err) {
      console.log('   Belum ada versi.\n');
    }
  }
}

async function rilis(args) {
  const versiName = args[0];

  if (!versiName) {
    console.error('\n❌ Kasih nama versi rilisnya.');
    console.error('   Contoh: gitku rilis v1.0.0\n');
    return;
  }

  console.log(`\n🚀 Mempersiapkan rilis ${versiName}...\n`);

  const pesan = await tanya('💬 Pesan rilis (opsional): ');

  console.log('\n📦 Langkah rilis:');
  console.log('   1. Membuat tag...');
  
  if (pesan) {
    git('tag', '-a', versiName, '-m', pesan);
  } else {
    git('tag', versiName);
  }

  console.log('   2. Mengirim commit ke remote...');
  git('push');

  console.log('   3. Mengirim tag ke remote...');
  git('push', '--tags');

  console.log(`\n🎉 Rilis ${versiName} berhasil dikirim!\n`);
}

module.exports = { versi, rilis };
