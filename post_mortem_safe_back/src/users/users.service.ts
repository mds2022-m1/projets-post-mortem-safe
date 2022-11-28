import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/type';
import { Repository } from 'typeorm';
import { UserCreateInput, UserCreateOuput } from './dto/users-create.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository : Repository<Users>
    ){}

    async createUser(input: UserCreateInput): Promise<UserCreateOuput>{
        const user = await this.userRepository.save(input)
        return { user }
    }
}
