# PecahPR

PecahPR membantu developer Indonesia menemukan repository open-source yang ramah untuk kontribusi pertama.

## Fitur

- Daftar repository ramah pemula.
- Filter berdasarkan bahasa pemrograman.
- Tautan langsung menuju repository GitHub.
- Data repository mudah ditambahkan melalui file JSON.
- Panduan kontribusi berbahasa Indonesia.

## Menjalankan proyek

Pastikan Node.js dan npm sudah terpasang.

```bash
git clone https://github.com/zanmstfa/pecah-pr.git
cd pecah-pr
npm install
npm run dev
```

Buka alamat localhost yang muncul di terminal.

## Menambahkan repository

Data repository disimpan di:

```text
src/data/repositories.json
```

Gunakan format berikut:

```json
{
  "name": "nama-repository",
  "owner": "nama-pemilik",
  "description": "Deskripsi singkat repository.",
  "language": "JavaScript",
  "url": "https://github.com/pemilik/nama-repository"
}
```

Baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan selengkapnya.

## Teknologi

- HTML
- CSS
- JavaScript
- Vite

## Berkontribusi

Kontribusi sangat terbuka, terutama untuk kamu yang baru pertama kali mencoba open-source.

Kamu bisa membantu dengan:

- Menambahkan repository ramah pemula.
- Memperbaiki dokumentasi.
- Memperbaiki tampilan.
- Mengusulkan fitur baru.
- Melaporkan bug melalui GitHub Issues.

## Lisensi

Proyek ini menggunakan lisensi MIT.