import { Municipality } from '../model/Municipality';
import { Provinces } from '../model/Provinces';
import { User } from '../model/User';

export interface FilterUser {  
    dni?:User;
    numberPlate?:string;
    municipality?:Municipality;
    province?:Provinces;
    codeStatus?:boolean;
}
