import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BookForm = ({ onSubmit, editingBook, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Milik');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setStatus(editingBook.status);
    } else {
      resetForm();
    }
  }, [editingBook]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setStatus('Milik');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Judul buku wajib diisi!';
    if (!author.trim()) newErrors.author = 'Nama penulis wajib diisi!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingBook) {
      onSubmit({ ...editingBook, title, author, status });
    } else {
      onSubmit({ title, author, status });
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="title-input">Judul Buku:</label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'input-error' : ''}
          style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="author-input">Penulis:</label>
        <input
          id="author-input"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={errors.author ? 'input-error' : ''}
          style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.author && <p className="error-text">{errors.author}</p>}
      </div>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="status-select">Status Buku:</label>
        <select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Milik">Milik (Sudah Dipunyai)</option>
          <option value="Baca">Sedang Dibaca</option>
          <option value="Beli">Ingin Dibeli</option>
        </select>
      </div>

      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {editingBook && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.object,
  onCancelEdit: PropTypes.func,
};

export default BookForm;