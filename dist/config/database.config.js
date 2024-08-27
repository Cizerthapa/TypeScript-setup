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
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Load environment variables from .env file
// Initialize a new Sequelize instance
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME, // Database name from .env
    username: process.env.DB_USER, // Username from .env
    password: process.env.DB_PASS, // Password from .env
    host: process.env.DB_HOST, // Host from .env
    port: parseInt(process.env.DB_PORT || '5432'), // Port from .env, default to 5432
    dialect: 'postgres', // Using PostgreSQL
    models: [__dirname + '/../models'], // Path to your models
    logging: false, // Disable logging; set to true to enable
});
exports.default = sequelize;
