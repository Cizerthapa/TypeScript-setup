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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
// Middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
    // Extract token from Authorization header (format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // If no token is provided, respond with 401 Unauthorized
    if (token == null)
        return res.status(401).json({ message: 'Unauthorized' });
    // Verify token using secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        // If token is invalid or expired, respond with 403 Forbidden
        if (err)
            return res.status(403).json({ message: 'Forbidden' });
        // Add user info to the request object
        req.person = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Middleware to check if the user has one of the allowed roles
const authorizeRole = (roles) => (req, res, next) => {
    // Check if user exists and if their role is included in allowed roles
    if (!req.person || !roles.includes(req.person.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
exports.authorizeRole = authorizeRole;
