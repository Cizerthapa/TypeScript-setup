import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Person from '../models/user.model';

export class UserService {
    // Register a new user
    async registerUser(username: string, password: string, role: string) {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new Person({
            id: uuidv4(),  // Generate a unique ID for the user
            username,
            password: hashedPassword,
            role,
        });

        // Save the user to the database
        await newUser.save();

        return newUser;
    }

    // Authenticate user during login
    async authenticateUser(username: string, password: string) {
        // Find the user by username
        const user = await Person.findOne({ where: { username } });

        if (!user) {
            return null;
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    // Get user by ID
    async getUserById(id: string) {
        const user = await Person.findByPk(id);
        return user;
    }

    // Update user role (e.g., promote or demote user)
    async updateUserRole(id: string, newRole: string) {
        const user = await Person.findByPk(id);

        if (!user) {
            throw new Error('User not found');
        }

        user.role = newRole;
        await user.save();

        return user;
    }

    // Delete user by ID
    async deleteUser(id: string) {
        const user = await Person.findByPk(id);

        if (!user) {
            throw new Error('User not found');
        }

        await user.destroy();

        return user;
    }
}
