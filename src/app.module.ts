import { Module } from '@nestjs/common';
import { RoomsModule } from './application/modules/rooms.module';
import { WorkspacesModule } from './application/modules/workspaces.module';
import { SessionsModule } from './application/modules/sessions.module';
import { UsersModule } from './application/modules/users.module';
import { ReservationsModule } from './application/modules/reservations.module';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersistenceModule,
    RoomsModule,
    WorkspacesModule,
    SessionsModule,
    UsersModule,
    ReservationsModule,
  ],
})
export class AppModule {}
