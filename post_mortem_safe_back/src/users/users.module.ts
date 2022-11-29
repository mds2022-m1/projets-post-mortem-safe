import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersMutationsResolver } from './resolvers/users.mutations.resolver';
import { UsersQueriesResolver } from './resolvers/users.queries.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersMutationsResolver, UsersQueriesResolver]
})
export class UsersModule {}
