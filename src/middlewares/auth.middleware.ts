import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Person from '../models/user.model'; // Adjust the path to your model file
import dotenv from 'dotenv'; 

dotenv.config(); // Load environment variables from.env file

if(process.env.SECRET_KEY == null || process.env.SECRET_KEY == undefined){
    console.log("Secret key not specified");
}

const jwtkey = process.env.SECRET_KEY;

// Middleware to verify JWT tokens
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    if(authHeader == null || authHeader == undefined) {
        return res.send('Authentication Header Required');
    }

    console.log("Key for JWT: " + jwtkey);

    // Verify the token
    jwt.verify(authHeader, process.env.JWT_SECRET_KEY as string, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        // Add the user to the request object
        req.person = user as Person; // Cast to Person type
        next();
    });
};

// Middleware to check user roles (e.g., admin)
export const authorizeRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // Check if the user is in the request object and has a valid role
    if (!req.person || !roles.includes(req.person.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
