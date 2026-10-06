import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service.js';
import {
  CreatePropertyDto,
  ListingType,
  PropertyType,
} from './dto/create_properties.dto.js';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    ownerId: string,
    dto: CreatePropertyDto,
  ) {
    if (
      dto.latitude === undefined ||
      dto.longitude === undefined
    ) {
      throw new BadRequestException(
        'Latitude and longitude are required',
      );
    }

    const property = await this.prisma.property.create({
      data: {
        ownerId,

        title: dto.title.trim(),
        description: dto.description.trim(),

        location: dto.location.trim(),
        city: dto.city.trim(),
        state: dto.state.trim(),
        address: dto.address?.trim() || null,

        price: dto.price,

        propertyType: dto.propertyType as PropertyType,
        listingType: dto.listingType as ListingType,

        bedrooms: dto.bedrooms,
        bathrooms: dto.bathrooms,
        area: dto.area,

        yearBuilt: dto.yearBuilt ?? null,
        parkingSpaces: dto.parkingSpaces ?? null,

        latitude: dto.latitude,
        longitude: dto.longitude,

        isFeatured: dto.isFeatured ?? false,
      },
    });

    return property;
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException(
        'Property not found',
      );
    }

    return property;
  }

  async findAll() {
  return this.prisma.property.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
}