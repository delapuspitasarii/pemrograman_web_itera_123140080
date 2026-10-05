# Aplikasi Kasir & Kalkulator Keuangan (Mini POS)

## Deskripsi
Aplikasi Kasir & Kalkulator Keuangan Sederhana (Mini POS) adalah aplikasi berbasis web yang dirancang untuk membantu pengelolaan transaksi pembayaran dan keranjang belanja di kantin atau toko kampus. Aplikasi ini memungkinkan kasir untuk menambahkan barang, melakukan validasi input otomatis, menghitung subtotal dan total belanja, menerapkan potongan harga (diskon), serta mengkalkulasi nominal uang kembalian secara tepat dan efisien.

- **Tujuan Pembuatan:** Mempermudah pencatatan transaksi kasir harian, meminimalkan potensi kesalahan perhitungan manual (*human error*), menyediakan validasi input secara langsung (*real-time*), dan memastikan data transaksi tetap tersimpan dengan aman meskipun halaman peramban diperbarui (*refresh*).
- **Studi Kasus:** Manajemen transaksi kasir di kantin/koperasi kampus, mencakup pencatatan item belanjaan mahasiswa, pengelolaan anggaran belanja, serta kalkulasi otomatis potongan diskon promo.

## Fitur Utama
1. Menambahkan barang baru ke keranjang belanja dengan informasi nama barang, harga satuan, dan kuantitas (*qty*)
2. Validasi form input barang (nama minimal 3 karakter, harga minimal Rp 500, dan kuantitas minimal 1)
3. Menghapus item dari keranjang belanja dengan pembaruan kalkulasi total secara langsung
4. Perhitungan otomatis subtotal per item ($harga \times qty$) dan akumulasi total belanja seluruh item
5. Penerapan diskon promo 10% jika total belanja mencapai minimal Rp 50.000 dan kode promo `HEMAT10` terverifikasi
6. Kalkulator pembayaran dan kembalian uang secara *real-time* yang dilengkapi dengan pesan indikator jika uang bayar kurang
7. Penyimpanan data keranjang belanja secara persisten menggunakan *localStorage* agar data tidak hilang saat halaman di-*refresh*
8. Fitur transaksi baru / *reset* untuk mengosongkan keranjang belanja dan membersihkan memori penyimpanan

## Screenshot Aplikasi

### Tampilan Utama & Form Input
![Tampilan Utama](<screenshots/Tampilan utama & Form input.png>)  
*Form input barang, tabel daftar keranjang belanja, serta modul ringkasan pembayaran.*

### Form Validasi Error
![Form Validasi Error](<screenshots/Form Validasi Error.png>)  
*Pesan peringatan yang muncul ketika input nama barang, harga, atau kuantitas tidak sesuai dengan kriteria validasi.*

### Fitur Kalkulator Pembayaran & Diskon
![Kalkulator Pembayaran & Diskon](<screenshots/Fitur Kalkulator Pembayaran & Diskon.png>)  
*Perhitungan otomatis nilai diskon, total akhir yang harus dibayar, serta kalkulasi uang kembalian.*

## Cara Menjalankan Aplikasi
1. Pastikan semua file (`index.html`, `style.css`, `script.js`) berada dalam satu folder
2. Buka file `index.html` menggunakan *web browser*
3. Aplikasi akan langsung dapat digunakan

Alternatif lain adalah dengan menggunakan Live Server pada Visual Studio Code:
1. Buka folder *project* di Visual Studio Code
2. *Install extension* Live Server jika belum tersedia
3. Klik kanan pada file `index.html`
4. Pilih "Open with Live Server"

## Daftar Fitur yang Telah Diimplementasikan

| No | Fitur | Status | Keterangan |
|---|---|---|---|
| 1 | Input Barang | Selesai | Menambahkan item barang ke dalam keranjang belanja |
| 2 | Validasi Form | Selesai | Validasi nama (min. 3 karakter), harga ($\ge$ 500), dan qty ($\ge$ 1) |
| 3 | Kalkulasi Subtotal & Total | Selesai | Menghitung harga dikali kuantitas dan akumulasi total belanja |
| 4 | Diskon Promo | Selesai | Potongan 10% jika memasukkan kode promo `HEMAT10` (min. belanja Rp 50.000) |
| 5 | Kalkulator Pembayaran | Selesai | Mengkalkulasi uang kembalian dan mendeteksi kekurangan pembayaran |
| 6 | Hapus Item | Selesai | Menghapus item dari keranjang dan memperbarui total pembayaran |
| 7 | LocalStorage | Selesai | Menyimpan dan memuat data keranjang belanja secara persisten |
| 8 | Transaksi Baru / Reset | Selesai | Mengosongkan keranjang dan menghapus data *localStorage* |
| 9 | Responsive Design | Selesai | Tampilan responsif untuk berbagai ukuran layar perangkat |

