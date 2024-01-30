import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { PasswordService } from '../password/password.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) { }

  async isUserExists(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const userPayload = {
      email: userDto.email.toLowerCase(),
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      role: userDto.role,
      passwordHash: await this.passwordService.generate(userDto.password),
    };

    let newUser = await this.usersRepository.create(userPayload);
    newUser = await this.updateUser(newUser);

    newUser.token = this.getUserToken(newUser);
    return await this.updateUser(newUser);
  }

  async updateUser(newUser: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(newUser);
  }

  async checkUserPassword(
    user: UserEntity,
    requestPassword: string,
  ): Promise<boolean> {
    return this.passwordService.compare(requestPassword, user.passwordHash);
  }

  public getUserToken(user: UserEntity): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email.toLowerCase(),
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    });
  }

  public async getAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      relations: ['pets'],
      select: ['id', 'email', 'lastName', 'firstName', 'role', 'created_at'],
    });
  }

  public async findOne(id: number): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({
      select: ['id', 'email', 'lastName', 'firstName', 'role', 'created_at'], where: { id: id }
    });
  }

  async delete(id: number) {
    await this.usersRepository.delete(id)
  }
}
