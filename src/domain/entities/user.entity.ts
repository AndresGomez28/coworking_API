import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'coworking', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 40, unique: true })
  username: string;

  @Column({ length: 60, unique: true })
  email: string;
}
