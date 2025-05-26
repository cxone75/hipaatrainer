const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const orgRoutes = require('./routes/orgRoutes');
const rateLimit = require('./middleware/rateLimit');
const auditLogMiddleware = require('./middleware/auditLog');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global rate limiting
app.use(rateLimit.apiLimiter);

// Global audit logging
app.use(auditLogMiddleware.logRequest());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/organizations', orgRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HIPAA Tracker backend server running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;