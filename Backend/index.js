import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from './Routes/Admin.js'
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

// Admin routes
app.use('/admin', adminRoutes);

// Temporary route to check admin data
app.get('/check-admin', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: 'davidmbita001@gmail.com' });
    if (admin) {
      res.json({
        message: 'Admin found',
        adminData: {
          email: admin.email,
          passwordHash: admin.password,
          role: admin.role
        }
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error checking admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Temporary route to reset admin password
app.post('/reset-admin-password', async (req, res) => {
  try {
    const adminEmail = 'davidmbita001@gmail.com';
    const newPassword = 'Jamadova1234';

    // Find the admin and update the password directly
    const result = await Admin.findOne({ email: adminEmail });
    if (result) {
      result.password = newPassword; // Set the new plain password
      await result.save(); // Save to trigger hashing
      res.json({ message: 'Admin password reset successfully' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error resetting admin password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Success db connection');
    
    // Create default admin user if not exists
    const adminEmail = 'davidmbita001@gmail.com';
    const adminPassword = 'Jamadova1234';
    
    try {
      const existingAdmin = await Admin.findOne({ email: adminEmail });
      if (!existingAdmin) {
        const newAdmin = await Admin.create({ email: adminEmail, password: adminPassword, role: 'admin' });
        console.log('Default admin user created:', newAdmin);
      } else {

      }
    } catch (error) {
      console.error('Error during admin creation/check:', error);
    }
    
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to db:', err);
  });