import express from 'express';
import sequelize from './config/database.config';
import './models/user.model'; // Import your models to be initialized

const app = express();
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database connected and models synchronized');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});