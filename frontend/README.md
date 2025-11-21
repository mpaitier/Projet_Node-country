# Countries Frontend

React frontend application for managing countries. This application connects to the Countries API and requires JWT authentication to access all endpoints.

## Features

- 🔐 **JWT Authentication** - Secure login system
- 🌍 **Country Management** - View, create, update, and delete countries
- 🔍 **Search Functionality** - Search countries by name
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful and intuitive interface

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- The Countries API should be running on `http://localhost:3000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000` (if available, otherwise it will use port 3001 or the next available port).

## Default Login Credentials

- **Username:** teiva
- **Password:** azerty

## Features Overview

### Login Page
- Secure authentication with JWT token generation
- Token is stored in localStorage for session persistence

### Dashboard Tabs

1. **All Countries** - View all countries in a grid layout
   - Click on a country to view details
   - Delete countries directly from the list

2. **Search** - Search for countries by name
   - Minimum 2 characters required
   - Configurable result limit

3. **Add Country** - Create new countries
   - All fields are validated
   - Supports all continents

4. **Country Details** - View and edit country information
   - Edit mode for updating country data
   - Delete functionality

## API Endpoints

The frontend connects to the following API endpoints:

- `POST /api/login` - User authentication
- `GET /api/countries` - Get all countries (requires JWT)
- `GET /api/countries/:id` - Get country by ID (requires JWT)
- `POST /api/countries` - Create new country (requires JWT)
- `PUT /api/countries/:id` - Update country (requires JWT)
- `DELETE /api/countries/:id` - Delete country (requires JWT)

All endpoints except `/api/login` require a valid JWT token in the Authorization header.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js          # Login component
│   │   ├── Dashboard.js      # Main dashboard with tabs
│   │   ├── CountriesList.js  # List all countries
│   │   ├── SearchCountries.js # Search functionality
│   │   ├── CountryForm.js    # Create new country
│   │   └── CountryDetails.js # View/Edit country
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── App.js                # Main app component
│   ├── App.css
│   ├── index.js              # Entry point
│   └── index.css
└── package.json
```

## Technologies Used

- React 18
- React Router DOM 6
- Axios for API calls
- CSS3 for styling

## Notes

- Make sure the backend API is running before starting the frontend
- JWT tokens expire after 24 hours
- Tokens are automatically cleared on 401 errors (unauthorized)


