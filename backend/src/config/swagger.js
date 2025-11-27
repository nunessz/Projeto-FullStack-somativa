import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Máquinas',
      version: '1.0.0',
      description: 'Documentação da API para gerenciamento de máquinas e manutenções'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ]
  },
  apis: [path.join(__dirname, '../routes/*.routes.js'), path.join(__dirname, '../routes/manutencao.routes.js')]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📚 Swagger configurado em http://localhost:3000/api-docs');
}