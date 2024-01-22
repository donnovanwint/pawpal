import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserEntity } from '../../user/entities/user.entity';
import { AnimalType, Gender } from '../dto/create-pet.dto';
import { Chat } from 'src/chat/entities/chat.entity';

// pet.entity.ts
@Entity('pets')
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    gender: Gender;

    @Column({ type: 'text', nullable: true })
    age: string;

    @Column({ name: 'animal_type', nullable: true })
    animalType: AnimalType;
    
    @Column({ name: 'animal_breed', nullable: true })
    animalBreed: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(() => Chat, chat => chat.pet)
    chats: Chat;

    @ManyToOne(() => UserEntity, user => user.pets)
    user: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
