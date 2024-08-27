"use strict";
// src/validators/validator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateUsername = validateUsername;
exports.validateRole = validateRole;
const validator_1 = require("validator"); // Import validator library functions
// Validate that a string is a valid email
function validateEmail(email) {
    return (0, validator_1.isEmail)(email);
}
// Validate that a string has a minimum length
function validatePassword(password) {
    return (0, validator_1.isLength)(password, { min: 6 }); // Minimum length of 6 characters
}
// Validate that a username only contains alphanumeric characters
function validateUsername(username) {
    return (0, validator_1.matches)(username, /^[a-zA-Z0-9_]+$/); // Alphanumeric and underscores only
}
// Validate that a role is either 'admin' or 'user'
function validateRole(role) {
    return role === 'admin' || role === 'user';
}
