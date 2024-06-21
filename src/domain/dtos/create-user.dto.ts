import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty({ example: 'Pepito Perez', description: 'The username of the user' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty({ example: 'pepito.perez@example.com', description: 'The email address of the user' })
  email: string;
}
