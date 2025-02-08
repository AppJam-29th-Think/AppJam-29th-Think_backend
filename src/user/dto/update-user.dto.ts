import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { IsNullable } from 'src/shared/utils/IsNullable';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
