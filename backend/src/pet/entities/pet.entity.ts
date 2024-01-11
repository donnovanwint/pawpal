import { UserEntity } from 'src/user/entities/user.entity';
import { Role } from 'src/user/guards/role.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
    name: 'pets',
})
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description', nullable: true })
    description: string;


    @Column({ nullable: true })
    gender: string;

    @Column({ type: 'int', nullable: true })
    age: number;

    @Column({ name: 'animal_type', nullable: true })
    animalType: string;

    @Column()
    userId: string;

    @ManyToOne(() => UserEntity, user => user.pets)
    @JoinColumn({ name: 'userId' })
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
