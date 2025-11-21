# Backend Specifications - Countries Management API

## Objective

Build a complete RESTful API for countries management with JWT authentication. The API must allow CRUD (Create, Read, Update, Delete) operations on a `Country` resource with a secure authentication system.

---

## Data Models

### `Country` Model

You must create a `Country` model with the following fields:

#### Required fields:

1. **`id`** (INTEGER)
   - Primary key
   - Auto-incremented

2. **`name`** (STRING)
   - Required (non null)
   - Unique in the database
   - Validation: between 1 and 100 characters
   - Validation: must contain only letters, spaces, hyphens, and apostrophes
   - Error message if empty: "Name cannot be empty."
   - Error message if null: "Name is a required property."
   - Error message if invalid length: "Name must contain between 1 and 100 characters."
   - Error message if invalid format: "Name must contain only letters, spaces, hyphens, and apostrophes."
   - Error message if duplicate: "The name already exists."

3. **`capital`** (STRING)
   - Required (non null)
   - Validation: between 1 and 100 characters
   - Error message if empty: "Capital cannot be empty."
   - Error message if null: "Capital is a required property."
   - Error message if invalid length: "Capital must contain between 1 and 100 characters."

4. **`population`** (INTEGER)
   - Required (non null)
   - Validation: must be an integer
   - Validation: minimum 0
   - Validation: maximum 9,999,999,999
   - Error message if not an integer: "Population must be an integer number."
   - Error message if < 0: "Population must be at least 0."
   - Error message if > max: "Population cannot exceed 9,999,999,999."
   - Error message if null: "Population is a required property."

5. **`flag`** (STRING)
   - Required (non null)
   - Validation: must be a valid URL
   - Error message if invalid URL: "Use only a valid URL for the flag image."
   - Error message if null: "Flag is a required property."

6. **`continent`** (STRING)
   - Required (non null)
   - Validation: must be one of the following continents:
     - Africa
     - Asia
     - Europe
     - North America
     - South America
     - Oceania
     - Antarctica
   - Error message if invalid value: "Continent must be one of: Africa, Asia, Europe, North America, South America, Oceania, Antarctica"
   - Error message if null: "Continent is a required property."

7. **`created`** (TIMESTAMP)
   - Automatic creation timestamp
   - Do not update on modifications

### `User` Model

You must create a `User` model with the following fields:

1. **`id`** (INTEGER)
   - Primary key
   - Auto-incremented
   - Unique

2. **`username`** (STRING)
   - Required (non null)

3. **`password`** (STRING)
   - Required (non null)
   - **Important**: The password must be hashed with bcrypt before storage

---

## Authentication

### JWT System

The API must implement an authentication system based on JWT (JSON Web Tokens).

#### Authentication Middleware

You must create an authentication middleware that:

1. Checks for the presence of an `Authorization` header in the request
2. Extracts the token from the `Bearer <token>` format
3. Verifies the token validity (signature, expiration)
4. Handles the following errors:
   - Missing token: "No authentication token provided. Please include one in the Authorization header."
   - Invalid format: "Invalid token format. Please use: Authorization: Bearer <token>"
   - Expired token: "Token expired. Please login again."
   - Invalid token: "Invalid token format. Please login again."
   - Invalid token (general): "Invalid token. Please login again."
5. Stores the user ID in the request (`req.userId`) if the token is valid
6. Verifies that the `userId` in the body matches the one in the token (if present)

#### Login Endpoint

The login endpoint must:

1. Receive `username` and `password` in the request body
2. Search for the user by username
3. Check if the user exists
   - If not: return 404 with the message "The requested user does not exist."
4. Compare the provided password with the stored hash
   - If incorrect: return 401 with the message "The password is incorrect."
5. If credentials are correct:
   - Generate a JWT token containing the `userId`
   - The token must expire after 24 hours
   - Return 200 with the message "User successfully logged in.", user data and the token
6. Handle server errors: "The user could not be logged in. Please try again later."

---

## API Endpoints

### Authentication

#### `POST /api/login`
- **Authentication**: Not required (public endpoint)
- **Body**: 
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: Successful login with token
  - `404`: User not found
  - `401`: Incorrect password
  - `500`: Server error

