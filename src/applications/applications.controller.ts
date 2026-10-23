
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { ApplicationsService } from './applications.service.js';
import { CreateApplicationDto } from './dto/create_applications.dto.js';

@Controller('applications')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('TENANT')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post()
  create(
    @Req() request: any,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(
      request.user.id,
      dto,
    );
  }

  @Get('my')
  findMyApplications(@Req() request: any) {
    return (this.applicationsService as any).findMyApplications(
      request.user.id,
    );
  }

  @Patch(':id/withdraw')
  withdraw(
    @Req() request: any,
    @Param('id') id: string,
  ) {
    return (this.applicationsService as any).withdraw(
      request.user.id,
      id,
    );
  }
}
