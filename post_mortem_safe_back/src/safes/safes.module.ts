import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { UsersModule } from 'src/users/users.module';
import { SafesMutationsResolver } from './resolvers/safes.mutations.resolver';
import { SafesQueriesResolver } from './resolvers/safes.queries.resolver';
import { SafesService } from './safes.service';

@Module({
    imports: [forwardRef(() => UsersModule)],
    exports: [SafesService],
    providers: [SafesService, SafesQueriesResolver, SafesMutationsResolver],
})
export class SafesModule {}
