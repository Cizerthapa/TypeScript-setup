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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from.env file
if (process.env.SECRET_KEY == null || process.env.SECRET_KEY == undefined) {
    console.log("Secret key not specified");
}
const jwtkey = process.env.SECRET_KEY;
// Middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (authHeader == null || authHeader == undefined) {
        return res.send('Authentication Header Required');
    }
    console.log("Key for JWT: " + jwtkey);
    // Verify the token
    jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err)
            return res.status(403).json({ message: 'Forbidden' });
        // Add the user to the request object
        req.person = user; // Cast to Person type
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Middleware to check user roles (e.g., admin)
const authorizeRole = (roles) => (req, res, next) => {
    // Check if the user is in the request object and has a valid role
    if (!req.person || !roles.includes(req.person.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
exports.authorizeRole = authorizeRole;
