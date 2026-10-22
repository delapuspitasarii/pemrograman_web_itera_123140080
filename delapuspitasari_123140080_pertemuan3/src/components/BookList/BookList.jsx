import React from 'react';
import PropTypes from 'prop-types';

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return <div className="card"><p style={{ textAlign: 'center' }}>Tidak ada data buku.</p></div>;
  }

  return (
    <div className="card">
      <h3>Daftar Buku ({books.length})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
            <th style={{ padding: '8px' }}>Judul</th>
            <th style={{ padding: '8px' }}>Penulis</th>
            <th style={{ padding: '8px' }}>Status</th>
            <th style={{ padding: '8px', textAlign: 'center' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{book.title}</td>
              <td style={{ padding: '8px' }}>{book.author}</td>
              <td style={{ padding: '8px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  backgroundColor: book.status === 'Milik' ? '#dcfce7' : book.status === 'Baca' ? '#fef3c7' : '#fee2e2',
                  color: book.status === 'Milik' ? '#166534' : book.status === 'Baca' ? '#92400e' : '#991b1b'
                }}>
                  {book.status}
                </span>
              </td>
              <td style={{ padding: '8px', textAlign: 'center' }}>
                <button
                  className="btn btn-warning"
                  style={{ marginRight: '5px' }}
                  onClick={() => onEdit(book)}
                >
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(book.id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;