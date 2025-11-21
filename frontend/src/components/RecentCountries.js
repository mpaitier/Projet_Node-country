import React, { useState, useEffect } from 'react';
import { getRecentCountries } from '../services/api';
import './RecentCountries.css';

const RecentCountries = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchRecentCountries();
  }, [limit]);

  const fetchRecentCountries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getRecentCountries(limit);
      if (response.data && response.data.length > 0) {
        setCountries(response.data);
      } else {
        setError('The resource is not available.');
        setCountries([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'The resource is not available.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading recent countries...</div>;
  }

  return (
    <div className="recent-countries">
      <div className="recent-countries-header">
        <h2>Recently Added Countries</h2>
        <div className="limit-selector">
          <label>Show:</label>
          <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      {error ? (
        <div className="error-message">The resource is not available.</div>
      ) : countries.length === 0 ? (
        <div className="error-message">The resource is not available.</div>
      ) : (
        <div className="recent-countries-grid">
          {countries.map((country) => (
            <div 
              key={country.id} 
              className="recent-country-card"
              onClick={() => onCountrySelect(country)}
            >
              <div className="country-flag">
                <img src={country.flag} alt={country.name} />
              </div>
              <div className="country-info">
                <h3>{country.name}</h3>
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Continent:</strong> {country.continent}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p className="created-date">
                  <strong>Added:</strong> {formatDate(country.created)}
                </p>
              </div>
              <button className="btn-view">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentCountries;

