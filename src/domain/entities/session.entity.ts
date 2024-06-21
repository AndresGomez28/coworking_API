import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

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

  @OneToMany(() => Reservation, reservation => reservation.session)
  reservations: Reservation[];


}
