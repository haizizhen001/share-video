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
import {
  UserLoginPayloadDto,
  UserRegisterPayloadDto,
} from './dto/authPayloadDto';
import { ResponseDto } from 'src/shared/dto/apiPayloadDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ResponseDto,
    description: 'Register email or phone ',
  })
  async userRegister(@Body() userRegisterDto: UserRegisterPayloadDto) {
    const value = await this.authService.registerUser(userRegisterDto);

    if (!value) {
      throw new BadRequestException('User already exists');
    }
    return {
      code: 0,
      message: 'User created successfully',
      data: value,
    };
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'login user',
    type: ResponseDto,
  })
  async userLogin(@Body() userLoginDto: UserLoginPayloadDto) {
    try {
      const value = await this.authService.loginUser(userLoginDto);
      return {
        code: 0,
        message: 'User login successfully',
        data: { accessToken: value },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
