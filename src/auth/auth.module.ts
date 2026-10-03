import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './strategies/jwt.strategies.js';
import { RolesGuard } from './guard/roles.guard.js';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>(
          'JWT_ACCESS_SECRET',
        ),
        signOptions: {
          expiresIn: 900,
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],

  exports: [
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}