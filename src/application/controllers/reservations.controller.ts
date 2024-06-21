import { Controller, Get, Post, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { CreateReservationDto } from 'src/domain/dtos/create-reservation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'The reservation has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.createReservation(createReservationDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({ status: 200, description: 'Return all reservations.' })
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available workspaces for a room in a session' })
  @ApiResponse({ status: 200, description: 'Return available workspaces.' })
  async findAvailableWorkspaces(
    @Query('roomId') roomId: number,
    @Query('sessionId') sessionId: number,
  ) {
    return this.reservationsService.findAvailableWorkspaces(roomId, sessionId);
  }

  @Get('occupied')
  @ApiOperation({ summary: 'Get occupied workspaces for a room in a session' })
  @ApiResponse({ status: 200, description: 'Return occupied workspaces.' })
  async findOccupiedWorkspaces(
    @Query('roomId') roomId: number,
    @Query('sessionId') sessionId: number,
  ) {
    return this.reservationsService.findOccupiedWorkspaces(roomId, sessionId);
  }

  @Delete('cancelReservation/:id')
  @ApiOperation({ summary: 'Cancel a reservation by ID' })
  @ApiResponse({ status: 200, description: 'Reservation canceled successfully.' })
  @ApiResponse({ status: 404, description: 'Reservation not found.' })
  async cancelReservation(@Param('id') id: number) {
    return this.reservationsService.cancelReservation(id);
  }
}
