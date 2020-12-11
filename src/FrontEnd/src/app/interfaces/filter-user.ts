import { Municipality } from '../model/Municipality';
import { Provinces } from '../model/Provinces';
import { User } from '../model/User';
import { Vehicle } from '../model/Vehicle';

export interface FilterUser {  
    user?:User;
    vehicle?:Vehicle;
    municipality?:Municipality;
    province?:Provinces;
    codeStatus?:boolean;
}
