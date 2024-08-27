// src/validators/validator.ts

import { isEmail, isLength, matches } from 'validator'; // Import validator library functions

// Validate that a string is a valid email
export function validateEmail(email: string): boolean {
    return isEmail(email);
}

// Validate that a string has a minimum length
export function validatePassword(password: string): boolean {
    return isLength(password, { min: 6 }); // Minimum length of 6 characters
}

// Validate that a username only contains alphanumeric characters
export function validateUsername(username: string): boolean {
    return matches(username, /^[a-zA-Z0-9_]+$/); // Alphanumeric and underscores only
}

// Validate that a role is either 'admin' or 'user'
export function validateRole(role: string): boolean {
    return role === 'admin' || role === 'user';
}
