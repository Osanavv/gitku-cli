module.exports = function help() {
  console.log(`
🚀 gitku — Git yang Ramah Pemula

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DASAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku mulai                    git init (+ set branch ke main)
  gitku ambil <url>              git clone
  gitku cek                      git status
  gitku tandai semua             git add .
  gitku tandai <file>            git add <file>
  gitku simpan "pesan"           git commit -m
  gitku kirim                    git push (auto tanya URL kalau belum ada)
  gitku kirim --paksa            git push --force
  gitku tarik                    git pull
  gitku tarik --izinkan-beda     git pull --allow-unrelated-histories

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BRANCH / CABANG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku cabang                   git branch (lihat semua)
  gitku cabang baru <nama>       git checkout -b
  gitku cabang hapus <nama>      git branch -d
  gitku pindah <nama>            git checkout
  gitku gabung <nama>            git merge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  UNDO & PERBAIKI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku batalkan                 undo 1 commit (perubahan disimpan)
  gitku batalkan <n>             undo n commit terakhir
  gitku batalkan --buang         undo + hapus perubahan
  gitku perbaiki                 ubah pesan commit terakhir
  gitku perbaiki --pesan "..."   langsung ganti pesan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VERSI / TAG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku versi                    lihat semua versi
  gitku versi baru <nama>        buat tag baru (contoh: v1.0.0)
  gitku versi hapus <nama>       hapus tag
  gitku versi kirim              kirim semua tag ke remote
  gitku rilis <versi>            tag + push + kirim (rilis lengkap)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DIFF & INFO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku beda                     lihat perubahan belum di-stage
  gitku beda --siap              lihat perubahan sudah di-stage
  gitku beda <file/cabang>       bandingkan file atau cabang
  gitku info                     statistik repo (commit, file, size)
  gitku siapa                    daftar kontributor

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GITIGNORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku abaikan <pattern>        tambah ke .gitignore
  gitku abaikan daftar           lihat isi .gitignore
  gitku abaikan template <nama>  template: node, python, java, etc.
  gitku abaikan hapus <pattern>  hapus dari .gitignore

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku peta                     pohon cabang (ASCII graph)
  gitku peta --detail            pohon dengan tanggal & author
  gitku pohon                    alias untuk peta

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LAINNYA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gitku riwayat                  git log --oneline --graph
  gitku reset                    buang semua perubahan (git restore .)
  gitku simpan-sementara         git stash
  gitku ambil-sementara          git stash pop
  gitku remote                   lihat remote yang terdaftar
  gitku remote ganti <url>       ganti URL origin
  gitku help                     tampilkan bantuan ini

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
};
