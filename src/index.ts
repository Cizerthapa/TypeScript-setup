import express from 'express';
import sequelize from './config/database.config';
import './models/user.model'; // Import your models to be initialized
import { authenticateToken, authorizeRole } from './middlewares/auth.middleware'; // Import your middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // For parsing JSON bodies

// Sample route to test authentication and role authorization
app.get('/protected', authenticateToken, authorizeRole(['admin']), (req, res) => {
  res.send('This is a protected route');
});

// Sample route to test role authorization
app.get('/public', (req, res) => {
  res.send('This is a public route');
});

sequelize.sync().then(() => {
  console.log('Database connected and models synchronized');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
