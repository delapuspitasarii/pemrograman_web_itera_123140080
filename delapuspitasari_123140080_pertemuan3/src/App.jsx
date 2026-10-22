import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;