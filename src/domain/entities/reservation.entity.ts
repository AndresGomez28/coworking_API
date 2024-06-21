import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Session } from './session.entity';
import { Workspace } from './workspace.entity';

@Entity({ schema: 'coworking', name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Column()
  user_id: number;

  @Column()
  session_id: number;

  @Column()
  workspace_id: number;

  @ManyToOne(() => Session, session => session.reservations)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @ManyToOne(() => Workspace, workspace => workspace.reservations)
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;
}
