# 🚀 gitku

>Kenapa harus ribet kalau bisa simpel? gitku nge-refactor command Git yang keras dan bikin stress jadi bahasa yang mudah pahami dan sat-set-sat-set super duper ultra max gokil.

```bash
# Daripada nulis ini 😵
git add . && git commit -m "fix bug" && git push origin main

# Cukup tulis ini ✨
gitku tandai semua
gitku simpan "fix bug"
gitku kirim
```

---

## Install

```bash
npm install -g gitku
```

Atau clone manual:

```bash
git clone https://github.com/Osanavv/gitku-cli.git
cd gitku
npm link
```

> Tidak perlu `npm install` — gitku tidak punya dependency apapun. Murni Node.js built-in.

---

## Command

### Dasar

| gitku | git aslinya | keterangan |
|-------|------------|------------|
| `gitku mulai` | `git init` | Mulai pakai git di folder ini |
| `gitku ambil <url>` | `git clone <url>` | Download repo dari GitHub |
| `gitku cek` | `git status` | Lihat file apa yang berubah |
| `gitku tandai semua` | `git add .` | Tandai semua file |
| `gitku tandai <file>` | `git add <file>` | Tandai file tertentu |
| `gitku simpan "pesan"` | `git commit -m "pesan"` | Simpan perubahan |
| `gitku kirim` | `git push` | Kirim ke GitHub |
| `gitku kirim --paksa` | `git push --force` | Kirim paksa (hati-hati!) |
| `gitku tarik` | `git pull` | Ambil update terbaru |
| `gitku tarik --izinkan-beda` | `git pull --allow-unrelated-histories` | Tarik dengan riwayat berbeda |

### Branch / Cabang

| gitku | git aslinya | keterangan |
|-------|------------|------------|
| `gitku cabang` | `git branch` | Lihat semua cabang |
| `gitku cabang baru <nama>` | `git checkout -b <nama>` | Buat cabang baru |
| `gitku cabang hapus <nama>` | `git branch -d <nama>` | Hapus cabang |
| `gitku pindah <nama>` | `git checkout <nama>` | Pindah ke cabang lain |
| `gitku gabung <nama>` | `git merge <nama>` | Gabung cabang ke sini |

### Undo & Perbaiki

| gitku | git aslinya | keterangan |
|-------|------------|------------|
| `gitku batalkan` | `git reset --soft HEAD~1` | Undo 1 commit, simpan perubahan |
| `gitku batalkan <n>` | `git reset --soft HEAD~n` | Undo n commit terakhir |
| `gitku batalkan --buang` | `git reset --hard HEAD~1` | Undo commit, hapus perubahan |
| `gitku perbaiki` | `git commit --amend` | Ubah pesan commit terakhir |
| `gitku perbaiki --pesan "..."` | amend + message | Langsung ganti pesan |

### Versi / Tag

| gitku | git aslinya | keterangan |
|-------|------------|------------|
| `gitku versi` | `git tag -l` | Lihat semua versi/tag |
| `gitku versi baru <nama>` | `git tag -a <nama>` | Buat tag baru |
| `gitku versi hapus <nama>` | `git tag -d <nama>` | Hapus tag |
| `gitku versi kirim` | `git push --tags` | Kirim semua tag ke remote |
| `gitku rilis <versi>` | tag + push | Rilis versi baru lengkap |

### Diff & Info

| gitku | git aslinya | keterangan |
|-------|------------|------------|
| `gitku beda` | `git diff` | Lihat perubahan belum di-stage |
| `gitku beda --siap` | `git diff --cached` | Lihat perubahan sudah di-stage |
| `gitku beda <file>` | `git diff <file>` | Perubahan file tertentu |
| `gitku beda <cabang>` | `git diff <branch>` | Bandingkan dengan cabang lain |
| `gitku info` | — | Statistik repo (commit, file, size) |
| `gitku siapa` | `git shortlog -sne` | Daftar kontributor |

### Gitignore

