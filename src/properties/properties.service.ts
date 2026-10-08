import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service.js';
import {
  CreatePropertyDto,
  ListingType,
  PropertyType,
} from './dto/create_properties.dto.js';
import { UpdatePropertyDto } from './dto/update_property.dto.js';
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

  async update(
  id: string,
  userId: string,
  dto: UpdatePropertyDto,
) {
  const property = await this.prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    throw new NotFoundException('Property not found');
  }

  if (property.ownerId !== userId) {
    throw new ForbiddenException(
      'You do not have permission to update this property',
    );
  }

  const updatedProperty =
    await this.prisma.property.update({
      where: {
        id,
      },
      data: {
        ...(dto.title !== undefined && {
          title: dto.title.trim(),
        }),

        ...(dto.description !== undefined && {
          description: dto.description.trim(),
        }),

        ...(dto.location !== undefined && {
          location: dto.location.trim(),
        }),

        ...(dto.city !== undefined && {
          city: dto.city.trim(),
        }),

        ...(dto.state !== undefined && {
          state: dto.state.trim(),
        }),

        ...(dto.address !== undefined && {
          address: dto.address.trim(),
        }),

        ...(dto.price !== undefined && {
          price: dto.price,
        }),

        ...(dto.propertyType !== undefined && {
          propertyType: dto.propertyType,
        }),

        ...(dto.listingType !== undefined && {
          listingType: dto.listingType,
        }),

        ...(dto.bedrooms !== undefined && {
          bedrooms: dto.bedrooms,
        }),

        ...(dto.bathrooms !== undefined && {
          bathrooms: dto.bathrooms,
        }),

        ...(dto.area !== undefined && {
          area: dto.area,
        }),

        ...(dto.yearBuilt !== undefined && {
          yearBuilt: dto.yearBuilt,
        }),

        ...(dto.parkingSpaces !== undefined && {
          parkingSpaces: dto.parkingSpaces,
        }),

        ...(dto.latitude !== undefined && {
          latitude: dto.latitude,
        }),

        ...(dto.longitude !== undefined && {
          longitude: dto.longitude,
        }),

        ...(dto.isFeatured !== undefined && {
          isFeatured: dto.isFeatured,
        }),
      },
    });

  return updatedProperty;
}

async remove(id: string, userId: string) {
  const property = await this.prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property || property.deletedAt !== null) {
    throw new NotFoundException('Property not found');
  }

  if (property.ownerId !== userId) {
    throw new ForbiddenException(
      'You do not have permission to delete this property',
    );
  }

  return this.prisma.property.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
    select: {
      id: true,
      title: true,
      status: true,
      deletedAt: true,
    },
  });
}
  async findOne(id: string) {
  const property = await this.prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property || property.deletedAt !== null) {
    throw new NotFoundException('Property not found');
  }

  return property;
}

  async findAll() {
  return this.prisma.property.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

}