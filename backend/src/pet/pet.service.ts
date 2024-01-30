import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { Role } from 'src/user/guards/role.enum';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) { }

  async create(createPetDto: CreatePetDto, userId: string) {
    const { name, gender, age, animalType, animalBreed, description } = createPetDto;

    const pet = this.petRepository.create(
      Object.assign(new Pet(), {
        name,
        gender,
        age,
        animalType,
        description,
        animalBreed,
        user: { id: userId },
      }),
    );

    await this.petRepository.save(pet);

    return pet;
  }

  async getPetById(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({ relations: ['user'], where: { id: id } });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  async getPetsByUserId(userId: string): Promise<Pet[]> {
    return this.petRepository.createQueryBuilder('pet')
      .leftJoinAndSelect('pet.user', 'user')
      .where('user.id = :userId', { userId: +userId })
      .select(['pet', 'user.id', 'user.email', 'user.firstName', 'user.lastName'])
      .getMany();
  }


  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  async deletePet(id: string, user: any): Promise<{ message: string }> {
    const pet = await this.getPetById(id);

    if (String(pet.user.id) !== String(user.id) && user.role == Role.Client) {
      throw new UnauthorizedException('You are not authorized to delete this pet');
    }
    const deletionResult: any = await this.petRepository.remove(pet);

    if (deletionResult.affected === 0) {
      throw new NotFoundException('Pet not found for deletion');
    }

    return { message: 'Pet successfully deleted' };
  }
}
