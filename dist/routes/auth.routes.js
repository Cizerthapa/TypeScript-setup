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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = __importStar(require("jsonwebtoken"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_service_1 = require("../services/user.service");
const router = (0, express_1.Router)();
const userService = new user_service_1.UserService();
// User registration route
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        const user = yield userService.registerUser(username, password, role);
        return res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registration failed' });
    }
}));
// User login route
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userService.authenticateUser(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
        return res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
}));
// Protected route example (accessible only to authenticated users)
router.get('/profile', auth_middleware_1.authenticateToken, (req, res) => {
    return res.status(200).json({ message: 'Profile accessed', user: req.person });
});
// Protected route example (accessible only to users with specific roles)
router.get('/admin', auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRole)(['admin']), (req, res) => {
    return res.status(200).json({ message: 'Admin accessed', user: req.person });
});
exports.default = router;
