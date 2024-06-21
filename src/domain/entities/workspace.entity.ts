import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Room } from './room.entity';
import { Reservation } from './reservation.entity';

export enum WorkspaceStatus {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

@Entity({ schema: 'coworking', name: 'workspaces' })
export class Workspace {
  @PrimaryGeneratedColumn()
  workspace_id: number;

  @Column()
  room_id: number;

  @Column()
  row: number;

  @Column()
  colum: number;

  @Column({
    type: 'enum',
    enum: WorkspaceStatus,
    default: WorkspaceStatus.AVAILABLE,
  })
  status: WorkspaceStatus;

  @ManyToOne(() => Room, room => room.workspaces)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @OneToMany(() => Reservation, reservation => reservation.workspace)
  reservations: Reservation[];

}
