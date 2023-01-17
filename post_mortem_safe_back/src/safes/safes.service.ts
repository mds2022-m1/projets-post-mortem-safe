import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UseGetSafeOutput } from './dto/safe-get.dto';

@Injectable()
export class SafesService {

    createSafe(safeID: string){

        const dir = process.cwd() + `/safes/${safeID}`;

        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
    }

    useGetSafe(safeID: string): UseGetSafeOutput{
        const dir = process.cwd() + `/safes/${safeID}`;
        return {files: fs.readdirSync(dir)}
    }
}
