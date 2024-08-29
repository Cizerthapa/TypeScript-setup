import express from 'express';
import sequelize from './config/database.config';
import './models/user.model'; // Import your models
import { authenticateToken, authorizeRole } from './middlewares/auth.middleware'; // Import your middleware
import userRouter from './routes/user.routes'; // Adjusted path for clarity
import dotenv from 'dotenv'; 

dotenv.config(); // Load environment variables from.env file

const app = express();
const PORT = process.env.PORT;

// Middleware setup
app.use(express.json()); // For parsing JSON bodies

// Routes setup
app.use('/api/users', userRouter); // Use the user routes with a specific base path

// Sample route to test authentication and role authorization
app.get('/protected', authenticateToken, authorizeRole(['admin']), (req, res) => {
  res.send('This is a protected route');
});

// Sample public route
app.get('/public', (req, res) => {
  res.send('This is a public route');
});

// Synchronize database and start the server
sequelize.sync().then(() => {
  console.log('Database connected and models synchronized');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
