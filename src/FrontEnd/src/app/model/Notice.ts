import { User } from './User';
import { Vehicle } from './Vehicle';

export class Notice{  
    id:number;
    comment:string;
    vehicleId:Vehicle;
    userId:User;
}