import React from 'react';
import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';

const Stats = () => {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div className="card">
      <h2>Statistik Koleksi Buku</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '20px' }}>
        <div style={{ background: '#e0f2fe', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Total Buku</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.total}</p>
        </div>
        <div style={{ background: '#dcfce7', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Buku Dimiliki</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.milik}</p>
        </div>
        <div style={{ background: '#fef3c7', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Sedang Dibaca</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.baca}</p>
        </div>
        <div style={{ background: '#fee2e2', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Ingin Dibeli</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.beli}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;