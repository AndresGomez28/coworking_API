import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { CreateRoomDto } from 'src/domain/dtos/create-room.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Room } from 'src/domain/entities/room.entity';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'The room has been successfully created.', type: Room })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Returns all rooms.', type: [Room] })
  async findAll() {
    return this.roomsService.findAll();
  }

  @Delete('deleteRoom/:id')
  @ApiOperation({ summary: 'Delet a room by ID' })
  @ApiResponse({ status: 200, description: 'Room delete successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async deleteRoom(@Param('id') id: number) {
    return this.roomsService.deleteRoom(id);
  }
}
