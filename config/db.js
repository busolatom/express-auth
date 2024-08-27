import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,      
    process.env.DB_USER,     
    process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',                         
    logging: false,                          
  }
);

// Export the sequelize instance
export default sequelize;
