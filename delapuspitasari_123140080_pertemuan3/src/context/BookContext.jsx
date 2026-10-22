import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books_data_v1', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now().toString() }]);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'Semua' || book.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        addBook,
        updateBook,
        deleteBook,
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        editingBook,
        setEditingBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBooks = () => useContext(BookContext);