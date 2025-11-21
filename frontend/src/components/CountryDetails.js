import React, { useState } from 'react';
import { updateCountry, deleteCountry } from '../services/api';
import './CountryDetails.css';

const CountryDetails = ({ country, onCountryUpdated, onCountryDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: country.name,
    capital: country.capital,
    population: country.population,
    flag: country.flag,
    continent: country.continent
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'population' ? parseInt(value) || 0 : value
    }));
    setError('');
    setSuccess('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await updateCountry(country.id, formData);
      setSuccess(response.message || 'Country updated successfully!');
      setIsEditing(false);
      setTimeout(() => {
        onCountryUpdated();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update country');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${country.name}?`)) {
      try {
        await deleteCountry(country.id);
        onCountryDeleted();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete country');
      }
    }
  };

  return (
    <div className="country-details">
      <h2>Country Details</h2>
      <div className="details-header">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-edit"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className="btn-delete"
        >
          Delete
        </button>
      </div>

      {!isEditing ? (
        <div className="details-view">
          <div className="flag-large">
            <img src={country.flag} alt={country.name} />
          </div>
          <div className="details-info">
            <h3>{country.name}</h3>
            <div className="detail-item">
              <strong>Capital:</strong> {country.capital}
            </div>
            <div className="detail-item">
              <strong>Continent:</strong> {country.continent}
            </div>
            <div className="detail-item">
              <strong>Population:</strong> {country.population.toLocaleString()}
            </div>
            <div className="detail-item">
              <strong>Created:</strong> {new Date(country.created).toLocaleDateString()}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-group">
            <label htmlFor="edit-name">Country Name *</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-capital">Capital *</label>
            <input
              type="text"
              id="edit-capital"
              name="capital"
              value={formData.capital}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-population">Population *</label>
            <input
              type="number"
              id="edit-population"
              name="population"
              value={formData.population}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-flag">Flag URL *</label>
            <input
              type="url"
              id="edit-flag"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-continent">Continent *</label>
            <select
              id="edit-continent"
              name="continent"
              value={formData.continent}
              onChange={handleChange}
              required
            >
              {continents.map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Updating...' : 'Update Country'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CountryDetails;


