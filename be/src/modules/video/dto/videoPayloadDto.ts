import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ShareVideoPayloadDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  content: string;
}
