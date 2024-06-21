import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity({ schema: 'coworking', name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Workspace, workspace => workspace.room)
  @JoinTable()
  workspaces: Workspace[];
}
