import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProvisioningService } from './provisioning.service';

@Controller()
export class ProvisioningController {
  constructor(private readonly appService: ProvisioningService) {}

  @MessagePattern('api_gateway_request')
  async handleRequest(): Promise<{
    success: boolean;
    message: string;
    statusCode: number;
  }> {
    try {
      await this.appService.init();
      return {
        success: true,
        message: 'Provisioning completed successfully',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: `${error.message}`,
        statusCode: 500,
      };
    }
  }
}
