import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll() {
    return this.usersService.findAll();
  }
  
  @Delete('deleteUser/:id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User delete successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
