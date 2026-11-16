from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self.item_id = item_id
        self.title = title
        self._is_dipinjam = False 

    @abstractmethod
    def get_detail(self):
        pass

    @property
    def is_dipinjam(self):
        return self._is_dipinjam

    @is_dipinjam.setter
    def is_dipinjam(self, status):
        self._is_dipinjam = status


class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.author = author

    def get_detail(self):
        status_icon = "✗ Sedang Dipinjam" if self.is_dipinjam else "✓ Tersedia"
        return (f"--- INFORMASI BUKU ---\n"
                f"ID        : {self.item_id}\n"
                f"Judul     : {self.title}\n"
                f"Penulis   : {self.author}\n"
                f"Status    : {status_icon}")


class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.issue_number = issue_number

    def get_detail(self):
        status_icon = "✗ Sedang Dipinjam" if self.is_dipinjam else "✓ Tersedia"
        return (f"--- INFORMASI MAJALAH ---\n"
                f"ID        : {self.item_id}\n"
                f"Judul     : {self.title}\n"
                f"Edisi     : {self.issue_number}\n"
                f"Status    : {status_icon}")