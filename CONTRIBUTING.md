# Berkontribusi ke PecahPR

Terima kasih sudah tertarik berkontribusi! PecahPR dibuat agar siapa pun dapat memulai perjalanan open-source dengan mudah.

## Menambahkan repository

Repository yang ditambahkan harus:

- Bersifat publik.
- Masih aktif dikembangkan.
- Memiliki dokumentasi yang jelas.
- Menyediakan issue ramah pemula, seperti `good first issue` atau `help wanted`.
- Belum tersedia dalam daftar PecahPR.

## Langkah kontribusi

1. Fork repository PecahPR.
2. Clone hasil fork ke komputer.
3. Buat branch baru.
4. Buka `src/data/repositories.json`.
5. Tambahkan informasi repository.
6. Pastikan website tetap berjalan.
7. Commit perubahan.
8. Push branch dan kirim pull request.

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

Jangan lupa menambahkan koma setelah data sebelumnya.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal untuk memeriksa website.

## Pesan commit

Gunakan pesan yang singkat dan jelas. Contoh:

```text
data: add nama-repository
```

## Pull request

Jelaskan:

- Repository yang ditambahkan.
- Alasan repository tersebut ramah pemula.
- Tautan menuju issue pemula jika tersedia.

Tidak apa-apa jika ini adalah kontribusi pertamamu. Kami akan membantu prosesnya.