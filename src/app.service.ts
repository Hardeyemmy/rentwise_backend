import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service.js';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<string> {
    const userCount = await (this.prisma as PrismaService & {
      user: { count: () => Promise<number> };
    }).user.count();

    return `RentWise API is running. Users: ${userCount}`;
  }
}
