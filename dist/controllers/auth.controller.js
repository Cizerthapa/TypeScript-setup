"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model")); // Adjust import according to your setup
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, fullname } = req.body;
    try {
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Create new user
        const newUser = yield user_model_1.default.create({
            username,
            password: hashedPassword,
            role,
            fullname
        });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (err) {
        console.error('Registration Error', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.registerUser = registerUser;
// Log in a user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Find the user
        const user = yield user_model_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check the password
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h' // Token expiry time
        });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        console.error('Login Error', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.loginUser = loginUser;
// Example logout function (optional, depends on your setup)
// Logout generally means client-side action, but you can invalidate tokens server-side if needed
const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutUser = logoutUser;
