import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  return (
    <div className="favorites-page">

      <h1>Favorite Cats</h1>
      <div className="content">
        <div className="view-controls">
          <button
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span className="icon">▦</span>
          </button>
          <button
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <span className="icon">☰</span>
          </button>
        </div>
        <div className={`favorites-container ${viewMode}`}>
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <img src={favorite.url} alt="Favorite cat" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;