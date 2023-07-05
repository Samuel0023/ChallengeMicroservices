import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationFilter } from './utils/validationFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar las opciones de CORS
  const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:3000', // Reemplaza con el origen de tu aplicación frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // Habilitar CORS utilizando las opciones configuradas
  app.use(cors(corsOptions));
  app.useGlobalFilters(new ValidationFilter());
  await app.listen(3003);
}
bootstrap();