### Countries Management

**All following endpoints require valid JWT authentication.**

#### `GET /api/countries`
- **Authentication**: Required
- **Optional query parameters**:
  - `name` (string): Search by name (partial search, case-insensitive)
    - If provided, must contain at least 2 characters
    - If < 2 characters: return 400 with "The search term must contain at least 2 characters."
  - `limit` (integer): Limits the number of results (default: 5)
- **Behavior**:
  - If `name` is provided: search for countries whose name contains the string
  - If `name` is not provided: return all countries
  - Sort results by name (alphabetical order)
  - Return the total number of matching results if searching
- **Responses**:
  - `200`: List of countries with appropriate message
  - `400`: Invalid search parameter
  - `401`: Missing or invalid token
  - `500`: Server error

#### `GET /api/countries/:id`
- **Authentication**: Required
- **Parameters**: `id` (integer) in the URL
- **Behavior**: Return the country corresponding to the ID
- **Responses**:
  - `200`: Country found with message "The country has been found"
  - `404`: Country not found with message "The country requested does not exist. Try another id."
  - `401`: Missing or invalid token
  - `500`: Server error with message "The country could not be retrieved. Please try later."

#### `POST /api/countries`
- **Authentication**: Required
- **Body**: JSON object with Country model fields (except `id` and `created`)
- **Behavior**: Create a new country
- **Validation**: All model validations must be applied
- **Responses**:
  - `200`: Country created with message "The country {name} has been successfully created."
  - `400`: Validation error (ValidationError or UniqueConstraintError)
  - `401`: Missing or invalid token
  - `500`: Server error with message "The country could not be created. Please try again later."

#### `PUT /api/countries/:id`
- **Authentication**: Required
- **Parameters**: `id` (integer) in the URL
- **Body**: JSON object with fields to update
- **Behavior**: Update the country corresponding to the ID
- **Validation**: All model validations must be applied
- **Responses**:
  - `200`: Country updated with message "The country {name} has been successfully updated."
  - `400`: Validation error (ValidationError or UniqueConstraintError)
  - `404`: Country not found with message "The requested country does not exist. Please try again with another ID."
  - `401`: Missing or invalid token
  - `500`: Server error with message "The country could not be updated. Please try again later."

#### `DELETE /api/countries/:id`
- **Authentication**: Required
- **Parameters**: `id` (integer) in the URL
- **Behavior**: Delete the country corresponding to the ID
- **Responses**:
  - `200`: Country deleted with message "The country with ID {id} was successfully deleted."
  - `404`: Country not found with message "The requested country does not exist. Try another ID."
  - `401`: Missing or invalid token
  - `500`: Server error with message "The country could not be deleted. Please try again in a moment."

#### `GET /api/countries/stats`
- **Authentication**: Required
- **Behavior**: Return statistics about all countries including total count, count by continent, total population, most and least populated countries
- **Responses**:
  - `200`: Statistics retrieved with message "Statistics retrieved successfully."
  - `401`: Missing or invalid token
  - `500`: Server error with message "The statistics could not be retrieved. Please try again later."

#### `GET /api/countries/continents`
- **Authentication**: Required
- **Behavior**: Return list of all continents with country counts for each
- **Responses**:
  - `200`: Continents list retrieved with message "Continents retrieved successfully." or "No continents found."
  - `401`: Missing or invalid token
  - `500`: Server error with message "The continents list could not be retrieved. Please try again later."

#### `GET /api/countries/population/top`
- **Authentication**: Required
- **Query parameters**:
  - `limit` (integer, optional): Number of top countries to return (default: 10, min: 1, max: 50)
- **Behavior**: Return top countries ordered by population (descending)
- **Responses**:
  - `200`: Top countries retrieved with message "Top {count} countries by population retrieved successfully." or "No countries found."
  - `400`: Invalid limit parameter with message "Limit must be between 1 and 50."
  - `401`: Missing or invalid token
  - `500`: Server error with message "The top countries could not be retrieved. Please try again later."

