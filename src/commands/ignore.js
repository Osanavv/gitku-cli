const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { getTemplate, listTemplates } = require('../utils/templates');
const { colorize } = require('../utils/colors');

function gitOut(...args) {
  const result = spawnSync('git', args.flat());
  if (result.status !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
}

function getRepoRoot() {
  try {
    return gitOut('rev-parse', '--show-toplevel');
  } catch (_) {
    return process.cwd();
  }
}

async function abaikan(args) {
  const [sub, ...rest] = args;
  const repoRoot = getRepoRoot();
  const gitignorePath = path.join(repoRoot, '.gitignore');

  if (sub === 'daftar') {
    console.log('\n📋 Isi .gitignore:\n');

    if (!fs.existsSync(gitignorePath)) {
      console.log('   File .gitignore belum ada.');
      console.log('   Buat dengan: gitku abaikan template node\n');
      return;
    }

    const content = fs.readFileSync(gitignorePath, 'utf8');
    const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));

    if (lines.length === 0) {
      console.log('   .gitignore kosong.\n');
      return;
    }

    lines.forEach(line => {
      console.log(`   ${colorize('•', 'cyan')} ${line}`);
    });

    console.log('');
    return;
  }

  if (sub === 'template') {
    const templateName = rest[0];

    if (!templateName) {
      console.log('\n📦 Template yang tersedia:\n');
      listTemplates().forEach(name => {
        console.log(`   ${colorize('•', 'cyan')} ${name}`);
      });
      console.log('\n   Pakai: gitku abaikan template node\n');
      return;
    }

    const template = getTemplate(templateName);

    if (!template) {
      console.error(`\n❌ Template "${templateName}" tidak ditemukan.`);
      console.error('   Template tersedia: ' + listTemplates().join(', ') + '\n');
      return;
    }

    let existingContent = '';
    if (fs.existsSync(gitignorePath)) {
      existingContent = fs.readFileSync(gitignorePath, 'utf8');
    }

    const newSection = `\n# === ${templateName.toUpperCase()} ===\n${template}\n`;

    if (existingContent.includes(`# === ${templateName.toUpperCase()} ===`)) {
      console.log(`\n⚠️  Template "${templateName}" sudah ada di .gitignore.\n`);
      return;
    }

    const newContent = existingContent.trim() + newSection;
    fs.writeFileSync(gitignorePath, newContent);

    console.log(`\n📌 Menambahkan template .gitignore untuk ${templateName}...\n`);
    console.log('✅ Ditambahkan:');

    template.split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .slice(0, 8)
      .forEach(line => {
        console.log(`   ${colorize('•', 'green')} ${line}`);
      });

    if (template.split('\n').filter(l => l.trim() && !l.startsWith('#')).length > 8) {
      console.log('   ...');
    }

    console.log('\n');
    return;
  }

  if (sub === 'hapus') {
    const pattern = rest[0];

    if (!pattern) {
      console.error('\n❌ Kasih pattern yang mau dihapus.');
      console.error('   Contoh: gitku abaikan hapus node_modules/\n');
      return;
    }

    if (!fs.existsSync(gitignorePath)) {
      console.log('\n⚠️  File .gitignore belum ada.\n');
      return;
    }

    let content = fs.readFileSync(gitignorePath, 'utf8');
    const lines = content.split('\n');
    const newLines = lines.filter(line => line.trim() !== pattern);

    if (lines.length === newLines.length) {
      console.log(`\n⚠️  Pattern "${pattern}" tidak ditemukan di .gitignore.\n`);
      return;
    }

    fs.writeFileSync(gitignorePath, newLines.join('\n'));
    console.log(`\n✅ Pattern "${pattern}" dihapus dari .gitignore.\n`);
    return;
  }

  if (sub) {
    let existingContent = '';
    if (fs.existsSync(gitignorePath)) {
      existingContent = fs.readFileSync(gitignorePath, 'utf8');
    }

    const patterns = [sub, ...rest];

    patterns.forEach(pattern => {
      if (existingContent.includes(pattern)) {
        console.log(`⚠️  "${pattern}" sudah ada di .gitignore.`);
        return;
      }
      existingContent += `\n${pattern}`;
    });

    fs.writeFileSync(gitignorePath, existingContent.trim() + '\n');
    console.log(`\n✅ Ditambahkan ke .gitignore: ${patterns.join(', ')}\n`);
    return;
  }

  console.log('\n📋 Cara pakai gitku abaikan:\n');
  console.log('   gitku abaikan <pattern>        Tambah pattern ke .gitignore');
  console.log('   gitku abaikan daftar           Lihat isi .gitignore');
  console.log('   gitku abaikan template <nama>  Tambah template siap pakai');
  console.log('   gitku abaikan hapus <pattern>  Hapus pattern dari .gitignore');
  console.log('\n📦 Template: ' + listTemplates().join(', ') + '\n');
}

module.exports = { abaikan };
