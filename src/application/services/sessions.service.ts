import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from 'src/domain/entities/session.entity';
import { CreateSessionDto } from 'src/domain/dtos/create-session.dto';
import { Reservation } from 'src/domain/entities/reservation.entity';
import { Workspace, WorkspaceStatus } from 'src/domain/entities/workspace.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,

    @InjectRepository(Session)
    private reservationRepository: Repository<Reservation>,

    @InjectRepository(Session)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = this.sessionsRepository.create(createSessionDto);
    return this.sessionsRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return this.sessionsRepository.find();
  }

  async deleteSession(sessionId: number): Promise<void> {
    await this.sessionsRepository.delete({ session_id: sessionId });
  }

  async findMostOccupiedSessions(): Promise<Session[]> {
    return this.sessionsRepository.createQueryBuilder('session')
      .leftJoin('session.reservations', 'reservation')
      .groupBy('session.session_id')
      .orderBy('COUNT(reservation.reservation_id)', 'DESC')
      .select([
        'session.session_id',
        'session.name',
        'session.start_time',
        'session.end_time',
        'COUNT(reservation.reservation_id) AS reservation_count'
      ])
      .getRawAndEntities()
      .then(result => result.entities);
  }

  async findMostAvailableSessions(): Promise<Session[]> {
    return this.sessionsRepository.createQueryBuilder('session')
      .leftJoin('session.workspaces', 'workspace')
      .where('workspace.status = :status', { status: WorkspaceStatus.AVAILABLE })
      .groupBy('session.session_id')
      .orderBy('COUNT(workspace.workspace_id)', 'DESC')
      .select([
        'session.session_id',
        'session.name',
        'session.start_time',
        'session.end_time',
        'COUNT(workspace.workspace_id) AS available_workspaces_count'
      ])
      .getRawAndEntities()
      .then(result => result.entities);
  }

  async findWorkspacesByUser(userId: number): Promise<Workspace[]> {
    return this.workspaceRepository.createQueryBuilder('workspace')
      .innerJoinAndSelect('workspace.reservations', 'reservation', 'reservation.user_id = :userId', { userId })
      .getMany();
  }

  async findWorkspacesBySession(sessionId: number): Promise<Workspace[]> {
    return this.workspaceRepository.createQueryBuilder('workspace')
      .innerJoinAndSelect('workspace.reservations', 'reservation', 'reservation.session_id = :sessionId', { sessionId })
      .getMany();
  }
}