#### `GET /api/countries/recent`
- **Authentication**: Required
- **Query parameters**:
  - `limit` (integer, optional): Number of recent countries to return (default: 5, min: 1, max: 20)
- **Behavior**: Return recently created countries ordered by creation date (descending)
- **Responses**:
  - `200`: Recent countries retrieved with message "Recent {count} countries retrieved successfully." or "No recent countries found."
  - `400`: Invalid limit parameter with message "Limit must be between 1 and 20."
  - `401`: Missing or invalid token
  - `500`: Server error with message "The recent countries could not be retrieved. Please try again later."

#### `GET /api/countries/by-continent/:continent`
- **Authentication**: Required
- **Parameters**: `continent` (string) in the URL - must be one of: Africa, Asia, Europe, North America, South America, Oceania, Antarctica
- **Behavior**: Return all countries in the specified continent, ordered by name
- **Responses**:
  - `200`: Countries retrieved with message "{count} countries found in {continent}." or "No countries found in {continent}."
  - `400`: Invalid continent with message "Invalid continent. Must be one of: Africa, Asia, Europe, North America, South America, Oceania, Antarctica"
  - `401`: Missing or invalid token
  - `500`: Server error with message "The countries could not be retrieved. Please try again later."

#### 404 Route
- For any undefined route, return `404` with the message: "Unable to find the resource requested! You can try another URL."

---

## Database Configuration

### Sequelize Configuration

You must configure Sequelize to:

1. Connect to a MySQL database named `countries_db`
2. Use credentials: username `root`, password `azerty`
3. Host: `localhost`
4. Dialect: `mysql`
5. Disable SQL logs

### Database Initialization

You must create an initialization function that:

1. Synchronizes models with the database (with `force: true` to reset)
2. Creates test data (countries) on startup
3. Creates a default user:
   - Username: `teiva`
   - Password: `azerty` (hashed with bcrypt, 10 rounds)
4. Displays a confirmation message: "The database has been successfully initialized!"

---

## Express Configuration

### Required Middlewares

The Express application must use:

1. **Morgan**: HTTP logger in 'dev' mode
2. **CORS**: Allow cross-origin requests
3. **Body Parser**: Parse JSON requests
4. **Serve Favicon**: Serve the favicon
5. **Custom Middleware**: Log each request with timestamp, HTTP method and path

### Application Structure

- Port: `3000`
- Startup message: "My API is running on : http://localhost:3000"

---

## Response Format

All responses must follow this format:

### Success
```json
{
  "message": "Descriptive message",
  "data": { /* data */ }
}
```

### Error
```json
{
  "message": "Descriptive error message",
  "data": { /* error details (optional) */ }
}
```

---

## Error Handling

You must handle the following error types:

1. **ValidationError** (Sequelize): Model validation errors
   - HTTP Code: `400`
   - Return the Sequelize error message

2. **UniqueConstraintError** (Sequelize): Uniqueness constraint violation
   - HTTP Code: `400`
   - Return the Sequelize error message

3. **Resource not found**: Non-existent ID
   - HTTP Code: `404`
   - Appropriate message according to the endpoint

4. **Authentication errors**: Missing, invalid or expired token
   - HTTP Code: `401`
   - Specific messages according to error type

5. **Server errors**: Unexpected errors
   - HTTP Code: `500`
   - Generic message: "The [resource] could not be [action]. Please try again later."

---

## Important Notes

1. **Security**: Passwords must **always** be hashed with bcrypt before storage
2. **Validation**: All validations must be implemented at the Sequelize model level
3. **Error messages**: Error messages must be clear and informative
4. **Structure**: Organize your code in separate modules (routes, models, authentication, database)
5. **Clean code**: Follow Node.js/Express best practices
6. **Error handling**: All asynchronous operations must have appropriate error handling

---

## Learning Objectives

By completing this project, you will:

- Master creating a RESTful API with Express.js
- Understand and implement JWT authentication
- Use Sequelize for data modeling and validation
- Properly handle errors and appropriate HTTP codes
- Structure a Node.js project professionally
- Implement robust validations at the model level

---

**Good luck!**
