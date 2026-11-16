from library_item import Book, Magazine
from library import Library

def main():
    perpus_itera = Library()

    # Inisialisasi Data
    buku1 = Book(101, "Pemrograman Web Lanjut", "Dosen ITERA")
    buku2 = Book(102, "Mastering Python OOP", "John Doe")
    majalah1 = Magazine(201, "Jurnal Teknologi Informasi", "Vol. 5 No. 2")

    # [1] Menambahkan Item
    print(f"\n{'='*60}\nPROSES PENAMBAHAN ITEM\n{'='*60}")
    perpus_itera.tambah_item(buku1)
    perpus_itera.tambah_item(buku2)
    perpus_itera.tambah_item(majalah1)

    # [2] Menampilkan Katalog Awal
    perpus_itera.tampilkan_daftar_item()

    # [3] Mencari Item
    perpus_itera.cari_item("Python") 

    # [4] Simulasi Meminjam Item
    perpus_itera.pinjam_item(101) # Meminjam buku berhasil
    perpus_itera.pinjam_item(101) # Meminjam buku yang sama lagi (Gagal divalidasi)

    # Menampilkan katalog setelah peminjaman
    perpus_itera.tampilkan_daftar_item()

    # [5] Simulasi Mengembalikan Item
    perpus_itera.kembalikan_item(101) # Mengembalikan buku berhasil
    perpus_itera.kembalikan_item(201) # Mengembalikan majalah yang tidak dipinjam (Gagal divalidasi)

if __name__ == "__main__":
    main()