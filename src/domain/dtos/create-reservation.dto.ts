import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '101', description: 'The ID for the user' })
  user_id: number;

  @IsNumber()
  @ApiProperty({ example: '101', description: 'The ID of the Workspace selected' })
  workspace_id: number;

  @IsNumber()
  @ApiProperty({ example: '101', description: 'The ID of the session selected' })
  session_id: number;
}
