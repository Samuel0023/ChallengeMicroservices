import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ProvisioningModule } from './provisioning.module';
import { GlobalExceptionFilter } from './utils/goblalExceptionCatcher';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProvisioningModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  } as TcpOptions);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen();
}
bootstrap();
