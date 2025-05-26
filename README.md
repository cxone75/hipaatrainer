# HIPAA Tracker

A comprehensive HIPAA compliance tracking and user management system built with Next.js 14 and Node.js.

## Project Structure

```
hipaa-tracker/
├── frontend/                      # Next.js 14 App Router frontend
│   ├── app/
│   │   ├── admin/                 # Admin management pages
│   │   │   ├── users/             # User management
│   │   │   └── roles/             # Role management
│   │   ├── profile/               # User self-service profile
│   │   └── components/            # Shared components
│   ├── lib/                       # Frontend utilities
│   └── types/                     # TypeScript type definitions
└── backend/                       # Node.js/Express backend
    └── src/
        ├── controllers/           # Request handlers
        ├── routes/                # API route definitions
        ├── models/                # Data access layer
        ├── middleware/            # Express middleware
        └── services/              # Business logic services
```

## Features

### Frontend Features
- **User Management Dashboard**: Complete user directory with search and filtering
- **Role-Based Access Control**: Comprehensive permission management
- **Profile Management**: Self-service user profile updates
- **Responsive Design**: Built with Tailwind CSS
- **TypeScript Support**: Full type safety throughout the application

### Backend Features
- **RESTful API**: Complete CRUD operations for users, roles, and organizations
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Permissions**: Granular permission system
- **Audit Logging**: Comprehensive activity tracking for compliance
- **Rate Limiting**: Protection against abuse and DoS attacks
- **Email Notifications**: Automated email system for user management

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file and configure:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
   - Add your Supabase URL and keys
   - Configure JWT secrets
   - Set up email provider settings

5. Start the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users` - List users with pagination and filtering
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/bulk/import` - Bulk import users

### Roles
- `GET /api/roles` - List roles
- `GET /api/roles/:id` - Get role by ID
- `POST /api/roles` - Create new role
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role

### Organizations
- `GET /api/organizations` - Get organization details
- `PUT /api/organizations` - Update organization
- `GET /api/organizations/settings` - Get organization settings
- `PUT /api/organizations/settings` - Update organization settings

## Environment Variables

### Frontend
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend
Configure the `.env` file in the backend directory with the required variables (see `.env.example`).

## Security Features

- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Rate Limiting**: Multiple rate limiting strategies for different endpoints
- **Audit Logging**: Comprehensive logging of all user actions
- **Role-Based Access Control**: Granular permissions system
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configurable CORS settings
- **Helmet Security**: Security headers via Helmet.js

## Compliance Features

- **Audit Trail**: Complete audit logging for HIPAA compliance
- **User Access Reports**: Detailed reports on user access and activities
- **Permission Tracking**: Monitoring of role and permission changes
- **Data Export**: Compliance report generation and export capabilities

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
```

## Deployment

### Frontend Deployment
The frontend is ready for deployment on platforms like Vercel, Netlify, or any hosting service that supports Next.js.

### Backend Deployment
The backend can be deployed to platforms like Railway, Render, Heroku, or any cloud provider that supports Node.js applications.

## Database Setup

This application uses Supabase as the database. You'll need to set up the following tables:

- `organizations` - Organization information
- `users` - User accounts
- `roles` - Role definitions
- `permissions` - Available permissions
- `role_permissions` - Role-permission relationships
- `audit_logs` - Audit trail
- `login_histories` - Login activity tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.