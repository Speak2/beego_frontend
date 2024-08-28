import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VotingPage from './components/VotingPage';
import BreedsPage from './components/BreedsPage';
import FavoritesPage from './components/FavoritesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Voting</Link></li>
            <li><Link to="/breeds">Breeds</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/breeds" element={<BreedsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;