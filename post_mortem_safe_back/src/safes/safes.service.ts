import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { UseGetSafeOutput } from './dto/safes-get.dto';
import { FileUpload, FileUploadOutput } from './dto/safes-upload.dto';

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
        const pathToFolder = process.cwd() + `/safes/${safeID}`;
        const pathToFile = join(pathToFolder, file)
        return fs.unlinkSync(pathToFile)
    }

    async uploadFile(safeId: string, file: FileUpload): Promise<FileUploadOutput> {

        const pathToFolder = process.cwd() + `/safes/${safeId}`;
        const { createReadStream, filename } = file;

        const res: Promise<FileUploadOutput> = new Promise(async (resolve) => {
        createReadStream()
        .pipe(fs.createWriteStream(join(pathToFolder,filename)))
        .on('finish', () =>
            resolve({
            file: filename,
            }),
        )
        .on('error',() => new HttpException('Could not save image', HttpStatus.BAD_REQUEST));
        })
      
        return res
    }
}
