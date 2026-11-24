from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models import Matakuliah


def _validate_positive_int(value, field_name):
    """Memastikan nilai bertipe integer dan bernilai lebih dari 0."""
    if isinstance(value, bool) or not isinstance(value, int) or value <= 0:
        raise ValueError(
            f'Field {field_name} harus berupa bilangan bulat positif (> 0)!'
        )
    return value


def _parse_id(raw_id):
    """Mengonversi parameter ID dari URL (string) menjadi integer."""
    try:
        return int(raw_id)
    except (TypeError, ValueError):
        return None


@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data mata kuliah."""
    dbsession = request.dbsession
    matakuliahs = (
        dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    )
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}


@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu mata kuliah berdasarkan ID di URL."""
    mk_id = _parse_id(request.matchdict['id'])
    if mk_id is None:
        return HTTPNotFound(
            json_body={'error': 'ID matakuliah tidak valid atau tidak ditemukan'}
        )

    dbsession = request.dbsession
    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if matakuliah is None:
        return HTTPNotFound(
            json_body={
                'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'
            }
        )

    return {'matakuliah': matakuliah.to_dict()}


@view_config(
    route_name='matakuliah_add', request_method='POST', renderer='json'
)
def matakuliah_add(request):
    """View untuk menambahkan mata kuliah baru dari payload JSON."""
    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(
            json_body={'error': 'Payload JSON tidak valid!'}
        )

    required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
    for field in required_fields:
        if field not in json_data or json_data[field] in (None, ''):
            return HTTPBadRequest(
                json_body={'error': f'Field {field} wajib diisi!'}
            )

    try:
        sks = _validate_positive_int(json_data['sks'], 'sks')
        semester = _validate_positive_int(json_data['semester'], 'semester')
    except ValueError as e:
        return HTTPBadRequest(json_body={'error': str(e)})

    kode_mk = str(json_data['kode_mk']).strip()
    nama_mk = str(json_data['nama_mk']).strip()
    if not kode_mk or not nama_mk:
        return HTTPBadRequest(
            json_body={'error': 'Field kode_mk dan nama_mk tidak boleh kosong!'}
        )

    matakuliah = Matakuliah(
        kode_mk=kode_mk,
        nama_mk=nama_mk,
        sks=sks,
        semester=semester,
    )

    dbsession = request.dbsession
    try:
        dbsession.add(matakuliah)
        dbsession.flush()
    except IntegrityError:
        dbsession.rollback()
        return HTTPBadRequest(
            json_body={'error': f'Kode mata kuliah {kode_mk} sudah terdaftar!'}
        )

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


@view_config(
    route_name='matakuliah_update', request_method='PUT', renderer='json'
)
def matakuliah_update(request):
    """View untuk memperbarui data mata kuliah berdasarkan ID."""
    mk_id = _parse_id(request.matchdict['id'])
    if mk_id is None:
        return HTTPNotFound(
            json_body={'error': 'ID matakuliah tidak valid atau tidak ditemukan'}
        )

    dbsession = request.dbsession
    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if matakuliah is None:
        return HTTPNotFound(
            json_body={
                'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'
            }
        )

    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(
            json_body={'error': 'Payload JSON tidak valid!'}
        )

    try:
        if 'kode_mk' in json_data:
            kode_mk = str(json_data['kode_mk']).strip()
            if not kode_mk:
                return HTTPBadRequest(
                    json_body={'error': 'Field kode_mk tidak boleh kosong!'}
                )
            matakuliah.kode_mk = kode_mk

        if 'nama_mk' in json_data:
            nama_mk = str(json_data['nama_mk']).strip()
            if not nama_mk:
                return HTTPBadRequest(
                    json_body={'error': 'Field nama_mk tidak boleh kosong!'}
                )
            matakuliah.nama_mk = nama_mk

        if 'sks' in json_data:
            matakuliah.sks = _validate_positive_int(json_data['sks'], 'sks')

        if 'semester' in json_data:
            matakuliah.semester = _validate_positive_int(
                json_data['semester'], 'semester'
            )

        dbsession.flush()
    except ValueError as e:
        return HTTPBadRequest(json_body={'error': str(e)})
    except IntegrityError:
        dbsession.rollback()
        return HTTPBadRequest(
            json_body={'error': 'Kode mata kuliah sudah digunakan!'}
        )

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


@view_config(
    route_name='matakuliah_delete', request_method='DELETE', renderer='json'
)
def matakuliah_delete(request):
    """View untuk menghapus mata kuliah berdasarkan ID."""
    mk_id = _parse_id(request.matchdict['id'])
    if mk_id is None:
        return HTTPNotFound(
            json_body={'error': 'ID matakuliah tidak valid atau tidak ditemukan'}
        )

    dbsession = request.dbsession
    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if matakuliah is None:
        return HTTPNotFound(
            json_body={
                'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'
            }
        )

    dbsession.delete(matakuliah)
    return {
        'success': True,
        'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus',
    }