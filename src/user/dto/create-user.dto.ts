import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { IsNullable } from 'src/shared/utils/IsNullable';

export class CreateUserDto {
  @IsString()
  uid: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsNullable()
  @IsOptional()
  profile_img?: string | null;

  @IsString()
  @IsNullable()
  @IsOptional()
  profile_msg?: string | null;

  @IsArray()
  @IsOptional()
  skills: number[];
}
