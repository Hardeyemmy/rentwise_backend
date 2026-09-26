import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @Length(8, 72)
  password!: string;

  @IsString()
  @Length(2, 50)
  firstName!: string;

  @IsString()
  @Length(2, 50)
  lastName!: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9+\-\s()]{7,20}$/)
  phone?: string;
}