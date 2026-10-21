import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service.js';
import { CreateApplicationDto } from './dto/create_applications.dto.js';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateApplicationDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
      select: {
        id: true,
        title: true,
        ownerId: true,
        listingType: true,
        status: true,
        deletedAt: true,
      },
    });

    if (!property || property.deletedAt !== null) {
      throw new NotFoundException('Property not found');
    }

    if (property.ownerId === tenantId) {
      throw new ForbiddenException(
        'You cannot apply to your own property',
      );
    }

    if (property.listingType !== 'RENT') {
      throw new BadRequestException(
        'Applications can only be submitted for rental properties',
      );
    }

    if (property.status !== 'AVAILABLE') {
      throw new BadRequestException(
        'This property is not currently available',
      );
    }

    const existingApplication =
      await this.prisma.rentalApplication.findFirst({
        where: {
          userId: tenantId,
          propertyId: property.id,
          status: {
            in: ['PENDING', 'REVIEWING'],
          },
        },
      });

    if (existingApplication) {
      throw new ConflictException(
        'You already have an active application for this property',
      );
    }

    return this.prisma.rentalApplication.create({
      data: {
        userId: tenantId,
        propertyId: property.id,
        message: dto.message?.trim() || null,
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            state: true,
            price: true,
          },
        },
      },
    });
  }
}