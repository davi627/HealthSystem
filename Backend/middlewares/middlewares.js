

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.usertoken;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = admin;
    } else {
      req.user = user;
    }
    next();
  } catch (error) {
    console.error('Error in authenticateUser:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
export const authenticatAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.admintoken;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = admin;
    } else {
      req.user = user;
    }
    next();
  } catch (error) {
    console.error('Error in authenticateUser:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// token => _id, secret and headers

//same middleware to validate the two different tokens
//admin's token => _id, secret and headers
//user token => _id, secret and headers