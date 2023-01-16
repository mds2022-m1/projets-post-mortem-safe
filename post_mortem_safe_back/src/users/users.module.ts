import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafesModule } from 'src/safes/safes.module';
import { Users } from './entities/users.entity';
import { UsersMutationsResolver } from './resolvers/users.mutations.resolver';
import { UsersQueriesResolver } from './resolvers/users.queries.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), SafesModule],
  exports: [UsersService],
  providers: [UsersService, UsersMutationsResolver, UsersQueriesResolver],
})
export class UsersModule {}
