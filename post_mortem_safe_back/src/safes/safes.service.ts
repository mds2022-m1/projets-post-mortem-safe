import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UseGetSafeOutput } from './dto/safes-get.dto';

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
        const files = fs.readdirSync(dir)
        const filesWithInfos: UseGetSafeOutput['files'] = files.map(file => {
           const stats = fs.statSync(`${dir}/${file}`)
           return { name: file, type: file.split('.')[file.split('.').length - 1], added: stats.birthtime }
        })
        return {files: filesWithInfos}
    }

    async deleteFile(safeID: string, file: string): Promise<void> {
        const pathToFile = process.cwd() + `/safes/${safeID}/${file}`;
        return fs.unlinkSync(pathToFile)
    }
}
