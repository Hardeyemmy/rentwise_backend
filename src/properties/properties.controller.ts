import {
  Body,
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { UpdatePropertyDto } from './dto/update_property.dto.js';
import { CreatePropertyDto } from './dto/create_properties.dto.js';
import { PropertiesService } from './properties.service.js';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('LANDLORD')
  @Post()
  create(
    @Req() request: any,
    @Body() dto: CreatePropertyDto,
  ) {
    return this.propertiesService.create(
      request.user.id,
      dto,
    );
  }

  @Get()
findAll() {
  return this.propertiesService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.propertiesService.findOne(id);
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('LANDLORD')
@Delete(':id')
remove(
  @Param('id') id: string,
  @Req() request: any,
) {
  return this.propertiesService.remove(
    id,
    request.user.id,
  );
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('LANDLORD')
@Patch(':id')
update(
  @Param('id') id: string,
  @Req() request: any,
  @Body() dto: UpdatePropertyDto,
) {
  return this.propertiesService.update(
    id,
    request.user.id,
    dto,
  );
}
}