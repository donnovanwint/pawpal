// chat.entity.ts
import { Pet } from 'src/pet/entities/pet.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('chats')
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', name: 'total_token_used', nullable: true})
    totalToken: any;

    @Column({ type: 'text', name: 'chat', nullable: true})
    chat: any;

    @Column({ type: 'text', name: 'chat_base_history', nullable: true })
    chatBaseHistory: string;

    @Column({ type: 'text', nullable: true })
    userId: string;

    @ManyToOne(() => Pet, pet => pet.chats)
    pet: Pet;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // constructor() {
    //     if (!this.id) {
    //         this.id = uuidv4();
    //     }
    // }
}
