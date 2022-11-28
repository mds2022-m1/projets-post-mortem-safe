import { Injectable } from '@nestjs/common';
import { Email } from 'src/type';

@Injectable()
export class UsersService {

    get(){
        const email : Email = "paulmaraispro@gmail.com"
    }
}
