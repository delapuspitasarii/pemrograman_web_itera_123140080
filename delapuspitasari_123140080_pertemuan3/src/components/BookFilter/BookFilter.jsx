import React from 'react';
import PropTypes from 'prop-types';

const BookFilter = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
  return (
    <div className="card" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Cari berdasarkan judul atau penulis..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="Semua">Semua Status</option>
        <option value="Milik">Milik</option>
        <option value="Baca">Sedang Dibaca</option>
        <option value="Beli">Ingin Dibeli</option>
      </select>
    </div>
  );
};

BookFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
};

export default BookFilter;