import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from 'src/domain/entities/reservation.entity';
import { CreateReservationDto } from 'src/domain/dtos/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
  ) {}

  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationsRepository.create(createReservationDto);
    return this.reservationsRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  async findAvailableWorkspaces(roomId: number, sessionId: number) {
    return this.reservationsRepository.query(
      `SELECT * FROM coworking.workspaces WHERE room_id = $1 AND status = 'Available' 
       AND workspace_id NOT IN (SELECT workspace_id FROM coworking.reservations WHERE session_id = $2)`,
      [roomId, sessionId]
    );
  }

  async findOccupiedWorkspaces(roomId: number, sessionId: number) {
    return this.reservationsRepository.query(
      `SELECT * FROM coworking.workspaces WHERE room_id = $1 AND status = 'Unavailable' 
       AND workspace_id IN (SELECT workspace_id FROM coworking.reservations WHERE session_id = $2)`,
      [roomId, sessionId]
    );
  }

  async cancelReservation(reservationId: number): Promise<void> {
    await this.reservationsRepository.delete({ reservation_id: reservationId });
  }
}
