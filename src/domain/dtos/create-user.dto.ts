import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(60)
  email: string;
}
