import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { fullName, gender, phoneNumber, email, employerId, password, role } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encrypt the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //  const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            fullName,
            gender,
            phoneNumber,
            email,
            employerId,
            password: hashedPassword, // store the hashed password
            role,
        });

        console.log(newUser)

        // Generate a token
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set the token in a cookie
        // Send the response with the user data and token
        res.status(201).cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).json({ 
            message: 'User created successfully', 
            newUser: { id: newUser._id, email: newUser.email, role: newUser.role }, 
            token 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// User login
export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate input fields
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields must be filled!' });
        }

        console.log('Login attempt with email:', email);

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('No user found with provided email.');
            return res.status(400).json({ message: 'Invalid credentials1' });
        }

        console.log('User found:', user);

        // Check if the role matches (if necessary)
        if (user.role !== role) {
            console.log('Role mismatch for user.');
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials2' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set the token in a cookie
        console.log('Logged in user:', user);

        // Respond with success and the user data
        res.status(200)
            .cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            .json({ 
                message: 'Logged in successfully', 
                user: { id: user._id, email: user.email, role: user.role },
                token 
            });

    } catch (error) {
        console.error('Server error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

