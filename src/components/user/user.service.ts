import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, UserInputDto } from './dto/user.dto';
import { EErrorMessage, EUserStatus } from 'src/libs/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}

  public async authUser(userInput: UserInputDto): Promise<UserDto> {
    try {
      const existingUser = await this.userModel
        .findOne({
          telegramId: userInput.telegramId,
          userStatus: EUserStatus.ACTIVE,
        })
        .exec();

      if (existingUser) {
        console.log('Existing User', existingUser);
        return existingUser;
      }
      const newUser = await this.userModel.create(userInput);
      if (!newUser) throw new BadRequestException(EErrorMessage.CREATE_FAILED);
      console.log('New User', newUser);
      return newUser;
    } catch (err) {
      throw new BadRequestException(EErrorMessage.CREATE_FAILED);
    }
  }
}
