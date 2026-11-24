import argparse
from datetime import date
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError
import transaction

from .. import models


def setup_models(dbsession):
    """Menambahkan data awal (seeding) mahasiswa dan matakuliah."""
    if dbsession.query(models.Mahasiswa).count() == 0:
        mhs1 = models.Mahasiswa(
            nim='12345',
            nama='Budi Santoso',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(2000, 5, 15),
            alamat='Jl. Merdeka No. 123, Bandung',
        )
        mhs2 = models.Mahasiswa(
            nim='54321',
            nama='Siti Aminah',
            jurusan='Sistem Informasi',
            tanggal_lahir=date(2001, 8, 22),
            alamat='Jl. Mawar No. 45, Jakarta',
        )
        dbsession.add_all([mhs1, mhs2])

    if dbsession.query(models.Matakuliah).count() == 0:
        mk1 = models.Matakuliah(
            kode_mk='IF2110',
            nama_mk='Algoritma dan Struktur Data',
            sks=4,
            semester=3,
        )
        mk2 = models.Matakuliah(
            kode_mk='IF3140',
            nama_mk='Sistem Basis Data',
            sks=3,
            semester=5,
        )
        mk3 = models.Matakuliah(
            kode_mk='IF3110',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=5,
        )
        dbsession.add_all([mk1, mk2, mk3])


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with transaction.manager:
            dbsession = models.get_tm_session(
                env['registry']['dbsession_factory'],
                transaction.manager,
            )
            setup_models(dbsession)
            print('Berhasil memasukkan data seeding awal!')
    except OperationalError:
        print('Pyramid gagal terhubung ke database SQL.')
        print(
            'Pastikan service PostgreSQL berjalan dan connection string '
            'di development.ini benar.'
        )
    finally:
        env['closer']()


if __name__ == '__main__':
    main()