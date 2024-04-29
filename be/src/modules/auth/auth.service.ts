import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/mongodb/models/user.model';
import {
  UserLoginPayloadDto,
  UserRegisterPayloadDto,
} from './dto/authPayloadDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<IUser>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userName: string, id: string): Promise<IUser> {
    return await this.userModel.findOne({ userName, _id: id });
  }

  async registerUser({
    userName,
    password,
    passwordVerify,
    email,
    name,
  }: UserRegisterPayloadDto) {
    if (password !== passwordVerify) {
      throw new Error('Passwords do not match');
    }
    const hashPassword = await this.hashPassword(password);
    const user = new this.userModel({
      userName,
      password: hashPassword,
      email,
      name,
    });
    return user.save();
  }
  async loginUser({ userName, password }: UserLoginPayloadDto) {
    const user = await this.userModel.findOne({ userName });
    if (user) {
      const isMatch = await this.compatePassword(password, user.password);
      if (!isMatch) {
        throw new Error('Password is incorrect');
      }
      return this.generateAccessToken({
        userId: user._id,
        userName: user.userName,
      });
    }
    throw new Error('User not found');
  }
  private generateAccessToken(payload: {
    userId: string;
    userName: string;
  }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES'),
    });
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(8);
    return bcrypt.hash(password, salt);
  }
  private compatePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compare(password, hashPassword);
  }
}
