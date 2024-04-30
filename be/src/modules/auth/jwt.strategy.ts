import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from './dto/jwtDto';
import { AuthService } from './auth.service';
import { IUser } from 'src/mongodb/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtDto): Promise<JwtDto> {
    const user = await this.authService.validateUser(
      payload.userName,
      payload.userId,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
