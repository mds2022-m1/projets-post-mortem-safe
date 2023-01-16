import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SafesService {

    createSafe(safeID: string){

        const dir = __dirname + `/safes/${safeID}`;

        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
    }

    getSafe(safeID: string){

        const dir = process.cwd() + `/safes/${safeID}`;

        return fs.readdirSync(dir)
    }
}
