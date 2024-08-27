"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// User registration
router.post('/register', user_controller_1.registerUser);
// User login
router.post('/login', user_controller_1.loginUser);
// Get user profile
router.get('/profile', user_controller_1.getUserProfile);
exports.default = router;
