import { Body, Controller, Post } from '@nestjs/common';
import { UserDto, UserInputDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() userInput: UserInputDto): Promise<UserDto> {
    console.log('createUser');
    const result = await this.userService.createUser(userInput);
    return result;
  }
}
