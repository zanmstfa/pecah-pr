# Berkontribusi ke PecahPR

Terima kasih sudah tertarik berkontribusi! PecahPR dibuat agar siapa pun dapat memulai perjalanan open-source dengan mudah.

## Menambahkan repository

Repository yang ditambahkan harus:

- Bersifat publik.
- Masih aktif dikembangkan.
- Memiliki panduan kontribusi yang jelas.
- Cocok untuk dipelajari oleh kontributor pemula.
- Memiliki status issue pemula yang sudah diperiksa.
- Belum tersedia dalam daftar PecahPR.

Repository tidak harus memiliki issue pemula yang aktif. Jika belum
ada, isi `hasBeginnerIssues` dengan `false` agar informasi pada website
tetap jujur dan mudah dipahami.

## Langkah kontribusi

1. Fork repository PecahPR.
2. Clone hasil fork ke komputer.
3. Buat branch baru.
4. Buka `src/data/repositories.json`.
5. Periksa panduan kontribusi dan ketersediaan issue pemula.
6. Tambahkan informasi repository.
7. Jalankan validasi dan periksa website.
8. Commit perubahan.
9. Push branch dan kirim pull request.

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

Jangan lupa menambahkan koma setelah data sebelumnya.

### Penjelasan data

- `name`: nama repository sesuai yang tertera di GitHub.
- `owner`: nama akun atau organisasi pemilik repository.
- `description`: penjelasan singkat dalam bahasa Indonesia.
- `language`: bahasa atau jenis kontribusi utama.
- `url`: tautan halaman utama repository GitHub.
- `contributingUrl`: tautan langsung menuju panduan kontribusi.
- `hasBeginnerIssues`: `true` jika issue pemula tersedia saat diperiksa, atau `false` jika belum ada.
- `verifiedAt`: tanggal pemeriksaan dengan format `YYYY-MM-DD`.

### Memeriksa kesiapan repository

1. Buka halaman repository dan pastikan proyek masih aktif.
2. Buka halaman `/contribute` pada repository tersebut.
3. Periksa apakah GitHub menampilkan `good first issue`.
4. Klik tautan panduan kontribusi dan salin URL-nya ke `contributingUrl`.
5. Isi `hasBeginnerIssues` sesuai hasil pemeriksaan.
6. Isi `verifiedAt` dengan tanggal pemeriksaan.

## Menjalankan proyek

```bash
npm install
npm run validate:data
npm run build
npm run dev
```

`npm install` cukup dijalankan saat pertama kali menyiapkan proyek.
Setelah itu, buka alamat localhost untuk memastikan kartu repository
tampil dengan benar.

## Pesan commit

Gunakan pesan yang singkat dan jelas. Contoh:

```text
data: add nama-repository
```

## Pull request

Jelaskan:

- Repository yang ditambahkan.
- Alasan repository tersebut ramah pemula.
- Tautan panduan kontribusi.
- Hasil pemeriksaan issue pemula.
- Tanggal pemeriksaan.

Tidak apa-apa jika ini adalah kontribusi pertamamu. Kami akan membantu prosesnya.
