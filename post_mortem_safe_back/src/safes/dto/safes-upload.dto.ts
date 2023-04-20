import { Field, ObjectType } from "@nestjs/graphql";
import { Stream } from "stream";


export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}

@ObjectType()
export class FileUploadOutput {
    @Field()
    file!: string
}
