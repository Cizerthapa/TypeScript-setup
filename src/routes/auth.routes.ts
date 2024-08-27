import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Middleware to verify JWT tokens
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract token from Authorization header (format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, respond with 401 Unauthorized
    if (token == null) return res.status(401).json({ message: 'Unauthorized' });

    // Verify token using secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, user: any) => {
        // If token is invalid or expired, respond with 403 Forbidden
        if (err) return res.status(403).json({ message: 'Forbidden' });

        // Add user info to the request object
        req.person = user;
        next();
    });
};

// Middleware to check if the user has one of the allowed roles
export const authorizeRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // Check if user exists and if their role is included in allowed roles
    if (!req.person || !roles.includes(req.person.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
