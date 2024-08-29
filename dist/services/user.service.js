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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    // Register a new user
    registerUser(username, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash the password before saving
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Create a new user instance
            const newUser = new user_model_1.default({
                id: (0, uuid_1.v4)(), // Generate a unique ID for the user
                username,
                password: hashedPassword,
                role,
            });
            // Save the user to the database
            yield newUser.save();
            return newUser;
        });
    }
    // Authenticate user during login
    authenticateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user by username
            const user = yield user_model_1.default.findOne({ where: { username } });
            if (!user) {
                return null;
            }
            // Compare the provided password with the stored hashed password
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            return user;
        });
    }
    // Get user by ID
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByPk(id);
            return user;
        });
    }
    // Update user role (e.g., promote or demote user)
    updateUserRole(id, newRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            user.role = newRole;
            yield user.save();
            return user;
        });
    }
    // Delete user by ID
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            yield user.destroy();
            return user;
        });
    }
}
exports.UserService = UserService;
