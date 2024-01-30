import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet.entity';
import { PetService } from './pet.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/user/guards/role.enum';
import { AllowedRoles } from 'src/user/guards/roles.decorator';
import { RoleGuard } from 'src/user/guards/role.guard';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @AllowedRoles(Role.Client)
  @Post()
  create(@Body() createPetDto: CreatePetDto, @Req() req: any) {
    const userId = req.user.id;
    return this.petService.create(createPetDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @AllowedRoles(Role.Client, Role.SuperAdmin)
  @Get('user/:userId')
  getPetsByUserId(@Req() req: any, @Param('userId') userId?: string): Promise<Pet[]> {
    let user = req.user.id;
    userId=='undefined' ? user = req.user.id : user = userId;
    return this.petService.getPetsByUserId(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @AllowedRoles(Role.Client, Role.SuperAdmin)
  @Delete(':id')
  deletePet(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.petService.deletePet(id, user);
  }
  
  // @Get()
  // findAll() {
  //   return this.petService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.petService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
  //   return this.petService.update(+id, updatePetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.petService.remove(+id);
  // }
}
