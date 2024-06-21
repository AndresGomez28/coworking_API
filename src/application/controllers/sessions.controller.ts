import { Controller, Get, Post, Body, Session, Delete, Param } from '@nestjs/common';
import { SessionsService } from '../services/sessions.service';
import { CreateSessionDto } from 'src/domain/dtos/create-session.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Workspace } from 'src/domain/entities/workspace.entity';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new session' })
  @ApiResponse({ status: 201, description: 'The session has been successfully created.', type: Session })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiResponse({ status: 200, description: 'Returns all sessions.', type: [Session] })
  async findAll() {
    return this.sessionsService.findAll();
  }

  @Delete('deleteSession/:id')
  @ApiOperation({ summary: 'Delete a session by ID' })
  @ApiResponse({ status: 200, description: 'Session delete successfully.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async deleteSession(@Param('id') id: number) {
    return this.sessionsService.deleteSession(id);
  }

  @Get('occupied')
  @ApiOperation({ summary: 'Get sessions ordered by the most occupied' })
  @ApiResponse({ status: 200, description: 'Return sessions ordered by most occupied.', type: Session, isArray: true })
  async findMostOccupiedSessions() {
    return this.sessionsService.findMostOccupiedSessions();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get sessions ordered by the most available' })
  @ApiResponse({ status: 200, description: 'Return sessions ordered by most available.', type: Session, isArray: true })
  async findMostAvailableSessions() {
    return this.sessionsService.findMostAvailableSessions();
  }

  @Get('workspacesByUser/:userId')
  @ApiOperation({ summary: 'Get workspaces assigned to a user' })
  @ApiResponse({ status: 200, description: 'Return workspaces assigned to a user.', type: Workspace, isArray: true })
  async findWorkspacesByUser(@Param('userId') userId: number) {
    return this.sessionsService.findWorkspacesByUser(userId);
  }

  @Get('workspacesBySession/:sessionId')
  @ApiOperation({ summary: 'Get workspaces assigned to a session' })
  @ApiResponse({ status: 200, description: 'Return workspaces assigned to a session.', type: Workspace, isArray: true })
  async findWorkspacesBySession(@Param('sessionId') sessionId: number) {
    return this.sessionsService.findWorkspacesBySession(sessionId);
  }
}
