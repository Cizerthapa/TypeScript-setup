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
const { SECRET_KEY, passwordSaltRounds } = process.env;
console.log('key :' + SECRET_KEY, 'secret salt rounds :' + passwordSaltRounds);
// User registration
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, fullname } = req.body;
    try {
        const existingUser = yield user_model_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, parseInt(passwordSaltRounds, 10));
        const newUser = yield user_model_1.default.create({
            username,
            password: hashedPassword,
            role,
            fullname,
        });
        console.log('Creating user with:', { username, password: hashedPassword, role, fullname });
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
        const token = jsonwebtoken_1.default.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
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
    const username = req.body.username;
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
