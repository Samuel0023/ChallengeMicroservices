import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ProvisioningService } from './services/provisioning-service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  const databaseService = app.get(ProvisioningService);
  await databaseService.createTables();

  await app.listen();
}
bootstrap();
