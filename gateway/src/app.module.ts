import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ProductController } from './products/controllers/product.controller';
import { ProvisioningController } from './provisioning/controllers/provisioning.controller';
import { ProductService } from './products/services/product.service';

@Module({
  imports: [],
  controllers: [ProvisioningController, ProductController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ProductService,
  ],
})
export class AppModule {}
