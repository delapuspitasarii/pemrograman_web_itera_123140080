Personal Book Tracker Web (PAW Praktikum)
Author: Dela Puspita Sari NIM: 123140080

Deskripsi proyek
Aplikasi pengelolaan dan pelacak buku bacaan berbasis React + Vite. Aplikasi ini memungkinkan pengguna untuk menambahkan daftar buku, memfilter koleksi buku, melihat statistik pembacaan, serta menyimpan data secara otomatis di browser menggunakan LocalStorage. Aplikasi ini dibangun dengan struktur modular yang memanfaatkan React Context, Custom Hooks, React Router, dan dilengkapi dengan pengujian unit menggunakan Vitest.
Proyek ini dibuat untuk memenuhi tugas praktikum Pemrograman Aplikasi Web (PAW) Pertemuan 3.

Fitur
- Form pendaftaran/penambahan buku baru (`BookForm`).
- Tampilan daftar koleksi buku (`BookList`).
- Penyaringan buku berdasarkan status/kategori (`BookFilter`).
- Halaman ringkasan statistik buku (`Stats`) menggunakan custom hook `useBookStats`.
- Manajemen state global menggunakan React Context (`BookContext`).
- Persistensi data lokal otomatis menggunakan custom hook `useLocalStorage`.
- Navigasi antarhalaman (`Home` dan `Stats`) menggunakan React Router (`Navbar`).
- Pengujian unit (Unit Testing) menggunakan Vitest dan React Testing Library (`App.test.jsx`).

Struktur proyek (ringkasan)
- index.html: Entry point HTML
- src/main.jsx: React entry point & router mounting
- src/App.jsx: Definisi rute dan tata letak utama
- src/components/: Komponen UI yang dapat digunakan kembali (BookFilter, BookForm, BookList, Navbar)
- src/context/BookContext.jsx: Context Provider untuk mengelola state data buku
- src/hooks/: Custom hooks untuk logika spesifik (useBookStats.js, useLocalStorage.js)
- src/pages/: Komponen halaman utama (Home, Stats)
- src/assets/: Berkas gambar dan aset media (hero.png, react.svg, vite.svg)
- src/setupTests.js & src/App.test.jsx: Pengaturan dan berkas pengujian unit

Cara menjalankan (lokal)
Prasyarat: Node.js (v16+ recommended) dan npm tersedia.

1. Install dependensi:
npm install

2. Jalankan development server:
npm run dev

3. Buka alamat lokal yang muncul di terminal (misal: http://localhost:5173) di browser.

4. Jalankan pengujian unit (Testing):
npm run test

5. Untuk build produksi:
npm run build
npm run preview

Dokumentasi singkat komponen utama
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

Cara menambahkan buku baru
1. Masuk ke halaman **Home**.
2. Isi formulir pada bagian **BookForm** dengan detail buku (Judul, Penulis, Kategori, Status).
3. Klik tombol simpan/tambah.
4. Data buku akan otomatis muncul di **BookList** dan tersimpan di LocalStorage.

Catatan pengembangan dan saran
- Menambahkan fitur pencarian buku berbasis kata kunci judul/penulis secara real-time.
- Menambahkan konfirmasi dialog sebelum menghapus entri buku.
- Mengintegrasikan dengan eksternal API (seperti Google Books API) untuk pencarian metadata buku otomatis.

Kontak
Jika ada pertanyaan tentang proyek ini, hubungi Dela Puspita Sari (NIM: 123140080).

---

Ringkasan Halaman

Home
Halaman utama yang berisi form penambahan buku, filter, serta daftar seluruh koleksi buku.

Stats
Halaman statistik yang menyajikan visualisasi/ringkasan data koleksi buku pengguna.