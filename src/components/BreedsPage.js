import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BreedsPage.css';

function BreedsPage() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedImages, setBreedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      setLoading(true);
      fetchBreedImages(selectedBreed.id);
    }
  }, [selectedBreed]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % breedImages.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [breedImages]);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/breeds');
      setBreeds(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching breeds:', error);
      setLoading(false);
    }
  };

  const fetchBreedImages = async (breedId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/breed-images?breed_id=${breedId}`);
      setBreedImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching breed images:', error);
      setLoading(false);
    }
  };

  const handleBreedChange = (event) => {
    const breed = breeds.find(b => b.id === event.target.value);
    setSelectedBreed(breed);
    setCurrentImageIndex(0);
  };

  return (
    <div className="breeds-page">
      <div className="breeds-header">
        <span className="breeds-title">Breeds</span>
        <select 
          className="breed-select"
          onChange={handleBreedChange}
          value={selectedBreed?.id || ''}
        >
          <option value="">Select a breed</option>
          {breeds.map(breed => (
            <option key={breed.id} value={breed.id}>{breed.name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="loading-screen">
          <img src="https://thecatapi.com/_app/immutable/assets/thecatapi-cat.74a07522.svg" alt="cat logo" className="loading_cat"/>
        </div>
      ) : selectedBreed && (
        <div className="breed-info">
          <div className="breed-image-container">
            {breedImages.length > 0 && (
              <img 
                src={breedImages[currentImageIndex].url} 
                alt={selectedBreed.name} 
                className="breed-image"
              />
            )}
            <div className="image-indicators">
              {breedImages.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="breed-details">
            <h2>{selectedBreed.name}</h2>
            <p className="breed-origin">{selectedBreed.origin}</p>
            <p className="breed-description">{selectedBreed.description}</p>
            <p className="breed-temperament">
              <strong>Temperament:</strong> {selectedBreed.temperament}
            </p>
            <a href="#!" className="wikipedia-link">WIKIPEDIA</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default BreedsPage;