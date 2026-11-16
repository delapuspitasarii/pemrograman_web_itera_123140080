# Sistem Manajemen Perpustakaan Sederhana

## Deskripsi Program
Program ini adalah implementasi sistem manajemen perpustakaan menggunakan konsep Object-Oriented Programming (OOP) dalam Python. Sistem ini dirancang secara modular (memisahkan cetak biru objek dan sistem pengelolaannya) untuk mensimulasikan pengelolaan koleksi perpustakaan interaktif yang terdiri dari buku dan majalah.

## Fitur Program
Program ini telah dikembangkan melebihi syarat minimal dan memiliki 5 fungsionalitas utama:

1. **Menambahkan Item**: Memasukkan objek buku dan majalah ke dalam list katalog perpustakaan.
2. **Katalog Perpustakaan**: Menampilkan daftar lengkap seluruh koleksi yang terdaftar di sistem beserta detail informasi dan status terkininya.
3. **Pencarian Item**: Mencari item berdasarkan kata kunci pada judul (*case-insensitive*) atau menggunakan ID unik.
4. **Peminjaman Item**: Memfasilitasi peminjaman item dengan melakukan validasi otomatis. Jika barang berstatus sedang dipinjam, sistem akan menolak permintaan peminjaman baru.
5. **Pengembalian Item**: Memfasilitasi pengembalian item dan mengubah statusnya kembali menjadi tersedia, dilengkapi dengan validasi *error handling*.

## Konsep OOP yang Diimplementasikan

### 1. Abstract Class
* `LibraryItem` bertindak sebagai *abstract base class* dengan menggunakan modul `ABC` dari Python.
* Mendefinisikan method abstract `@abstractmethod` yaitu `get_detail()`.
* Memaksa setiap class turunannya untuk wajib mengimplementasikan struktur method tersebut.

### 2. Inheritance (Pewarisan)
* Class `Book` dan `Magazine` mewarisi atribut dan perilaku dari struktur dasar `LibraryItem`.
* Setiap *subclass* memiliki atribut spesifiknya sendiri (`author` untuk Buku, `issue_number` untuk Majalah).
* Menggunakan `super().__init__()` untuk memanggil *constructor* dari *parent class*.

### 3. Encapsulation (Pembungkusan)
Program ini menerapkan proteksi data menggunakan *access modifiers* dan *decorators*:
* **Private Attributes** (`__`): Atribut `__koleksi` pada class `Library` disembunyikan agar list data tidak bisa diubah sembarangan dari luar sistem.
* **Protected Attributes** (`_`): Atribut `_is_dipinjam` pada `LibraryItem`.
* **Property Decorators**: Menggunakan `@property` (sebagai *getter*) dan `@is_dipinjam.setter` untuk membaca dan memodifikasi status peminjaman dengan cara yang aman.

### 4. Polymorphism (Polimorfisme)
* Method `get_detail()` dioverride dan diimplementasikan secara berbeda pada class `Book` dan `Magazine` untuk menghasilkan format *output* teks yang menyesuaikan jenis item.
* Saat program melakukan *looping* pada list koleksi di class `Library`, program secara dinamis memanggil `get_detail()` yang tepat sesuai dengan bentuk objeknya.

## Diagram Class

```text
    <<abstract>>
    LibraryItem
-----------------------
+ item_id: int/str
+ title: str
# _is_dipinjam: bool
-----------------------
+ get_detail(): str
+ is_dipinjam(): bool
          △
          │
      ┌───┴───┐
      │       │
    Book   Magazine
  ------   ---------
  + author + issue_number
  + ...    + ...
          
          │
    (dikelola oleh)
          │
          ▼
       Library
-----------------------
- __koleksi: list
-----------------------
+ tambah_item(item)
+ tampilkan_daftar_item()
+ cari_item(keyword)
+ pinjam_item(item_id)
+ kembalikan_item(item_id)
```

## Cara Menjalankan Program
1. Pastikan Python 3.x sudah terinstall di sistem Anda.

2. Buka terminal atau command prompt, lalu arahkan ke direktori folder program ini.

3. Jalankan perintah eksekusi berikut:

```Bash
python main.py
```
## Screenshot Hasil Running Program
Berikut adalah bukti eksekusi fungsionalitas program 
- menambahkan item
- melihat katalog
- pencarian
- peminjaman
- pengembalian

## Tips Pengembangan Lebih Lanjut
1. Penambahan Fitur: Mengembangkan fungsi untuk menghapus item atau membuat sistem denda keterlambatan.

2. Persistensi Data: Menyimpan katalog ke dalam format file eksternal seperti CSV atau JSON agar data tidak hilang saat program ditutup.

3. GUI Interface: Mengubah program dari berbasis terminal (CLI) menjadi berbasis antarmuka grafis menggunakan pustaka seperti Tkinter.

## Author
Nama Lengkap: Dela Puspita Sari
NIM: 123140080
Kelas Praktikum: Praktikum Pemrograman Web (RB)