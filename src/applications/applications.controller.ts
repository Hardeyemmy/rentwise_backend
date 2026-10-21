import {
  Body,
  Controller,
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
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TENANT')
  create(
    @Req() request: any,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(
      request.user.id,
      dto,
    );
  }
}