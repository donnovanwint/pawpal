import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { AllowedRoles } from './guards/roles.decorator';
import { Role } from './guards/role.enum';
import { RoleGuard } from './guards/role.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    const newUser = await this.authService.register(user);
    return {
      message: 'User created',
      user: {
        id: newUser.id,
        token: newUser.token,
      },
    };
  }

  @Post('login')
  async login(@Body() login: LoginDto) {
    const token = await this.authService.login(login);

    return {
      message: 'Login successful',
      token,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @AllowedRoles(Role.SuperAdmin)
  @Get()
  async getUsers() {
    const users = await this.userService.getAll();
    return {
      message: 'Users retrieved successfully',
      users,
    };
  }
}
