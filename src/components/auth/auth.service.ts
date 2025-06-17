import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../user/dto/user.dto';
import { T } from '../../libs/types/common';
import { castIntoMongoObjectId } from '../../libs/utils';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async hashPassword(password: string): Promise<string> {
    const salt: string | number = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  public async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  public async createToken(user: UserDto): Promise<string> {
    const payload: T = {};
    Object.keys(user['_doc'] ? user['_doc'] : user).map((ele) => {
      payload[`${ele}`] = user[`${ele}`];
    });
    delete payload.userPassword;
    return await this.jwtService.signAsync(payload);
  }

  public async verifyToken(token: string): Promise<UserDto> {
    const user: UserDto = await this.jwtService.verifyAsync(token);
    user._id = castIntoMongoObjectId(user._id);
    return user;
  }
}
