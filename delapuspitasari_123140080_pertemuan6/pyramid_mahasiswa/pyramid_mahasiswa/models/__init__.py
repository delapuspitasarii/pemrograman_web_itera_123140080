from sqlalchemy import engine_from_config
from sqlalchemy.orm import configure_mappers, sessionmaker
import zope.sqlalchemy

from .mahasiswa import Mahasiswa
from .matakuliah import Matakuliah
from .mymodel import MyModel

configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """Mendapatkan SQLAlchemy Session yang terikat dengan zope.sqlalchemy."""
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager
    )
    return dbsession


def includeme(config):
    """Inisialisasi konfigurasi database saat Pyramid startup."""
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry['dbsession_factory'] = session_factory

    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True,
    )