import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace, WorkspaceStatus } from 'src/domain/entities/workspace.entity';
import { CreateWorkspaceDto } from 'src/domain/dtos/create-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
  ) {}

  async createWorkspace(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const workspace = this.workspacesRepository.create(createWorkspaceDto);
    return this.workspacesRepository.save(workspace);
  }

  async findAll(): Promise<Workspace[]> {
    return this.workspacesRepository.find();
  }

  async deleteWorkspace(workspaceId: number): Promise<void> {
    await this.workspacesRepository.delete({ workspace_id: workspaceId });
  }
  
  async findByStatus(status: WorkspaceStatus): Promise<Workspace[]> {
    return this.workspacesRepository.find({ where: { status } });
  }

  async findAvailableWorkspaces(roomId: number): Promise<Workspace[]> {
    return this.workspacesRepository.find({ where: { room_id: roomId, status: WorkspaceStatus.AVAILABLE } });
  }

  async findOccupiedWorkspaces(roomId: number): Promise<Workspace[]> {
    return this.workspacesRepository.find({ where: { room_id: roomId, status: WorkspaceStatus.UNAVAILABLE } });
  }
}
