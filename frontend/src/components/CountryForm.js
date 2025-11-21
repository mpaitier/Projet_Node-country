import React, { useState } from 'react';
import { createCountry } from '../services/api';
import './CountryForm.css';

const CountryForm = ({ onCountryCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    population: '',
    flag: '',
    continent: 'Europe'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const countryData = {
        ...formData,
        population: parseInt(formData.population)
      };
      const response = await createCountry(countryData);
      setSuccess(response.message || 'Country created successfully!');
      setFormData({
        name: '',
        capital: '',
        population: '',
        flag: '',
        continent: 'Europe'
      });
      setTimeout(() => {
        onCountryCreated();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create country');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="country-form">
      <h2>Add New Country</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Country Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., France"
          />
        </div>

        <div className="form-group">
          <label htmlFor="capital">Capital *</label>
          <input
            type="text"
            id="capital"
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            required
            placeholder="e.g., Paris"
          />
        </div>

        <div className="form-group">
          <label htmlFor="population">Population *</label>
          <input
            type="number"
            id="population"
            name="population"
            value={formData.population}
            onChange={handleChange}
            required
            min="0"
            placeholder="e.g., 67897000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="flag">Flag URL *</label>
          <input
            type="url"
            id="flag"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            required
            placeholder="e.g., https://flagcdn.com/w320/fr.png"
          />
          <small>You can use flagcdn.com for flag URLs</small>
        </div>

        <div className="form-group">
          <label htmlFor="continent">Continent *</label>
          <select
            id="continent"
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
          {loading ? 'Creating...' : 'Create Country'}
        </button>
      </form>
    </div>
  );
};

export default CountryForm;


