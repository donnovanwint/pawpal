import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../guards/role.enum';

export class CreateUserDto {
  @IsString()
  // @IsOptional()
  firstName: string;

  @IsString()
  // @IsOptional()
  lastName: string;

  @IsString()
  role: Role;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
