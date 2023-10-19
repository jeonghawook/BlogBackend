import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: string;

  @Column()
  recipientId: string;

  @Column()
  text: string;

  @CreateDateColumn()
  timestamp: Date;
}
