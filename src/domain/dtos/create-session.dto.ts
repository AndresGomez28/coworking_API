import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, MaxLength } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ example: 'Session 101', description: 'The name of the session' })
  name: string;

  @IsDate()
  @ApiProperty({ example: '2024-06-24T10:00:00Z', description: 'The start time of the session' })
  start_time: Date;

  @IsDate()
  @ApiProperty({ example: '2024-06-24T11:00:00Z', description: 'The end time of the session' })
  end_time: Date;
}
