import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  workspace_id: number;

  @IsNumber()
  session_id: number;
}
