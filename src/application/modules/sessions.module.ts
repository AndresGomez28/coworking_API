import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/domain/entities/session.entity';
import { SessionsService } from '../services/sessions.service';
import { SessionsController } from '../controllers/sessions.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Session])],
    providers:[SessionsService],
    controllers:[SessionsController],
})
export class SessionsModule {}
