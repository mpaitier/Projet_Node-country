import React, { useState } from 'react';
import { getCountries } from '../services/api';
import './SearchCountries.css';

const SearchCountries = ({ onCountrySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(10);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.length < 2) {
      setError('The search term must contain at least 2 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await getCountries(searchTerm, limit);
      setResults(response.data || []);
      if (response.data && response.data.length === 0) {
        setError(`No countries found matching "${searchTerm}"`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-countries">
      <h2>Search Countries</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-row">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter country name..."
            className="search-input"
            required
            minLength={2}
          />
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="limit-select"
          >
            <option value={5}>5 results</option>
            <option value={10}>10 results</option>
            <option value={20}>20 results</option>
            <option value={50}>50 results</option>
          </select>
          <button type="submit" disabled={loading} className="search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {hasSearched && !loading && results.length > 0 && (
        <div className="search-results">
          <h3>Search Results ({results.length})</h3>
          <div className="results-grid">
            {results.map((country) => (
              <div key={country.id} className="result-card">
                <div className="result-flag">
                  <img src={country.flag} alt={country.name} />
                </div>
                <div className="result-info">
                  <h4 onClick={() => onCountrySelect(country)} className="result-name">
                    {country.name}
                  </h4>
                  <p><strong>Capital:</strong> {country.capital}</p>
                  <p><strong>Continent:</strong> {country.continent}</p>
                  <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onCountrySelect(country)}
                  className="btn-view"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCountries;


