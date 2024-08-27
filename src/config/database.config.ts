import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize a new Sequelize instance
const sequelize = new Sequelize({
  database: process.env.DB_NAME,  // Database name from .env
  username: process.env.DB_USER,  // Username from .env
  password: process.env.DB_PASS,  // Password from .env
  host: process.env.DB_HOST,      // Host from .env
  port: parseInt(process.env.DB_PORT || '5432'), // Port from .env, default to 5432
  dialect: 'postgres',  // Using PostgreSQL
  models: [__dirname + '/../models'], // Path to your models
  logging: false, // Disable logging; set to true to enable
});

export default sequelize;
