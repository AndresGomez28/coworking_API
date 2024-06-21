import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './db-config';
import { Room } from 'src/domain/entities/room.entity';
import { User } from 'src/domain/entities/user.entity';
import { Session } from 'src/domain/entities/session.entity';
import { Workspace } from 'src/domain/entities/workspace.entity';
import { Reservation } from 'src/domain/entities/reservation.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfig,
        }),
        TypeOrmModule.forFeature([Room, User, Session, Workspace, Reservation]),
    ],
    exports: [TypeOrmModule],
})
export class PersistenceModule {}
