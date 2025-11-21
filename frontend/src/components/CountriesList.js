import React, { useState, useEffect } from 'react';
import { getCountries, deleteCountry } from '../services/api';
import './CountriesList.css';

const CountriesList = ({ onCountrySelect, onCountryDeleted }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getCountries();
      setCountries(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteCountry(id);
        onCountryDeleted();
        fetchCountries();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete country');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading countries...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="countries-list">
      <h2>All Countries ({countries.length})</h2>
      {countries.length === 0 ? (
        <div className="empty-state">No countries found.</div>
      ) : (
        <div className="countries-grid">
          {countries.map((country) => (
            <div key={country.id} className="country-card">
              <div className="country-flag">
                <img src={country.flag} alt={country.name} />
              </div>
              <div className="country-info">
                <h3 onClick={() => onCountrySelect(country)} className="country-name">
                  {country.name}
                </h3>
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Continent:</strong> {country.continent}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              </div>
              <div className="country-actions">
                <button
                  onClick={() => onCountrySelect(country)}
                  className="btn-view"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(country.id, country.name)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesList;


