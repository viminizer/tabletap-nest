import { Body, Controller, Post } from '@nestjs/common';
import { UserDto, UserInputDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  async authUser(@Body() userInput: UserInputDto): Promise<UserDto> {
    console.log('authUser');
    console.log('USERINPUT:', userInput);
    const result = await this.userService.authUser(userInput);
    return result;
  }
}
