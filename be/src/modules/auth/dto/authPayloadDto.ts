import { IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserRegisterPayloadDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  passwordVerify: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;
}
export class UserResponseDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsObject()
  data: any;
}
export class UserLoginPayloadDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  password: string;
}
