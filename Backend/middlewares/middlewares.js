import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};