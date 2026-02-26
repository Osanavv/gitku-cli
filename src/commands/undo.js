const { spawnSync } = require('child_process');
const readline = require('readline');

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

async function batalkan(args) {
  const buang = args.includes('--buang');
  const n = args.find(a => !a.startsWith('--') && !isNaN(a)) || '1';
  const jumlah = parseInt(n);

  if (jumlah > 10) {
    const yakin = await tanyaYN(`⚠️  Kamu mau membatalkan ${jumlah} commit? Ini agak banyak.`);
    if (!yakin) { console.log('Dibatalkan.\n'); return; }
  }

  const mode = buang ? '--hard' : '--soft';
  const modeText = buang ? '(perubahan akan dihapus)' : '(perubahan disimpan di staging)';

  console.log(`\n⏪ Membatalkan ${jumlah} commit terakhir ${modeText}...\n`);
  
  try {
    git('reset', mode, `HEAD~${jumlah}`);
    console.log(`\n✅ ${jumlah} commit dibatalkan!`);
    if (!buang) {
      console.log('   Perubahan masih ada di staging. Ubah lalu: gitku simpan "pesan"\n');
    } else {
      console.log('   Perubahan sudah dihapus. File kembali ke kondisi sebelumnya.\n');
    }
  } catch (err) {
    if (/unknown mode/i.test(err.stderr)) {
      console.error('\n❌ Gagal membatalkan. Pastikan ada commit yang bisa dibatalkan.\n');
    } else {
      throw err;
    }
  }
}

async function perbaiki(args) {
  const pesanIndex = args.indexOf('--pesan');
  let pesanBaru = null;

  if (pesanIndex !== -1 && args[pesanIndex + 1]) {
    pesanBaru = args[pesanIndex + 1];
  }

  if (!pesanBaru) {
    const lastMsg = gitOut('log', '-1', '--pretty=%s');
    console.log(`\n📝 Pesan commit terakhir: "${lastMsg}"\n`);
    pesanBaru = await tanya('💬 Pesan baru: ');
    if (!pesanBaru) {
      console.error('❌ Pesan tidak boleh kosong.\n');
      return;
    }
  }

  console.log('\n🔧 Memperbaiki pesan commit...\n');
  git('commit', '--amend', '-m', pesanBaru);
  console.log(`\n✅ Pesan commit diperbaiki menjadi: "${pesanBaru}"\n`);
}

module.exports = { batalkan, perbaiki };
