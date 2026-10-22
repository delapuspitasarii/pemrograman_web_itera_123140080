import React from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';

const Home = () => {
  const {
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
  } = useBooks();

  return (
    <div>
      <BookFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <BookForm
        onSubmit={editingBook ? updateBook : addBook}
        editingBook={editingBook}
        onCancelEdit={() => setEditingBook(null)}
      />
      <BookList
        books={filteredBooks}
        onEdit={(book) => setEditingBook(book)}
        onDelete={deleteBook}
      />
    </div>
  );
};

export default Home;