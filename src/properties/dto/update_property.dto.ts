import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import {
  ListingType,
  PropertyType,
} from './create_properties.dto.js';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  @Length(3, 150)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(10, 5000)
  description?: string;

  @IsOptional()
  @IsString()
  @Length(2, 150)
  location?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  state?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  address?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;

  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  bedrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  bathrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  area?: number;

  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(2100)
  yearBuilt?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  parkingSpaces?: number;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}