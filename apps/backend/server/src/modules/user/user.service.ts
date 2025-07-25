import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username, password: pass },
    })
    return user
  }

  async register(body) {
    const userIsExist = await this.userRepository.findOne({
      where: { username: body.username },
    })
    if (userIsExist) {
      throw new HttpException({ message: '用户已存在', error: 'user is existed' }, 400)
    }
    const user = await this.userRepository.create(body)
    await this.userRepository.save(user)
    return user
  }
}
