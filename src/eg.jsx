import React, { useState, useEffect } from 'react';
import './eg.css'; 

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

function DataFetchingComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('popular');
  const [searchTrigger, setSearchTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let apiUrl = '';
      if (searchTrigger && query) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`;
      } else if (category === 'upcoming') {
        apiUrl = `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
      } else if (category === 'top_rated') {
        apiUrl = `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
      } else {
        apiUrl = `${BASE_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`;
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        setData(result.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchTrigger]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setQuery(''); 
    setSearchTrigger(false); 
  };

  const handleSearch = () => {
    setSearchTrigger(true); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => handleCategoryChange('popular')}>Popular Movies</button>
        <button onClick={() => handleCategoryChange('top_rated')}>Top Rated</button>
        <button onClick={() => handleCategoryChange('upcoming')}>Upcoming</button>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </nav>

      <h1>Movie Results</h1>
      <div className="grid-container">
        {data && data.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataFetchingComponent;