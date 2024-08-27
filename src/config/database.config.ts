import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config(); // Load environment variables from .env file

// Ensure environment variables are strings
const dbPassword = process.env.DB_PASSWORD as string;

const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: dbPassword,
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres',
  models: [path.join(__dirname, '/../models/*.model.js')], // Ensure the path is correct
  logging: false,
});

export default sequelize;