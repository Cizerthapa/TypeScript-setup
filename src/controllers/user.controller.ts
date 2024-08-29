import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Person from '../models/user.model'; // Import the User model from your models directory

// Environment variables
const { SECRET_KEY, passwordSaltRounds } = process.env;
console.log('key :' + SECRET_KEY, 'secret salt rounds :' + passwordSaltRounds);

// User registration
export const registerUser = async (req: Request, res: Response) => {
    const { username, password, role, fullname } = req.body;

    try {
        const existingUser = await Person.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(passwordSaltRounds as string, 10));

        const newUser = await Person.create({
            username,
            password: hashedPassword,
            role,
            fullname,
        });
        console.log('Creating user with:', { username, password: hashedPassword, role, fullname });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// User login
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await Person.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY as string, { expiresIn: '1h' });

        // Respond with the token
        return res.status(200).json({"token": token });
    } catch (error) {
        console.error('Error logging in user', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
    const username = req.body.username;

    try {
        // Find user by username
        const user = await Person.findOne({ where: { username: username as string } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user profile
        return res.status(200).json({
            username: user.username,
            role: user.role,
            fullname: user.fullname
        });
    } catch (error) {
        console.error('Error fetching user profile', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
