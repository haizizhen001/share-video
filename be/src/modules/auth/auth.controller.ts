import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserRegisterPayloadDto } from './dto/authPayloadDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserRegisterPayloadDto,
    description: 'Register email or phone ',
  })
  async userRegister(@Body() userRegisterDto: UserRegisterPayloadDto) {
    const value = await this.authService.registerUser(userRegisterDto);

    if (!value) {
      throw new BadRequestException('User already exists');
    }
    return {
      message: 'User created successfully',
      data: value,
    };
  }
}
