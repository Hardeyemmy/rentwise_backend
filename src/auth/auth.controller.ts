import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Roles } from './decorators/roles.decorator.js';
import { RolesGuard } from './guard/roles.guard.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() request: any) {
    return {
      user: request.user,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('LANDLORD')
  @Get('landlord-test')
  landlordTest(@Req() request: any) {
    return {
      message: 'Landlord authorization successful',
      user: request.user,
    };
  }
}