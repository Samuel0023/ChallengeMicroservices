import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProvisioningService } from './provisioning.service';
import { CategoryDTO, StatusDTO } from './dtos';

@Controller()
export class ProvisioningController {
  constructor(private readonly appService: ProvisioningService) {}

  @MessagePattern('set_Initials_Structures')
  async setInitialsStructures(): Promise<{
    success: boolean;
    message: string;
    data: null;
  }> {
    try {
      await this.appService.init();
      return {
        success: true,
        message: 'Provisioning completed successfully',
        data: null,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  }

  @MessagePattern('get_All_Categories')
  async getAllCategories(): Promise<{
    success: boolean;
    message: string;
    data: CategoryDTO[] | null;
  }> {
    try {
      return {
        success: true,
        message: 'Provisioning (getAllCategories) completed successfully',
        data: await this.appService.findAllCategories(),
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  }

  @MessagePattern('get_all_status')
  async getAllStatus(): Promise<{
    success: boolean;
    message: string;
    data: StatusDTO[] | null;
  }> {
    try {
      return {
        success: true,
        message: 'Provisioning  (getAllStatus) completed successfully',
        data: await this.appService.findAlStatus(),
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  }
}
