import React, { useState, useEffect } from 'react';
import { getCountriesStats } from '../services/api';
import './CountriesStats.css';

const CountriesStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getCountriesStats();
      if (response.data) {
        setStats(response.data);
      } else {
        setError('The resource is not available.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'The resource is not available.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (error) {
    return <div className="error-message">The resource is not available.</div>;
  }

  if (!stats) {
    return <div className="error-message">The resource is not available.</div>;
  }

  return (
    <div className="countries-stats">
      <h2>Countries Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Countries</h3>
          <p className="stat-value">{stats.total || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Population</h3>
          <p className="stat-value">{(stats.totalPopulation || 0).toLocaleString()}</p>
        </div>
        {stats.mostPopulated && (
          <div className="stat-card">
            <h3>Most Populated</h3>
            <p className="stat-value">{stats.mostPopulated.name}</p>
            <p className="stat-detail">{(stats.mostPopulated.population || 0).toLocaleString()}</p>
          </div>
        )}
        {stats.leastPopulated && (
          <div className="stat-card">
            <h3>Least Populated</h3>
            <p className="stat-value">{stats.leastPopulated.name}</p>
            <p className="stat-detail">{(stats.leastPopulated.population || 0).toLocaleString()}</p>
          </div>
        )}
      </div>
      <div className="continents-breakdown">
        <h3>Countries by Continent</h3>
        {stats.byContinent && Object.keys(stats.byContinent).length > 0 ? (
          <div className="continents-list">
            {Object.entries(stats.byContinent).map(([continent, count]) => (
              <div key={continent} className="continent-item">
                <span className="continent-name">{continent}</span>
                <span className="continent-count">{count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No continent data available.</p>
        )}
      </div>
    </div>
  );
};

export default CountriesStats;

