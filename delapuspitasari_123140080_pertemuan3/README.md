# Personal Book Tracker Web

> **Praktikum Pemrograman Aplikasi Web**  
> **Author:** Dela Puspita Sari (NIM: 123140080)

---

## 📌 Deskripsi Proyek

Aplikasi pengelolaan dan pelacak buku bacaan berbasis **React + Vite**. Aplikasi ini memungkinkan pengguna untuk menambahkan daftar buku, memfilter koleksi buku, melihat statistik pembacaan, serta menyimpan data secara otomatis di browser menggunakan LocalStorage.

Aplikasi ini dibangun dengan struktur modular yang memanfaatkan **React Context**, **Custom Hooks**, **React Router**, dan dilengkapi dengan pengujian unit (*Unit Testing*) menggunakan **Vitest**. Proyek ini dibuat untuk memenuhi tugas praktikum Pemrograman Aplikasi Web (PAW) Pertemuan 3.

---

## ✨ Fitur Utama

* **Form Tambah Buku (`BookForm`)**: Pendaftaran/penambahan data buku baru ke koleksi.
* **Daftar Buku (`BookList`)**: Tampilan visual koleksi buku yang telah tersimpan.
* **Filter Buku (`BookFilter`)**: Penyaringan buku berdasarkan status atau kategori.
* **Ringkasan Statistik (`Stats`)**: Halaman kalkulasi statistik bacaan menggunakan custom hook `useBookStats`.
* **State Management (`BookContext`)**: Pengelolaan state global aplikasi.
* **Persistensi Data (`useLocalStorage`)**: Penyimpanan otomatis di browser agar data tidak hilang saat *reload*.
* **Navigasi Router (`Navbar`)**: Perpindahan halaman (*Home* dan *Stats*) tanpa *reload*.
* **Pengujian Unit (`App.test.jsx`)**: Pengujian komponen berbasis Vitest & React Testing Library.

---

## 📁 Struktur Proyek

```text
src/
├── assets/         # Berkas gambar dan media
├── components/     # Komponen UI modular (BookFilter, BookForm, BookList, Navbar)
├── context/        # React Context Provider (BookContext.jsx)
├── hooks/          # Custom hooks (useBookStats.js, useLocalStorage.js)
├── pages/          # Halaman utama (Home.jsx, Stats.jsx)
├── App.jsx         # Definisi rute dan tata letak utama
├── App.test.jsx    # Pengujian unit (Unit Testing)
├── main.jsx        # Entry point React & Router
└── setupTests.js   # Konfigurasi Vitest
```

## Cara menjalankan (lokal)
Prasyarat: Node.js (v16+ recommended) dan npm tersedia.

1. Install dependensi:
```bash
npm install
```
2. Jalankan development server:
```bash
npm run dev
```
3. Buka alamat lokal yang muncul di terminal (misal: http://localhost:5173) di browser.

4. Jalankan pengujian unit (Testing):
```bash
npm run test
```
5. Untuk build produksi:
```bash
npm run build
npm run preview
```
## Dokumentasi singkat komponen utama
- BookContext.jsx
  - Export: `BookProvider` dan `useBookContext`.
  - API: Penyedia state buku global dan fungsi manipulasi data buku.
  - Penyimpanan: Terintegrasi langsung dengan `useLocalStorage` agar data tidak hilang saat reload.
- BookForm.jsx
  - Form interaktif untuk memasukkan data buku baru (judul, penulis, kategori, status).
- BookList.jsx
  - Menampilkan daftar koleksi buku yang tersimpan.
- BookFilter.jsx
  - Komponen pencari/pemfilter buku berdasarkan status atau kriteria tertentu.
- Navbar.jsx
  - Navigasi global untuk berpindah antara halaman Utama (`Home`) dan Statistik (`Stats`).
- useLocalStorage.js
  - Custom hook untuk sinkronisasi state React dengan LocalStorage browser.
- useBookStats.js
  - Custom hook untuk mengkalkulasi total buku, jumlah buku yang selesai dibaca, dan statistik lainnya.

## Cara menambahkan buku baru
1. Masuk ke halaman **Home**.
2. Isi formulir pada bagian **BookForm** dengan detail buku (Judul, Penulis, Kategori, Status).
3. Klik tombol simpan/tambah.
4. Data buku akan otomatis muncul di **BookList** dan tersimpan di LocalStorage.

## Ringkasan Halaman

### Home
Halaman utama yang berisi form penambahan buku, filter, serta daftar seluruh koleksi buku.

### Stats
Halaman statistik yang menyajikan visualisasi/ringkasan data koleksi buku pengguna.

## Lampiran Tangkapan Layar (Screenshot)

1. Tampilan Halaman Utama (Home)
![Halaman Utama](docs/screenshots/home.png)
*Menampilkan formulir pendaftaran buku baru, opsi filter/pencarian, dan daftar koleksi buku.*

2. Tampilan Halaman Statistik (Stats)
![Halaman Statistik](docs/screenshots/stats.png)
*Menampilkan ringkasan kalkulasi total buku dan status keterbacaan menggunakan custom hook.*

3. Bukti Hasil Pengujian Unit (Unit Testing - Vitest)
![Hasil Testing Terminal](docs/screenshots/testing.png)
*Tangkapan layar terminal saat menjalankan `npm run test` dengan seluruh pengujian berstatus PASS.*

## Catatan pengembangan dan saran
- Menambahkan fitur pencarian buku berbasis kata kunci judul/penulis secara real-time.
- Menambahkan konfirmasi dialog sebelum menghapus entri buku.
- Mengintegrasikan dengan eksternal API (seperti Google Books API) untuk pencarian metadata buku otomatis.

