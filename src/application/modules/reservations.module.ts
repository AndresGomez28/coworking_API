import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/domain/entities/reservation.entity';
import { ReservationsController } from '../controllers/reservations.controller';
import { ReservationsService } from '../services/reservations.service';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation])],
    providers: [ReservationsService],
    controllers: [ReservationsController],
})
export class ReservationsModule {}
