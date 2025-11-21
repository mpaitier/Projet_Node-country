import React, { useState, useEffect } from 'react';
import { getContinents, getCountriesByContinent } from '../services/api';
import './ContinentsView.css';

const ContinentsView = ({ onCountrySelect }) => {
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContinents();
  }, []);

  useEffect(() => {
    if (selectedContinent) {
      fetchCountriesByContinent(selectedContinent);
    }
  }, [selectedContinent]);

  const fetchContinents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getContinents();
      if (response.data && response.data.length > 0) {
        setContinents(response.data);
      } else {
        setError('The resource is not available.');
        setContinents([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'The resource is not available.');
      setContinents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesByContinent = async (continent) => {
    setCountriesLoading(true);
    setError('');
    try {
      const response = await getCountriesByContinent(continent);
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
      setCountriesLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading continents...</div>;
  }

  return (
    <div className="continents-view">
      <h2>Countries by Continent</h2>
      {error && continents.length === 0 ? (
        <div className="error-message">The resource is not available.</div>
      ) : (
        <>
          <div className="continents-list">
            {continents.map((continent) => (
              <button
                key={continent.name}
                className={`continent-button ${selectedContinent === continent.name ? 'active' : ''}`}
                onClick={() => setSelectedContinent(continent.name)}
              >
                <span className="continent-name">{continent.name}</span>
                <span className="continent-count">{continent.count}</span>
              </button>
            ))}
          </div>
          {selectedContinent && (
            <div className="countries-section">
              <h3>Countries in {selectedContinent}</h3>
              {countriesLoading ? (
                <div className="loading">Loading countries...</div>
              ) : error && countries.length === 0 ? (
                <div className="error-message">The resource is not available.</div>
              ) : countries.length === 0 ? (
                <div className="error-message">The resource is not available.</div>
              ) : (
                <div className="countries-grid">
                  {countries.map((country) => (
                    <div
                      key={country.id}
                      className="country-card"
                      onClick={() => onCountrySelect(country)}
                    >
                      <div className="country-flag">
                        <img src={country.flag} alt={country.name} />
                      </div>
                      <div className="country-info">
                        <h4>{country.name}</h4>
                        <p><strong>Capital:</strong> {country.capital}</p>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                      </div>
                      <button className="btn-view">View</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContinentsView;

