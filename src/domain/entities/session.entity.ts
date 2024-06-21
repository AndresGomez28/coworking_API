import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'coworking', name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn()
  session_id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;
}
