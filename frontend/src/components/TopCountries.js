import React, { useState, useEffect } from 'react';
import { getTopCountriesByPopulation } from '../services/api';
import './TopCountries.css';

const TopCountries = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchTopCountries();
  }, [limit]);

  const fetchTopCountries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getTopCountriesByPopulation(limit);
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

  if (loading) {
    return <div className="loading">Loading top countries...</div>;
  }

  return (
    <div className="top-countries">
      <div className="top-countries-header">
        <h2>Top Countries by Population</h2>
        <div className="limit-selector">
          <label>Show top:</label>
          <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {error ? (
        <div className="error-message">The resource is not available.</div>
      ) : countries.length === 0 ? (
        <div className="error-message">The resource is not available.</div>
      ) : (
        <div className="top-countries-list">
          {countries.map((country, index) => (
            <div key={country.id} className="top-country-item" onClick={() => onCountrySelect(country)}>
              <div className="rank-badge">#{index + 1}</div>
              <div className="country-flag-small">
                <img src={country.flag} alt={country.name} />
              </div>
              <div className="country-details">
                <h3>{country.name}</h3>
                <p>{country.capital} • {country.continent}</p>
              </div>
              <div className="population-value">
                {country.population.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCountries;

