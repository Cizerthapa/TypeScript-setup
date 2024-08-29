"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
require("./models/user.model"); // Import your models
const auth_middleware_1 = require("./middlewares/auth.middleware"); // Import your middleware
const user_routes_1 = __importDefault(require("./routes/user.routes")); // Adjusted path for clarity
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from.env file
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Middleware setup
app.use(express_1.default.json()); // For parsing JSON bodies
// Routes setup
app.use('/api/users', user_routes_1.default); // Use the user routes with a specific base path
// Sample route to test authentication and role authorization
app.get('/protected', auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRole)(['admin']), (req, res) => {
    res.send('This is a protected route');
});
// Sample public route
app.get('/public', (req, res) => {
    res.send('This is a public route');
});
// Synchronize database and start the server
database_config_1.default.sync().then(() => {
    console.log('Database connected and models synchronized');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
