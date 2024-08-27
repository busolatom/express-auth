import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'user-auth-api',
    version: '1.0.0',
    description: 'API documentation for user auth app',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}`,
      description: 'Local API server',
    },
    {
      url: process.env.RENDER_URL,
      description: 'Production API server',
    },
  ],  
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Swagger options
const options = {
  definition: swaggerDefinition,
  apis: [
    './routes/auth.routes.js', // Path to auth routes file
  ],
};

const swaggerSpec = swaggerJsdoc(options);

// Export Swagger UI setup
export const swaggerDocs = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
