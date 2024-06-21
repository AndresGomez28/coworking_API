import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/domain/entities/room.entity';
import { RoomsService } from '../services/rooms.service';
import { RoomsController } from '../controllers/rooms.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Room])],
    providers: [RoomsService],
    controllers:[RoomsController],
})
export class RoomsModule {}
