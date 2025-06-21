const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Chevalier GENTHON',
      version: '1.0.0',
      description: 'API documentation for Chevalier GENTHON project',
    },
    servers: [
      {
        url: 'http://localhost:2070',
      },
    ],
    components: {
  schemas: {
    User: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'user'] },
        password: { type: 'string' },
      },
    },
    Composant: {
      type: 'object',
      properties: {
        categorie: { type: 'string' },
        detail: { type: 'string' },
        prix: { type: 'number' },
        marque: { type: 'string' },
        titre: { type: 'string' },
        image: { type: 'string' }
      }
    },
    Configuration: {
      type: 'object',
      properties: {
        // Adjust these fields to match your Configuration model
        name: { type: 'string' },
        value: { type: 'string' },
        description: { type: 'string' }
      }
    }
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
  },
  apis: ['./routes/*.js', './models/*.js', './controlleurs/*.js'], // Add controllers if needed
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };