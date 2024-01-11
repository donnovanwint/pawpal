import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../guards/role.enum';
import { OneToMany } from 'typeorm';
import { Pet } from 'src/pet/entities/pet.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column()
  email: string;

  @Column({
    name: 'password',
  })
  passwordHash: string;

  @Column({
    name: 'role',
  })
  role: Role;
 
  @Column({ nullable: true })
  token: string;

  @OneToMany(() => Pet, (pet:any) => pet.user)
  pets: Pet[];

  @CreateDateColumn()
  created_at: Date; 

  @UpdateDateColumn()
  updated_at: Date;
}
