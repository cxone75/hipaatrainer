const rateLimit = require('express-rate-limit');

class RateLimitMiddleware {
  constructor() {
    // General API rate limiting
    this.apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: {
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: 15 * 60, // 15 minutes in seconds
      },
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many requests from this IP, please try again later.',
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });

    // Strict rate limiting for sensitive operations
    this.strictLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Limit each IP to 10 requests per windowMs
      message: {
        error: 'Too many sensitive operations from this IP, please try again later.',
        retryAfter: 15 * 60,
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many sensitive operations from this IP, please try again later.',
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });

    // Login rate limiting
    this.loginLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Limit each IP to 5 login requests per windowMs
      skipSuccessfulRequests: true, // Don't count successful requests
      message: {
        error: 'Too many login attempts from this IP, please try again later.',
        retryAfter: 15 * 60,
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many login attempts from this IP, please try again later.',
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });

    // Password reset rate limiting
    this.passwordResetLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 3, // Limit each IP to 3 password reset requests per hour
      message: {
        error: 'Too many password reset attempts from this IP, please try again later.',
        retryAfter: 60 * 60,
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many password reset attempts from this IP, please try again later.',
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });

    // User creation rate limiting
    this.userCreationLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 20, // Limit each IP to 20 user creation requests per hour
      message: {
        error: 'Too many user creation attempts from this IP, please try again later.',
        retryAfter: 60 * 60,
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many user creation attempts from this IP, please try again later.',
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });

    // Bulk operations rate limiting
    this.bulkOperationLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 5, // Limit each IP to 5 bulk operations per hour
      message: {
        error: 'Too many bulk operations from this IP, please try again later.',
        retryAfter: 60 * 60,
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many bulk operations from this IP, please try again later.',
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });

    // Export data rate limiting
    this.exportLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 10, // Limit each IP to 10 export requests per hour
      message: {
        error: 'Too many export requests from this IP, please try again later.',
        retryAfter: 60 * 60,
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many export requests from this IP, please try again later.',
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });
  }

  // Custom rate limiter for specific endpoints
  createCustomLimiter(options) {
    const {
      windowMs = 15 * 60 * 1000,
      max = 100,
      message = 'Too many requests',
      skipSuccessfulRequests = false,
      skipFailedRequests = false,
    } = options;

    return rateLimit({
      windowMs,
      max,
      skipSuccessfulRequests,
      skipFailedRequests,
      message: {
        error: message,
        retryAfter: Math.round(windowMs / 1000),
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message,
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });
  }

  // User-based rate limiting (requires authentication)
  createUserBasedLimiter(options) {
    const {
      windowMs = 15 * 60 * 1000,
      max = 100,
      message = 'Too many requests from this user',
    } = options;

    return rateLimit({
      windowMs,
      max,
      keyGenerator: (req) => {
        // Use user ID as key if authenticated, otherwise fall back to IP
        return req.user?.id || req.ip;
      },
      message: {
        error: message,
        retryAfter: Math.round(windowMs / 1000),
      },
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        res.status(429).json({
          error: 'Rate limit exceeded',
          message,
          retryAfter: Math.round(req.rateLimit.resetTime / 1000),
        });
      },
    });
  }
}

module.exports = new RateLimitMiddleware();