import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('provisioning')
@ApiTags('Provisioning')
export class ProvisioningController {
  private readonly provisioningService: ClientProxy;

  constructor() {
    this.provisioningService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001, // El puerto donde se encuentra el microservicio de aprovisionamiento
      },
    });
  }

  @Post()
  @ApiOkResponse({ description: 'Provisioning completed successfully' })
  @ApiInternalServerErrorResponse({ description: 'Provisioning failed' })
  async initiateProvisioning(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.provisioningService.send('api_gateway_request', {}),
      );

      if (response.success) {
        return response;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
