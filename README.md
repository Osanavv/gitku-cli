# 🚀 gitku

>Wrapper Git berbahasa Indonesia - simpel, ramah pemula.

```bash
# Daripada nulis ini 
git add . && git commit -m "fix bug" && git push origin main

# Cukup tulis ini 
gitku tandai semua
gitku simpan "fix bug"
gitku kirim
```

---

## Cara Install

```bash
npm install -g @ossnv/gitku
```

Atau clone manual:

```bash
git clone https://github.com/Osanavv/gitku.git
cd gitku
npm link
```

> Tidak perlu `npm install` — gitku tidak punya dependency apapun. Murni Node.js built-in.

---

## Command

### Dasar

| Perintah | Sama dengan | Keterangan |
|----------|-------------|------------|
| `gitku mulai` | `git init` | Mulai pakai git di folder ini |
| `gitku ambil <url>` | `git clone <url>` | Download repo dari GitHub |
| `gitku cek` | `git status` | Lihat file apa yang berubah |
| `gitku tandai semua` | `git add .` | Tandai semua file |
| `gitku tandai <file>` | `git add <file>` | Tandai file tertentu |
| `gitku simpan "pesan"` | `git commit -m` | Simpan perubahan |
| `gitku kirim` | `git push` | Kirim ke GitHub |
| `gitku kirim --paksa` | `git push --force` | Kirim paksa — hati-hati! |
| `gitku tarik` | `git pull` | Ambil update terbaru |
| `gitku tarik --izinkan-beda` | `git pull --allow-unrelated-histories` | Tarik dengan riwayat berbeda |

### Cabang

| Perintah | Sama dengan | Keterangan |
|----------|-------------|------------|
| `gitku cabang` | `git branch` | Lihat semua cabang |
| `gitku cabang baru <nama>` | `git checkout -b` | Buat cabang baru |
| `gitku cabang hapus` | — | Lihat & hapus branch yang sudah di-merge |
| `gitku cabang hapus <nama>` | `git branch -d` | Hapus cabang tertentu |
| `gitku pindah <nama>` | `git checkout` | Pindah ke cabang lain |
| `gitku gabung <nama>` | `git merge` | Gabung cabang ke sini |

### Undo & Perbaiki

| Perintah | Sama dengan | Keterangan |
|----------|-------------|------------|
| `gitku batalkan` | `git reset --soft HEAD~1` | Undo 1 commit, perubahan tetap ada |
| `gitku batalkan <n>` | `git reset --soft HEAD~n` | Undo n commit terakhir |
| `gitku batalkan --buang` | `git reset --hard HEAD~1` | Undo + hapus semua perubahan |
| `gitku perbaiki` | `git commit --amend` | Edit pesan commit terakhir |
| `gitku perbaiki --pesan "..."` | amend + pesan | Langsung ganti pesannya |

### Versi & Rilis

| Perintah | Sama dengan | Keterangan |
|----------|-------------|------------|
| `gitku versi` | `git tag -l` | Lihat semua versi |
| `gitku versi baru <nama>` | `git tag -a` | Buat versi baru |
| `gitku versi hapus <nama>` | `git tag -d` | Hapus versi |
| `gitku versi kirim` | `git push --tags` | Kirim semua versi ke remote |
| `gitku rilis <versi>` | tag + push | Rilis versi baru sekaligus |

### Diff & Info

| Perintah | Sama dengan | Keterangan |
|----------|-------------|------------|
| `gitku beda` | `git diff` | Lihat perubahan yang belum di-stage |
| `gitku beda --siap` | `git diff --cached` | Lihat perubahan yang sudah di-stage |
| `gitku beda <file>` | `git diff <file>` | Perubahan di file tertentu |
| `gitku beda <cabang>` | `git diff <branch>` | Bandingkan dengan cabang lain |
| `gitku info` | — | Statistik repo |
| `gitku siapa` | `git shortlog -sne` | Daftar kontributor |

### .gitignore

