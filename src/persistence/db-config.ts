import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Reservation } from "src/domain/entities/reservation.entity";
import { Room } from "src/domain/entities/room.entity";
import { Session } from "src/domain/entities/session.entity";
import { User } from "src/domain/entities/user.entity";
import { Workspace } from "src/domain/entities/workspace.entity";

export const typeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    schema: 'coworking',
    entities: [Room, User, Session, Workspace, Reservation],
    synchronize: false,
});