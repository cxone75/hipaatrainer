const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const orgRoutes = require('./routes/orgRoutes');
const documentRoutes = require('./routes/documentRoutes');
const waitlistRoutes = require('./routes/waitlistRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const rateLimit = require('./middleware/rateLimit');
const auditLogMiddleware = require('./middleware/auditLog');

const app = express();

// Trust proxy for rate limiting in hosted environments
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://0.0.0.0:3000',
    /^https:\/\/.*\.replit\.dev$/,
    /^https:\/\/.*\.repl\.co$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Stripe webhook needs raw body, so add it before JSON parsing
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global rate limiting
app.use(rateLimit.apiLimiter);

// Request logging middleware for debugging (disabled in production)
app.use((req, res, next) => {
  next();
});

// Global audit logging
app.use(auditLogMiddleware.logRequest());

const PORT = process.env.PORT || 3001;

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'HIPAA Tracker API',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      api: '/api',
      users: '/api/users',
      roles: '/api/roles',
      organizations: '/api/organizations'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/organizations', orgRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/stripe', require('./routes/stripeRoutes'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HIPAA Tracker backend server running on port ${PORT}`);
  console.log(`Health check available at http://0.0.0.0:${PORT}/health`);
});

module.exports = app;