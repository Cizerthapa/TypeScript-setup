import { Request, Response } from 'express';
import Person from '../models/user.model'; // Adjust import according to your setup
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { username, password, role, fullname } = req.body;

    try {
        // Check if user already exists
        const existingUser = await Person.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await Person.create({
            username,
            password: hashedPassword,
            role,
            fullname
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Registration Error', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Log in a user
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find the user
        const user = await Person.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1h' // Token expiry time
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login Error', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Example logout function (optional, depends on your setup)
// Logout generally means client-side action, but you can invalidate tokens server-side if needed
export const logoutUser = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
