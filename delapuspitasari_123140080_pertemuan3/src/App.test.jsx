import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import App from './App';

describe('Aplikasi Manajemen Buku - Integration Testing', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('1. Merender judul navbar dengan benar', () => {
    render(<App />);
    expect(screen.getByText('📚 BookManager')).toBeInTheDocument();
  });

  it('2. Menampilkan pesan error validasi jika input form kosong saat disubmit', () => {
    render(<App />);
    const submitBtn = screen.getByText('Tambah Buku');
    fireEvent.click(submitBtn);

    expect(screen.getByText('Judul buku wajib diisi!')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi!')).toBeInTheDocument();
  });

  it('3. Berhasil menambahkan buku baru ke dalam daftar', () => {
    render(<App />);
    
    fireEvent.change(screen.getByLabelText(/Judul Buku:/i), { target: { value: 'Laskar Pelangi' } });
    fireEvent.change(screen.getByLabelText(/Penulis:/i), { target: { value: 'Andrea Hirata' } });
    fireEvent.click(screen.getByText('Tambah Buku'));

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('Andrea Hirata')).toBeInTheDocument();
  });

  it('4. Mampu melakukan pencarian/filter berdasarkan judul buku', () => {
    render(<App />);
    
    fireEvent.change(screen.getByLabelText(/Judul Buku:/i), { target: { value: 'Bumi Manusia' } });
    fireEvent.change(screen.getByLabelText(/Penulis:/i), { target: { value: 'Pramoedya' } });
    fireEvent.click(screen.getByText('Tambah Buku'));

    const searchInput = screen.getByPlaceholderText(/Cari berdasarkan judul/i);
    fireEvent.change(searchInput, { target: { value: 'Bumi' } });

    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Tidak Ada' } });
    expect(screen.queryByText('Bumi Manusia')).not.toBeInTheDocument();
  });

  it('5. Navigasi ke halaman Statistik berfungsi dengan baik', () => {
    render(<App />);
    const statsLink = screen.getByText('Statistik');
    fireEvent.click(statsLink);

    expect(screen.getByText('Statistik Koleksi Buku')).toBeInTheDocument();
  });
});