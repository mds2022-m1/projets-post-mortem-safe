import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortDirection } from 'src/pagination/dto/pagination.dto';
import { Repository } from 'typeorm';
import { userDeleteInput, userDeleteOutput } from './dto/user-delete.dto';
import { UserUpdateInput, UserUpdateOutput } from './dto/user-update.dto';
import { UserCreateInput, UserCreateOutput } from './dto/users-create.dto';
import {
  UsersPagination,
  UsersPaginationArgs,
} from './dto/users-pagination.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { Email } from 'src/type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(input: UserCreateInput): Promise<UserCreateOutput> {
    input.mdp = await bcrypt.hash(input.mdp, parseInt(process.env.BCRYPT_SALT));

    let user = await this.userRepository.save(input);
    user.id = await bcrypt.hash(user.id, parseInt(process.env.BCRYPT_SALT))

    return { user };
  }

  async updateUser(
    userId: Users['id'],
    input: UserUpdateInput,
  ): Promise<UserUpdateOutput> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    user.nom = input.nom;
    user.prenom = input.prenom;
    user.email = input.email;
    user.mdp = input.mdp;
    await user.save();
    return { user };
  }

  async updateRefreshToken(
    userId: string,
    token: string | null,
  ): Promise<void> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    user.refreshToken = token;
    await user.save();
  }

  async deleteUser(input: userDeleteInput): Promise<userDeleteOutput> {
    const user = await this.userRepository.findOneByOrFail({ id: input.id });
    user.remove();
    return { code: HttpStatus.NO_CONTENT };
  }

  async getUsers(args: UsersPaginationArgs): Promise<UsersPagination> {
    /*const qb = this.userRepository.createQueryBuilder('users');
    qb.skip(args.skip); 
    qb.take(args.take);
    if(args.sortBy) {
      if(args.sortBy.createdAt !== null){
        qb.addOrderBy('users.createdAt',
        args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC' 
        )
      }
      if(args.sortBy.nom !== null) {
        qb.addOrderBy('users.nom',
        args.sortBy.nom === SortDirection.ASC ? 'ASC' : 'DESC'
        )
      }
    }
    const [entity, totalCount] = await qb.getManyAndCount();*/

    const [entity, totalCount] = await this.userRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      order: {
        createdAt:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        nom: args.sortBy?.nom === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });
    return { entity, totalCount };
  }

  async getUser(userId: Users['id']): Promise<Users> {
    return await this.userRepository.findOneByOrFail({ id: userId });
  }

  async getUserByEmail(email: Email): Promise<Users> {
    return await this.userRepository.findOneByOrFail({ email: email });
  }

  async findByEmail(email: Email) {
    return await this.userRepository.findOneByOrFail({ email: email });
  }
}