| gitku | keterangan |
|-------|------------|
| `gitku abaikan <pattern>` | Tambah pattern ke .gitignore |
| `gitku abaikan daftar` | Lihat isi .gitignore |
| `gitku abaikan template <nama>` | Template siap pakai |
| `gitku abaikan hapus <pattern>` | Hapus pattern dari .gitignore |

**Template tersedia:** `node`, `python`, `java`, `vs`, `macos`, `windows`, `linux`, `semua`

```bash
# Contoh
gitku abaikan node_modules/
gitku abaikan template node
gitku abaikan template semua
```

### Visual

| gitku | keterangan |
|-------|------------|
| `gitku peta` | Pohon cabang ASCII graph |
| `gitku peta --detail` | Pohon dengan tanggal & author |
| `gitku pohon` | Alias untuk peta |

**Contoh output `gitku peta`:**

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

| gitku | git aslinya | keterangan |
|-------|------------|------------|
| `gitku riwayat` | `git log --oneline --graph` | Lihat riwayat commit |
| `gitku reset` | `git restore .` | Buang semua perubahan |
| `gitku simpan-sementara` | `git stash` | Sembunyikan perubahan sementara |
| `gitku ambil-sementara` | `git stash pop` | Kembalikan yang disembunyikan |
| `gitku remote` | `git remote -v` | Lihat remote yang terdaftar |
| `gitku remote ganti <url>` | `git remote set-url` | Ganti URL origin |
| `gitku help` | — | Tampilkan bantuan |

---

## Fitur

- ⚡ **Zero dependency** — tidak perlu `npm install`, langsung jalan
- 🗣️ **Pesan error yang manusiawi** — error git yang bikin bingung diterjemahkan jadi bahasa yang mudah dimengerti
- 💬 **Mode interaktif** — kalau lupa nulis pesan commit, langsung ditanya
- 💡 **Tips otomatis** — setiap selesai action, dikasih saran langkah selanjutnya
- 🎨 **Output berwarna** — mudah dibaca dengan ANSI colors
- 🌿 **Visual branch tree** — lihat pohon cabang dengan ASCII art
- 📦 **Template gitignore** — siap pakai untuk berbagai project

### Contoh pesan error

```bash
# Git biasa 😵
fatal: not a git repository (or any of the parent directories): .git

# gitku ✅
⚠️  Folder ini belum pakai git.
    Coba: gitku mulai
```

---

## Workflow Pertama Kali

```bash
# 1. Buat folder project
mkdir project-ku && cd project-ku

# 2. Mulai git
gitku mulai

# 3. Tambah gitignore
gitku abaikan template node

# 4. Buat file, coding, dll...

# 5. Tandai semua file
gitku tandai semua

# 6. Simpan dengan pesan
gitku simpan "commit pertama"

# 7. Kirim ke GitHub
gitku kirim
```

---

## Workflow Rilis Versi

```bash
# 1. Pastikan semua sudah di-commit
gitku cek

# 2. Buat tag versi
gitku versi baru v1.0.0

# 3. Atau langsung rilis lengkap
gitku rilis v1.0.0

# 4. Lihat semua versi
gitku versi
```

---

## Contoh Penggunaan

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

### Lihat Kontributor

```bash
gitku siapa

👥 Daftar Kontributor:

   🥇   25 commit  Osanavv <osanavv@email.com>
   🥈   15 commit  Budi <budi@email.com>
   🥉    7 commit  Ani <ani@email.com>
```

### Undo Commit

```bash
# Undo commit terakhir, tapi simpan perubahannya
gitku batalkan

# Undo 3 commit terakhir
gitku batalkan 3

# Undo dan hapus semua perubahannya (hati-hati!)
gitku batalkan --buang
```

### Perbaiki Pesan Commit

```bash
# Interaktif
gitku perbaiki

# Langsung ganti
gitku perbaiki --pesan "fix: perbaiki bug login"
```

---

## Lisensi

MIT
