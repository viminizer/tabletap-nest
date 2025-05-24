import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, UserInputDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}

  public async createUser(userInput: UserInputDto): Promise<UserDto> {
    try {
      const newUser = this.userModel.create(userInput);
      if (!newUser) throw new Error('User Creation Failed!');
      return newUser;
    } catch (err) {
      throw new Error('User Create Failed!');
    }
  }
}
