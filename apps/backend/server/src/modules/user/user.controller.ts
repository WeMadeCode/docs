import { Body, Controller, Post } from '@nestjs/common'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async add(@Body() body) {
    const newUser = await this.userService.register(body)
    return { data: newUser, success: true }
  }
}
