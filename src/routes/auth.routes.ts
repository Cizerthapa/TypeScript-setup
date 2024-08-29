import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';

const router = Router();
const userService = new UserService();

// User registration route
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;
        const user = await userService.registerUser(username, password, role);
        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registration failed' });
    }
});

// User login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await userService.authenticateUser(username, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1h',
        });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
});

// Protected route example (accessible only to authenticated users)
router.get('/profile', authenticateToken, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Profile accessed', user: req.person });
});

// Protected route example (accessible only to users with specific roles)
router.get('/admin', authenticateToken, authorizeRole(['admin']), (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Admin accessed', user: req.person });
});

export default router;
