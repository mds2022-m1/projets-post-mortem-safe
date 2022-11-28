import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/type';
import { Repository } from 'typeorm';
import { userDeleteInput, userDeleteOutput } from './dto/user-delete.dto';
import { UserUpdateInput, UserUpdateOutput } from './dto/user-update.dto';
import { UserCreateInput, UserCreateOutput } from './dto/users-create.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository : Repository<Users>
    ){}

    async createUser(input: UserCreateInput): Promise<UserCreateOutput>{
        const user = await this.userRepository.save(input)
        return { user }
    }

    async updateUser(
        userId: Users['id'],
        input: UserUpdateInput
        ): Promise<UserUpdateOutput>{
        const user = await this.userRepository.findOneByOrFail({id : userId});
        user.nom = input.nom;
        user.prenom = input.prenom;
        user.email = input.email;
        user.mdp = input.mdp;
        await user.save();
        return { user }
    }

    async deleteUser(input: userDeleteInput): Promise<userDeleteOutput>{
        const user = await this.userRepository.findOneByOrFail({id: input.id})
        user.remove()
        return { code : 200 }
    }

    async getUsers(): Promise<Users[]>{
        return this.userRepository.find()
    }

    async getUser(userId: Users['id']): Promise<Users>{
        return await this.userRepository.findOneByOrFail({id: userId})
    }

}
