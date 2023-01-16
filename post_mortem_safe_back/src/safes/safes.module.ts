import { Module } from '@nestjs/common';
import { SafesService } from './safes.service';

@Module({
    imports: [],
    exports: [SafesService],
    providers: [SafesService],
})
export class SafesModule {}
