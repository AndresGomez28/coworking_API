import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { WorkspaceStatus } from '../entities/workspace.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'The ID of the room where the workspace is located' })
  room_id: number;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'The row number of the workspace' })
  row: number;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'The column number of the workspace' })
  colum: number;

  @IsEnum(WorkspaceStatus)
  status: WorkspaceStatus;
}