| Perintah | Keterangan |
|----------|------------|
| `gitku abaikan <pattern>` | Tambah pattern ke .gitignore |
| `gitku abaikan daftar` | Lihat isi .gitignore |
| `gitku abaikan template <nama>` | Pakai template siap pakai |
| `gitku abaikan hapus <pattern>` | Hapus pattern dari .gitignore |

Template yang tersedia: `node` `python` `java` `vs` `macos` `windows` `linux` `semua`

```bash
gitku abaikan node_modules/
gitku abaikan template node
gitku abaikan template semua
```

### Visual

| Perintah | Keterangan |
|----------|------------|
| `gitku peta` | Lihat pohon cabang (ASCII) |
| `gitku peta --detail` | Pohon cabang + tanggal & author |
| `gitku pohon` | Alias dari `gitku peta` |

```
🌿 Pohon Cabang:

* a3f2b91 (HEAD -> main) Simpan fitur login
*   d4e5f60 Gabung cabang fitur-register
|\  
| * b2c3d45 (fitur-register) Tambah validasi email
| * c1b2a34 Buat halaman register
|/  
* e0d1c23 Commit pertama

📍 Branch aktif: main
📊 Total cabang: 3
```

### Lainnya

| Perintah | Sama dengan | Keterangan |
|----------|-------------|------------|
| `gitku riwayat` | `git log --oneline --graph` | Lihat riwayat commit |
| `gitku reset` | `git restore .` | Buang semua perubahan |
| `gitku simpan-sementara` | `git stash` | Simpan perubahan sementara |
| `gitku ambil-sementara` | `git stash pop` | Kembalikan yang disimpan tadi |
| `gitku remote` | `git remote -v` | Lihat daftar remote |
| `gitku remote ganti <url>` | `git remote set-url` | Ganti URL origin |
| `gitku help` | — | Tampilkan semua perintah |

---

## Fitur

- ⚡ **Zero dependency** — tidak perlu install apapun, langsung jalan
- 🗣️ **Error yang manusiawi** — pesan error git yang bikin bingung diterjemahkan jadi bahasa yang masuk akal
- 💬 **Mode interaktif** — lupa nulis pesan commit? langsung ditanya
- 💡 **Saran otomatis** — setiap selesai, dikasih tau langkah selanjutnya
- 🎨 **Output berwarna** — lebih enak dibaca
- 🌿 **Visual cabang** — lihat struktur branch dengan ASCII art
- 📦 **Template .gitignore** — tinggal pilih, langsung jadi

---

## Contoh Nyata

### Pertama kali pakai Git

```bash
mkdir project-ku && cd project-ku

gitku mulai
gitku abaikan template node

# ... coding ...

gitku tandai semua
gitku simpan "awal mula"
gitku kirim
```

### Rilis versi baru

```bash
gitku cek
gitku rilis v1.0.0
```

### Bersihin branch lama

```bash
gitku cabang hapus

🌿 Branch yang sudah di-merge:

    1. fitur-login
    2. fix-bug-navbar
    3. hotfix-v1.1

Hapus branch mana? (ketik nama atau 'semua'): semua

   ✅ Dihapus: fitur-login
   ✅ Dihapus: fix-bug-navbar
   ✅ Dihapus: hotfix-v1.1

✅ Selesai!
```

### Pas error

```bash
# Git biasa 😵
fatal: not a git repository (or any of the parent directories): .git

# gitku ✅
⚠️  Folder ini belum pakai git.
    Coba: gitku mulai
```

### Lihat siapa yang paling rajin commit

```bash
gitku siapa

👥 Daftar Kontributor:

   🥇   47 commit  Osanavv
   🥈   12 commit  Budi
   🥉    3 commit  Ani
```

### Lihat Statistik Repo

```bash
gitku info

📊 Statistik Repository:

   Total Commit    : 47
   Total Cabang    : 3
   Total File      : 23
   Ukuran Repo     : 120 objects
   Branch Aktif    : main
   Remote          : github.com/user/repo
   
   Commit Terakhir : 2 jam lalu oleh Osanavv
   Kontributor     : 3 orang
```

---

## Lisensi

MIT
