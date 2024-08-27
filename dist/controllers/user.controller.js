"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model")); // Import the User model from your models directory
// Environment variables
const { secretKey, passwordSaltRounds } = process.env;
// User registration
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, fullname } = req.body;
    try {
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, parseInt(passwordSaltRounds, 10));
        // Create new user
        const newUser = yield user_model_1.default.create({
            username,
            password: hashedPassword,
            role,
            fullname
        });
        // Respond with the created user
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.registerUser = registerUser;
// User login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = yield user_model_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare passwords
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
        // Respond with the token
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error logging in user', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.loginUser = loginUser;
// Get user profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    try {
        // Find user by username
        const user = yield user_model_1.default.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Respond with user profile
        return res.status(200).json({
            username: user.username,
            role: user.role,
            fullname: user.fullname
        });
    }
    catch (error) {
        console.error('Error fetching user profile', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getUserProfile = getUserProfile;
