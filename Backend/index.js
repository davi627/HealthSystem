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
app.use('/Backend/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Success db connection');
    
    // Create default admin user if not exists
    const adminEmail = 'davidmbita001@gmail.com';
    const adminPassword = 'Jamadova1234';
    
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await Admin.create({ email: adminEmail, password: hashedPassword, role: 'admin' });
      console.log('Default admin user created');
    }
    
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to db: ' + err);
  });