const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Chevalier GENTHON",
      version: "1.0.0",
      description: "API documentation for Chevalier GENTHON project",
    },
    servers: [
      {
        url: "http://localhost:2070",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["admin", "user"] },
            password: { type: "string" },
          },
        },
        Composant: {
          type: "object",
          properties: {
            categorie: { type: "string" },
            detail: { type: "string" },
            prix: { type: "number" },
            marque: { type: "string" },
            titre: { type: "string" },
            image: { type: "string" },
          },
        },
        Configuration: {
          type: "object",
          properties: {
            user: { type: "string", description: "User ObjectId" },
            composants: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  composant: {
                    type: "string",
                    description: "Composant ObjectId",
                  },
                  partenaire: {
                    type: "string",
                    description: "Partenaire ObjectId",
                  },
                  prix: { type: "number" },
                },
              },
            },
            date: { type: "string", format: "date-time" },
            total: { type: "number" },
          },
        },
        Partenaire: {
          type: "object",
          properties: {
            name: { type: "string" },
            url: { type: "string" },
            composants: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  composant: {
                    type: "string",
                    description: "Composant ObjectId",
                  },
                  prix: { type: "number" },
                },
              },
            },
          },
        },
        ComposantCategorie: {
          type: "object",
          properties: {
            nom: { type: "string" },
            slug: { type: "string" },
            description: { type: "number" },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js", "./controlleurs/*.js"], // Add controllers if needed
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
