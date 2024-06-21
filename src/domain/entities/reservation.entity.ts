import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Workspace } from './workspace.entity';
import { Session } from './session.entity';

@Entity({ schema: 'coworking', name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Column()
  user_id: number;

  @Column()
  workspace_id: number;

  @Column()
  session_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Workspace)
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @ManyToOne(() => Session)
  @JoinColumn({ name: 'session_id' })
  session: Session;
}
