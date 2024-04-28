import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/mongodb/models/user.model';
import { UserRegisterPayloadDto } from './dto/authPayloadDto';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {}

  async validateUser(userName: string, id: string): Promise<IUser> {
    return await this.userModel.findOne({ userName, _id: id });
  }

  async registerUser({
    userName,
    password,
    email,
    name,
  }: UserRegisterPayloadDto) {
    const user = new this.userModel({ userName, password, email, name });
    return user.save();
  }
}
