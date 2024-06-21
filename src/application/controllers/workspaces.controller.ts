import { Controller, Get, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { WorkspacesService } from '../services/workspaces.service';
import { CreateWorkspaceDto } from 'src/domain/dtos/create-workspace.dto';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { Workspace, WorkspaceStatus } from 'src/domain/entities/workspace.entity';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiResponse({ status: 201, description: 'The workspace has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  async create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(createWorkspaceDto);
  }

  @Get('findAll')
  @Get('findAll')
  @ApiOperation({ summary: 'Get all workspaces' })
  @ApiResponse({ status: 200, description: 'Return all workspaces.' })
  async findAll() {
    return this.workspacesService.findAll();
  }

  @Delete('deleteWorkspace/:id')
  @ApiOperation({ summary: 'Delete a workspace by ID' })
  @ApiResponse({ status: 200, description: 'Workspace delete successfully.' })
  @ApiResponse({ status: 404, description: 'Workspace not found.' })
  async deleteWorkspace(@Param('id') id: number) {
    return this.workspacesService.deleteWorkspace(id);
  }

  @Get('findByStatus/:status')
  @ApiOperation({ summary: 'Find workspaces by status' })
  @ApiResponse({ status: 200, description: 'Return workspaces found by status.', type: Workspace, isArray: true })
  async findByStatus(@Param('status') status: WorkspaceStatus) {
    return this.workspacesService.findByStatus(status);
  }

  @Get('findAvailableWorkspaces')
  @ApiOperation({ summary: 'Find available workspaces by room ID' })
  @ApiResponse({ status: 200, description: 'Return available workspaces found by room ID.', type: Workspace, isArray: true })
  async findAvailableWorkspaces(@Query('roomId') roomId: number) {
    return this.workspacesService.findAvailableWorkspaces(roomId);
  }

  @Get('findOccupiedWorkspaces')
  @ApiOperation({ summary: 'Find occupied workspaces by room ID' })
  @ApiResponse({ status: 200, description: 'Return occupied workspaces found by room ID.', type: Workspace, isArray: true })
  async findOccupiedWorkspaces(@Query('roomId') roomId: number) {
    return this.workspacesService.findOccupiedWorkspaces(roomId);
  }
}
