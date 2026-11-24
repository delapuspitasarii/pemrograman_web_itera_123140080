# Tugas Praktikum Pemrograman Web — Pertemuan 6
## Aplikasi Manajemen Data Mahasiswa & Mata Kuliah (Pyramid + PostgreSQL)

- **Nama:** Dela Puspitasari
- **NIM:** 123140080
- **Kelas:** RB
- **Mata Kuliah:** Pemrograman Web (ITERA)
- **Topik:** Pertemuan 6 — Backend RESTful API dengan Python Pyramid, SQLAlchemy ORM, Alembic, dan PostgreSQL
---

## Deskripsi Proyek

Proyek ini merupakan implementasi RESTful API menggunakan framework **Python Pyramid** yang terhubung dengan database **PostgreSQL** melalui **SQLAlchemy ORM** dan manajemen migrasi skema menggunakan **Alembic**. Aplikasi ini menyediakan layanan CRUD (Create, Read, Update, Delete) berbasis JSON untuk entitas **Mahasiswa** (materi praktikum) dan **Matakuliah** (tugas mandiri).

### Struktur Direktori
```text
delapuspitasari_123140080_pertemuan6/
├── pyramid_mahasiswa/
│   ├── development.ini
│   ├── setup.py
│   └── pyramid_mahasiswa/
│       ├── __init__.py
│       ├── routes.py
│       ├── alembic/
│       │   └── versions/
│       ├── models/
│       │   ├── __init__.py
│       │   ├── meta.py
│       │   ├── mahasiswa.py
│       │   └── matakuliah.py
│       ├── scripts/
│       │   └── initialize_db.py
│       └── views/
│           ├── default.py
│           ├── mahasiswa.py
│           └── matakuliah.py
├── screenshots/
└── README.md
```

---

## Spesifikasi Tabel & Model Database

### 1. Tabel `mahasiswa`
| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `Integer` | Primary Key, Auto-increment |
| `nim` | `Text` | Unique, Not Null |
| `nama` | `Text` | Not Null |
| `jurusan` | `Text` | Not Null |
| `tanggal_lahir` | `Date` | Format `YYYY-MM-DD` (Nullable) |
| `alamat` | `Text` | Alamat lengkap (Nullable) |

### 2. Tabel `matakuliah`
| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `Integer` | Primary Key, Auto-increment |
| `kode_mk` | `Text` | Unique, Not Null (contoh: `IF2110`) |
| `nama_mk` | `Text` | Not Null |
| `sks` | `Integer` | Not Null, bilangan bulat positif (`> 0`) |
| `semester` | `Integer` | Not Null, bilangan bulat positif (`> 0`) |

---

## Cara Instalasi & Menjalankan Aplikasi

1. **Aktifkan Virtual Environment & Instal Dependensi**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   cd pyramid_mahasiswa
   pip install -e ".[testing]"
   pip install psycopg2-binary "psycopg[binary]"
   ```

2. **Konfigurasi Database PostgreSQL**
   Buat database `pyramid_mahasiswa` dan user `pyramid_user` di PostgreSQL, lalu sesuaikan `sqlalchemy.url` pada `development.ini`:
   ```ini
   sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
   ```

3. **Jalankan Migrasi Alembic & Seeding Data Awal**
   ```bash
   alembic -c development.ini upgrade head
   python -m pyramid_mahasiswa.scripts.initialize_db development.ini
   ```

4. **Jalankan Server Pyramid**
   ```bash
   pserve development.ini --reload
   ```
   Server akan berjalan pada `http://localhost:6543`.

---

## Dokumentasi Endpoint API

### Endpoint Mata Kuliah (`/api/matakuliah`)
| Method | Endpoint | Deskripsi | Status Sukses / Error |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/matakuliah` | Mengambil seluruh daftar mata kuliah | `200 OK` |
| `GET` | `/api/matakuliah/{id}` | Mengambil detail mata kuliah berdasarkan ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/matakuliah` | Menambahkan data mata kuliah baru | `200 OK` / `400 Bad Request` |
| `PUT` | `/api/matakuliah/{id}` | Memperbarui data mata kuliah berdasarkan ID | `200 OK` / `400` / `404` |
| `DELETE` | `/api/matakuliah/{id}` | Menghapus data mata kuliah berdasarkan ID | `200 OK` / `404 Not Found` |

### Endpoint Mahasiswa (`/api/mahasiswa`)
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/mahasiswa` | Mengambil seluruh daftar mahasiswa |
| `GET` | `/api/mahasiswa/{id}` | Mengambil detail mahasiswa berdasarkan ID |
| `POST` | `/api/mahasiswa` | Menambahkan data mahasiswa baru |
| `PUT` | `/api/mahasiswa/{id}` | Memperbarui data mahasiswa berdasarkan ID |
| `DELETE` | `/api/mahasiswa/{id}` | Menghapus data mahasiswa berdasarkan ID |

---

## Hasil Pengujian API (Screenshots)

### 1. GET All Matakuliah (`GET /api/matakuliah`)
![GET All Matakuliah](screenshots/1_get_all.png)

### 2. GET Detail Matakuliah (`GET /api/matakuliah/1`)
![GET Detail Matakuliah](screenshots/2_get_detail.png)

### 3. POST Tambah Matakuliah Baru (`POST /api/matakuliah`)
![POST Create Matakuliah](screenshots/3_post_create.png)

### 4. POST Uji Validasi Error (`sks <= 0` $\rightarrow$ `400 Bad Request`)
![POST Validation Error](screenshots/4_post_validation_error.png)

### 5. PUT Update Matakuliah (`PUT /api/matakuliah/4`)
![PUT Update Matakuliah](screenshots/5_put_update.png)

### 6. DELETE Hapus Matakuliah (`DELETE /api/matakuliah/4`)
![DELETE Matakuliah](screenshots/6_delete.png)

### 7. GET Detail Matakuliah Setelah Dihapus (`404 Not Found`)
![GET Not Found](screenshots/7_get_not_found.png)