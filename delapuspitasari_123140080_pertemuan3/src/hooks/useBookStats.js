import { useMemo } from 'react';

export const useBookStats = (books = []) => {
  return useMemo(() => {
    const total = books.length;
    const milik = books.filter((b) => b.status === 'Milik').length;
    const baca = books.filter((b) => b.status === 'Baca').length;
    const beli = books.filter((b) => b.status === 'Beli').length;

    return { total, milik, baca, beli };
  }, [books]);
};