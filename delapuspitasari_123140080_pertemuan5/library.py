from library_item import LibraryItem

class Library:
    def __init__(self):
        self.__koleksi = [] 

    # Fitur 1: Menambahkan Item
    def tambah_item(self, item):
        if isinstance(item, LibraryItem):
            self.__koleksi.append(item)
            print(f"✓ Berhasil: '{item.title}' ditambahkan ke perpustakaan.")
        else:
            print("✗ Gagal: Item tidak dikenali.")

    # Fitur 2: Menampilkan Katalog
    def tampilkan_daftar_item(self):
        print(f"\n{'='*60}\nKATALOG PERPUSTAKAAN\n{'='*60}")
        if not self.__koleksi:
            print("Katalog masih kosong.")
            return
        
        for item in self.__koleksi:
            print(item.get_detail())
            print() 
        print("-" * 60)

    # Fitur 3: Mencari Item
    def cari_item(self, keyword):
        print(f"\n{'-'*60}\nHASIL PENCARIAN: '{keyword}'\n{'-'*60}")
        ditemukan = False
        for item in self.__koleksi:
            if keyword == str(item.item_id) or keyword.lower() in item.title.lower():
                print(item.get_detail())
                print()
                ditemukan = True
                
        if not ditemukan:
            print(f"✗ Item dengan kata kunci '{keyword}' tidak ditemukan di sistem.")

    # Fitur 4: Meminjam Item (BARU)
    def pinjam_item(self, item_id):
        print(f"\n--- Proses Peminjaman ID: {item_id} ---")
        for item in self.__koleksi:
            if str(item.item_id) == str(item_id):
                if not item.is_dipinjam:
                    item.is_dipinjam = True
                    print(f"✓ Berhasil: Anda telah meminjam '{item.title}'.")
                else:
                    print(f"✗ Gagal: '{item.title}' saat ini sedang dipinjam orang lain.")
                return
        print(f"✗ Gagal: Item dengan ID {item_id} tidak ditemukan.")

    # Fitur 5: Mengembalikan Item (BARU)
    def kembalikan_item(self, item_id):
        print(f"\n--- Proses Pengembalian ID: {item_id} ---")
        for item in self.__koleksi:
            if str(item.item_id) == str(item_id):
                if item.is_dipinjam:
                    item.is_dipinjam = False
                    print(f"✓ Berhasil: '{item.title}' telah dikembalikan ke perpustakaan.")
                else:
                    print(f"✗ Gagal: '{item.title}' memang sudah berstatus tersedia.")
                return
        print(f"✗ Gagal: Item dengan ID {item_id} tidak ditemukan.")