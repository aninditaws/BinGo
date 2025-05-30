# BinGo Backend API

This is the backend API for the BinGo application, built with Node.js and Express.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Environment Configuration:
```bash
cp env.example .env
```
Update the `.env` file with your actual values:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `JWT_SECRET`: A secure random string for JWT signing
- `FRONTEND_URL`: Your React Native app URL (for CORS)

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user (protected)
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/refresh-token` - Refresh access token

### Authentication Request Examples

#### Sign Up
```json
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Sign In
```json
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Sign Out
```json
POST /api/auth/signout
Headers: {
  "Authorization": "Bearer <access_token>"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js       # Supabase configuration
│   ├── controllers/
│   │   └── authController.js # Authentication controllers
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── index.js         # Main routes
│   ├── services/
│   │   └── authService.js   # Authentication services
│   └── server.js            # Main server file
├── package.json
├── env.example
└── README.md
```

## Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting on auth endpoints
- Input validation
- JWT token verification through Supabase

## Development

The backend uses:
- Express.js for the web framework
- Supabase for authentication and database
- express-validator for input validation
- express-rate-limit for rate limiting
- helmet for security headers
- cors for cross-origin requests 