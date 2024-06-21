import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from 'src/domain/entities/workspace.entity';
import { WorkspacesService } from '../services/workspaces.service';
import { WorkspacesController } from '../controllers/workspaces.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Workspace])],
    providers:[WorkspacesService],
    controllers:[WorkspacesController],
})
export class WorkspacesModule {}
