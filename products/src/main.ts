import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './products.module';
import { GlobalExceptionFilter } from './utils/globalExceptionCatcher';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  } as TcpOptions);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen();
}
bootstrap();
