# PecahPR

PecahPR membantu developer Indonesia menemukan repository open-source yang ramah untuk kontribusi pertama.

## Demo

Kunjungi website: [PecahPR](https://zanmstfa.github.io/pecah-pr/)

## Fitur

- Daftar repository ramah pemula.
- Pencarian, filter bahasa, dan beberapa pilihan urutan.
- Informasi panduan, issue pemula, dan tanggal pemeriksaan.
- Tautan yang menyesuaikan kesiapan setiap repository.
- Repository favorit yang tersimpan di perangkat.
- Tautan hasil filter yang dapat dibagikan.
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
  "url": "https://github.com/pemilik/nama-repository",
  "contributingUrl": "https://github.com/pemilik/nama-repository/blob/main/CONTRIBUTING.md",
  "hasBeginnerIssues": true,
  "verifiedAt": "2026-07-22"
}
```

`contributingUrl` berisi tautan langsung menuju panduan kontribusi.
Isi `hasBeginnerIssues` dengan `true` hanya jika issue ramah
pemula tersedia saat diperiksa. `verifiedAt` berisi tanggal
pemeriksaan dengan format `YYYY-MM-DD`.

Periksa data sebelum mengirim perubahan:

```bash
npm run validate:data
npm run build
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
