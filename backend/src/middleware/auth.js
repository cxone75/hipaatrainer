const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

class AuthMiddleware {
  async verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access token is required' });
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user details from database
      const user = await userModel.getUserById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid token: user not found' });
      }

      if (user.status !== 'active') {
        return res.status(401).json({ error: 'Account is not active' });
      }

      // Attach user to request object
      req.user = {
        id: user.id,
        email: user.email,
        organizationId: user.organization_id,
        roleId: user.role_id,
        status: user.status,
      };

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  }

  async generateToken(user) {
    const payload = {
      userId: user.id,
      email: user.email,
      organizationId: user.organization_id,
      roleId: user.role_id,
    };

    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      issuer: 'hipaa-tracker',
      audience: 'hipaa-tracker-app',
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  async generateRefreshToken(user) {
    const payload = {
      userId: user.id,
      type: 'refresh',
    };

    const options = {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      issuer: 'hipaa-tracker',
      audience: 'hipaa-tracker-app',
    };

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options);
  }

  async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      const user = await userModel.getUserById(decoded.userId);
      
      if (!user || user.status !== 'active') {
        throw new Error('Invalid refresh token');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  requireAuth(req, res, next) {
    return this.verifyToken(req, res, next);
  }

  optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    return this.verifyToken(req, res, next);
  }
}

module.exports = new AuthMiddleware();