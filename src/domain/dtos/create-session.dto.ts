import { IsNotEmpty, IsString, IsDate, MaxLength } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}
