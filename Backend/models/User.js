import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  employerId: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Receptionist', 'Nurse', 'Doctor', 'Pharmacist', 'Accountant', 'Kitchen Staff', 'Laboratory'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', UserSchema);
export default User;
