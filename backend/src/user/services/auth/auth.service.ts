import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from '../../dto/login.dto';
import { UserEntity } from '../../entities/user.entity';
import { Role } from 'src/user/guards/role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(userDto: CreateUserDto): Promise<UserEntity> {
    // check if user exists and send custom error message
    if (await this.userService.isUserExists(userDto.email)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    
    if(userDto.role === 'super-admin'){
      userDto.role = Role.SuperAdmin
    }else if(userDto.role === 'client'){
      userDto.role = Role.Client
    }

    return await this.userService.createUser(userDto);
  }

  async login(loginRequest: LoginDto): Promise<any | void> {
    const { email, password } = loginRequest;
    const user = await this.userService.isUserExists(email);

    if (!user) {
      return this.failLogin();
    }

    if (await this.userService.checkUserPassword(user, password)) {
      const token = this.userService.getUserToken(user);
      user.token = token;
      await this.userService.updateUser(user);

      return { token: token, userId: user.id, role: user.role };
    }

    this.failLogin('Incorrect password');
  }

  private failLogin(message = 'Login failed') {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
