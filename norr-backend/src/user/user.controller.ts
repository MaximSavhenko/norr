import {
  Body,
  Controller,
  HttpCode,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put()
  async updateProfile(@Body() dto: UserDto, @CurrentUser('id') id: string) {
    return await this.userService.update(id, dto);
  }
}
