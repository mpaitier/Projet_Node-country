import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';
import CountryForm from './CountryForm';
import SearchCountries from './SearchCountries';
import CountriesStats from './CountriesStats';
import TopCountries from './TopCountries';
import RecentCountries from './RecentCountries';
import ContinentsView from './ContinentsView';

const Dashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setActiveTab('details');
  };

  const handleCountryCreated = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab('list');
  };

  const handleCountryUpdated = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab('list');
    setSelectedCountry(null);
  };

  const handleCountryDeleted = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab('list');
    setSelectedCountry(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Countries Management</h1>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="dashboard-tabs">
        <button
          className={activeTab === 'list' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('list');
            setSelectedCountry(null);
          }}
        >
          All Countries
        </button>
        <button
          className={activeTab === 'stats' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('stats');
            setSelectedCountry(null);
          }}
        >
          Statistics
        </button>
        <button
          className={activeTab === 'top' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('top');
            setSelectedCountry(null);
          }}
        >
          Top Countries
        </button>
        <button
          className={activeTab === 'recent' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('recent');
            setSelectedCountry(null);
          }}
        >
          Recent
        </button>
        <button
          className={activeTab === 'continents' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('continents');
            setSelectedCountry(null);
          }}
        >
          By Continent
        </button>
        <button
          className={activeTab === 'search' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('search');
            setSelectedCountry(null);
          }}
        >
          Search
        </button>
        <button
          className={activeTab === 'create' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('create');
            setSelectedCountry(null);
          }}
        >
          Add Country
        </button>
        {selectedCountry && (
          <button
            className={activeTab === 'details' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('details')}
          >
            {selectedCountry.name}
          </button>
        )}
      </div>

      <div className="dashboard-content">
        {activeTab === 'list' && (
          <CountriesList
            key={refreshKey}
            onCountrySelect={handleCountrySelect}
            onCountryDeleted={handleCountryDeleted}
          />
        )}
        {activeTab === 'stats' && (
          <CountriesStats />
        )}
        {activeTab === 'top' && (
          <TopCountries
            onCountrySelect={handleCountrySelect}
          />
        )}
        {activeTab === 'recent' && (
          <RecentCountries
            onCountrySelect={handleCountrySelect}
          />
        )}
        {activeTab === 'continents' && (
          <ContinentsView
            onCountrySelect={handleCountrySelect}
          />
        )}
        {activeTab === 'search' && (
          <SearchCountries
            onCountrySelect={handleCountrySelect}
          />
        )}
        {activeTab === 'create' && (
          <CountryForm
            onCountryCreated={handleCountryCreated}
          />
        )}
        {activeTab === 'details' && selectedCountry && (
          <CountryDetails
            country={selectedCountry}
            onCountryUpdated={handleCountryUpdated}
            onCountryDeleted={handleCountryDeleted}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;


