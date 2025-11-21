# Countries API — ISEN M2 Software Engineering

**Full-Stack Application with React Frontend**

This repository contains a complete Countries Management API with a React frontend, featuring JWT authentication and CRUD operations.

## **Project Overview**

This application consists of:

* **Backend API** - RESTful API for managing countries built with Node.js, Express, and Sequelize
* **React Frontend** - Modern React application with JWT authentication
* **MySQL Database** - Persistent storage using Sequelize ORM

## **Features**

### Backend (API)
* RESTful API for country management (CRUD operations)
* JWT-based authentication
* Sequelize ORM with MySQL
* Input validation and error handling
* CORS enabled for frontend integration

### Frontend (React)
* Secure JWT login system
* Country management dashboard with tabs:
  - **All Countries** - View all countries in a grid
  - **Statistics** - View statistics about countries (total, by continent, population)
  - **Top Countries** - View top countries by population
  - **Recent** - View recently added countries
  - **By Continent** - Browse countries by continent
  - **Search** - Search countries by name
  - **Add Country** - Create new countries
  - **Country Details** - View and edit country information
* Error handling for unavailable resources
* Responsive design
* Modern UI with beautiful styling

## **Technologies**

### Backend
* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT (jsonwebtoken)
* bcrypt for password hashing
* CORS for cross-origin requests

### Frontend
* React 18
* React Router DOM 6
* Axios for API calls
* CSS3

## **Getting Started**

### Prerequisites

* Node.js (v14 or higher)
* MySQL database
* npm or yarn

### Database Setup

1. Create a MySQL database named `countries_db`
2. Update database credentials in `src/db/sequelize.js` if needed:
   - Default: username: `root`, password: `azerty`

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm start
```

The API will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will open in your browser (usually at `http://localhost:3001` if port 3000 is taken by the API)

## **Default Login Credentials**

* **Username:** teiva
* **Password:** azerty

## **API Endpoints**

All endpoints except `/api/login` require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Authentication
* `POST /api/login` - User login (returns JWT token)

### Countries (All require JWT)
* `GET /api/countries` - Get all countries (optional query: `?name=<search>&limit=<number>`)
* `GET /api/countries/:id` - Get country by ID
* `POST /api/countries` - Create new country
* `PUT /api/countries/:id` - Update country
* `DELETE /api/countries/:id` - Delete country
* `GET /api/countries/stats` - Get statistics about countries (total, by continent, population stats)
* `GET /api/countries/continents` - Get list of continents with country counts
* `GET /api/countries/population/top` - Get top countries by population (query: `?limit=<number>`)
* `GET /api/countries/recent` - Get recently created countries (query: `?limit=<number>`)
* `GET /api/countries/by-continent/:continent` - Get countries by continent name

## **Project Structure**

```
.
├── app.js                 # Main Express application
├── package.json           # Backend dependencies
├── src/
│   ├── auth/
│   │   ├── auth.js        # JWT authentication middleware
│   │   └── private_key.js # JWT private key
│   ├── db/
│   │   ├── sequelize.js   # Sequelize configuration
│   │   └── mock-country.js # Mock country data
│   ├── models/
│   │   ├── country.js     # Country model
│   │   └── user.js        # User model
│   └── routes/
│       ├── findAllCountries.js
│       ├── findCountryByPk.js
│       ├── createCountry.js
│       ├── updateCountry.js
│       ├── deleteCountry.js
│       └── login.js
└── frontend/              # React frontend application
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Login.js
        │   ├── Dashboard.js
        │   ├── CountriesList.js
        │   ├── SearchCountries.js
        │   ├── CountryForm.js
        │   └── CountryDetails.js
        ├── services/
        │   └── api.js     # API service layer
        ├── App.js
        └── index.js
```

## **Country Model**

Each country has the following fields:
* `id` - Auto-increment primary key
* `name` - Country name (required, unique, 1-100 characters)
* `capital` - Capital city (required, 1-100 characters)
* `population` - Population number (required, integer, min: 0)
* `flag` - Flag image URL (required, must be valid URL)
* `continent` - Continent name (required, must be one of: Africa, Asia, Europe, North America, South America, Oceania, Antarctica)
* `created` - Creation timestamp

## **Development**

### Backend Development
The backend uses `nodemon` for auto-restart during development. The server will automatically restart when you make changes to the code.

### Frontend Development
The React app uses `react-scripts` for development. The development server includes hot-reload functionality.

## **Database Initialization**

The database is automatically initialized when the backend starts. It creates:
* The `Country` table
* The `User` table
* 12 sample countries
* A default user with username `teiva` and password `azerty`

**Note:** The database is reset (`force: true`) on each server start. Remove this in production!

## **UI Features**

* Beautiful gradient backgrounds
* Responsive card-based layouts
* Smooth transitions and hover effects
* Color-coded actions (edit, delete, view)
* Modal-like detailed views
* Form validation with error messages

## **Author**

Teiva Francis — Full-Stack Developer

## **License**

ISC
