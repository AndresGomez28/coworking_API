import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { WorkspaceStatus } from '../entities/workspace.entity';

export class CreateWorkspaceDto {
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @IsNumber()
  row: number;

  @IsNumber()
  colum: number;

  @IsEnum(WorkspaceStatus)
  status: WorkspaceStatus;
}