## Penjelasan Teknis

### Penyimpanan Data dengan localStorage
Aplikasi ini menggunakan array objek dalam JavaScript untuk mengelola item keranjang belanja. Agar data keranjang tidak hilang saat halaman di-refresh atau browser ditutup, digunakan mekanisme penyimpanan persisten *localStorage*:

```javascript
// Memuat data dari localStorage saat aplikasi dijalankan
let keranjang = JSON.parse(localStorage.getItem("keranjangBelanja")) || [];

// Menyimpan data keranjang ke localStorage setiap kali ada perubahan
function simpanKeLocalStorage() {
  localStorage.setItem("keranjangBelanja", JSON.stringify(keranjang));
}
```

Fungsi penyimpanan dipanggil setiap kali terjadi perubahan data (tambah, hapus, atau reset), sedangkan pemuatan data dipanggil saat aplikasi pertama kali dimuat. Data disimpan dalam format JSON string menggunakan `JSON.stringify()` dan diubah kembali menjadi array objek menggunakan `JSON.parse()`.

### Validasi Form
Validasi form dilakukan pada sisi *client* untuk memastikan data yang diinput oleh pengguna sesuai dengan kriteria yang ditentukan. Berikut adalah implementasi validasi form:

```javascript
function validasiInput() {
  let isValid = true;
  const nama = inputNama.value.trim();
  const harga = parseFloat(inputHarga.value);
  const qty = parseInt(inputQty.value);

  // Validasi Nama Barang (minimal 3 karakter)
  if (nama.length < 3) {
    errorNama.classList.remove("hidden");
    inputNama.classList.add("input-error");
    isValid = false;
  } else {
    errorNama.classList.add("hidden");
    inputNama.classList.remove("input-error");
  }

  // Validasi Harga Satuan (harus angka & minimal Rp 500)
  if (isNaN(harga) || harga < 500) {
    errorHarga.classList.remove("hidden");
    inputHarga.classList.add("input-error");
    isValid = false;
  } else {
    errorHarga.classList.add("hidden");
    inputHarga.classList.remove("input-error");
  }

  // Validasi Jumlah / Qty (minimal 1)
  if (isNaN(qty) || qty < 1) {
    errorQty.classList.remove("hidden");
    inputQty.classList.add("input-error");
    isValid = false;
  } else {
    errorQty.classList.add("hidden");
    inputQty.classList.remove("input-error");
  }

  return isValid;
}
```

Validasi yang diterapkan meliputi:
1. Nama barang tidak boleh kurang dari 3 karakter
2. Harga satuan wajib berupa angka positif dan minimal Rp 500
3. Jumlah (*qty*) wajib berupa angka bulat minimal 1

Jika terdapat kesalahan input, pesan *error* akan ditampilkan di bawah *field* yang bermasalah dan *field* tersebut akan ditandai dengan border berwarna merah. Proses penyimpanan data tidak akan dilanjutkan hingga semua input valid.

### Algoritma Kalkulator Keuangan & Pembayaran
Kalkulator keuangan bekerja secara *real-time* setiap ada perubahan input nominal pembayaran oleh kasir:

```javascript
function hitungPembayaran(totalAkhir) {
  const uangBayar = parseFloat(inputUangBayar.value) || 0;

  if (inputUangBayar.value === "") {
    textKembalian.innerText = "Rp 0";
    pesanKembalian.classList.add("hidden");
    return;
  }

  const kembalian = uangBayar - totalAkhir;

  if (kembalian < 0) {
    textKembalian.innerText = formatRupiah(kembalian);
    textKembalian.className = "text-red-500 font-bold";
    pesanKembalian.classList.remove("hidden");
  } else {
    textKembalian.innerText = formatRupiah(kembalian);
    textKembalian.className = "text-green-600 font-bold";
    pesanKembalian.classList.add("hidden");
  }
}
```

Alur kalkulasinya meliputi:
1. Menghitung kembalian dengan pengurangan `uangBayar - totalAkhir`
2. Apabila nominal pembayaran kurang (`kembalian < 0`), teks akan berwarna merah dan pesan peringatan dimunculkan
3. Apabila nominal pembayaran mencukupi, teks kembalian akan berwarna hijau dan peringatan disembunyikan

## Informasi Pembuat
- **Nama:** Dela Puspita Sari
- **NIM:** 123140080
- **Mata Kuliah:** Pemrograman Web RB
- **Dosen Pengampu:** Muhammad Habib Algifari, S.Kom., M.TI.
- **Asisten Praktikum:** Muhammad Daffa Hakim Matondang
