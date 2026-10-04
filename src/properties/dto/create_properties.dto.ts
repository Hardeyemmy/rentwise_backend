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

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  DUPLEX = 'DUPLEX',
  STUDIO = 'STUDIO',
  OFFICE = 'OFFICE',
}

export enum ListingType {
  RENT = 'RENT',
  SALE = 'SALE',
}

export class CreatePropertyDto {
  @IsString()
  @Length(3, 150)
  title!: string;

  @IsString()
  @Length(10, 5000)
  description!: string;

  @IsString()
  @Length(2, 150)
  location!: string;

  @IsString()
  @Length(2, 100)
  city!: string;

  @IsString()
  @Length(2, 100)
  state!: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  address?: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsEnum(PropertyType)
  propertyType!: PropertyType;

  @IsEnum(ListingType)
  listingType!: ListingType;

  @IsInt()
  @Min(0)
  @Max(100)
  bedrooms!: number;

  @IsInt()
  @Min(0)
  @Max(100)
  bathrooms!: number;

  @IsNumber()
  @Min(0)
  area!: number;

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