import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SQL Learning API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

export function serveSwagger(app) {
  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
