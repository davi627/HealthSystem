import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });
      
      if (!admin) {
        console.log('No admin found with email:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  

      const isMatch = await bcrypt.compare(password, admin.password);
   
      if (!isMatch) {

        
        // Test with hardcoded password
        const testMatch = await bcrypt.compare('Jamadova1234', admin.password);
  
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If we get here, login was successful
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ message: 'Logged in successfully', admin: { id: admin._id, email: admin.email, role: admin.role } });
  
    } catch (error) {
      console.error('Server error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const logoutAdmin = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};