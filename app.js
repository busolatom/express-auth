import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import errorHandler from 'errorhandler';
import { swaggerDocs, swaggerUiSetup } from './config/swagger.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// use middlewares
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// set up swagger UI
app.use('/api/docs', swaggerDocs, swaggerUiSetup);

// Express Error Handling Middleware
app.use(errorHandler({log: false}));

// Define the port
const PORT = process.env.PORT || 8080;

// Function to start the server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync all models
    await sequelize.sync();
    console.log('Database synchronized.');

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
startServer();
