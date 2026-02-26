const { run } = require('./commands/commands');
const { batalkan, perbaiki } = require('./commands/undo');
const { beda, info, siapa } = require('./commands/diff');
const { versi, rilis } = require('./commands/tag');
const { abaikan } = require('./commands/ignore');
const { peta, pohon } = require('./commands/visual');
const help = require('./help');

const commands = {
  ...run,
  batalkan,
  perbaiki,
  beda,
  info,
  siapa,
  versi,
  rilis,
  abaikan,
  peta,
  pohon,
};

async function main(args) {
  if (args.length === 0 || args[0] === 'help') {
    help();
    return;
  }

  const [command, ...rest] = args;
  const handler = commands[command];

  if (!handler) {
    console.error(`\n❌ Command "${command}" tidak dikenal.`);
    console.error('   Ketik "gitku help" untuk lihat daftar command.\n');
    return;
  }

  try {
    await handler(rest);
  } catch (err) {
    handleError(err);
  }
}

function handleError(err) {
  const msg = err.stderr || err.message || String(err);

  const errors = [
    { match: /not a git repository/i,        pesan: 'Folder ini belum pakai git.\n   Coba: gitku mulai' },
    { match: /nothing to commit/i,            pesan: 'Tidak ada perubahan. Semua sudah up to date!' },
    { match: /nothing added to commit/i,      pesan: 'Belum ada file yang ditandai.\n   Coba: gitku tandai semua' },
    { match: /unrelated histories/i,          pesan: 'Repo punya riwayat berbeda.\n   Coba: gitku tarik --izinkan-beda' },
    { match: /rejected.*failed to push/i,     pesan: 'Gagal kirim. Ada update baru.\n   Coba: gitku tarik dulu, lalu kirim lagi.' },
    { match: /CONFLICT/i,                     pesan: 'Ada konflik file. Selesaikan manual, lalu:\n   gitku tandai semua → gitku simpan "resolve konflik"' },
    { match: /unknown revision or path/i,     pesan: 'Referensi tidak ditemukan. Periksa nama branch atau commit.' },
    { match: /pathspec.*did not match/i,      pesan: 'File atau branch tidak ditemukan. Periksa ejaan.' },
    { match: /already exists/i,               pesan: 'Sudah ada. Tidak perlu dibuat ulang.' },
  ];

  for (const { match, pesan } of errors) {
    if (match.test(msg)) {
      console.error(`\n⚠️  ${pesan}\n`);
      return;
    }
  }

  console.error('\n❌ Terjadi kesalahan:');
  console.error(msg);
}

module.exports = { main };
