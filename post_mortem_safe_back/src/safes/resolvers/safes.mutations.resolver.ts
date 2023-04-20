import { HttpException, HttpStatus } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Users } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";
import { SafesService } from "../safes.service";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload, FileUploadOutput } from "../dto/safes-upload.dto";
import { createWriteStream } from "fs";
import { join } from "path";

@Resolver()
export class SafesMutationsResolver {

    constructor(
        private readonly safesService: SafesService,
        private readonly usersService: UsersService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async useDeleteFile(@CurrentUser() user: Partial<Users>, @Args('file') file: string ): Promise<Boolean> {
      const safeId: Users['safeID'] = await this.usersService.getSafeId(user.id)
      try{
        this.safesService.deleteFile(safeId, file)
        return true
      }catch(e){
        throw new HttpException(e.message, 500, { cause: e })
      }
    } 

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async useUploadFile(
      @CurrentUser() 
      user: Partial<Users>,
      @Args({ name: 'file', type: () => GraphQLUpload })
      file: FileUpload,
    ){
      const safeId: Users['safeID'] = await this.usersService.getSafeId(user.id)

      try{
        await this.safesService.uploadFile(safeId, file)
        return true
      }
      catch(e){
        throw new HttpException(e.message, 500, { cause: e })
      }
    }
  
}